import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

/*
 *  Function to handle loading files.
 *  onLoad uses the path found in onResolve to load the file.
 *  Overrides esbuild's natural way of loading a file by just reading the file off of
 *  a file system by loading the object below.
 *  Once the object is loaded to esbuild, esbuild will attempt to parse the file
 *  for any imports/exports. If found, esbuild will repeat the onResolve and
 *  onLoad steps to find the path of the imported/exported file and then load
 *  the file from the path.
 */
export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode, // user code from textarea
        };
      });

      /*
       *  This onLoad is used to extract duplicated code dealing with caching.
       *  esbuild will check this onLoad and do one of the following:
       *  - if it has cached data, then onLoad will return the cached data
       *  - otherwise, esbuild will continue to check the other onLoad's until an
       *    onLoad returns an object.
       */
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path,
        );

        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /\.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        /*
         *  escaped removes all new lines and finds all single and double quotes and
         *  have a backslash prepended to them so that the quotes do not end the single
         *  quote in style.innerText below. Removal of new lines is because the string
         *  for innerText is within single quotes and not using template strings.
         */
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
         `;

        /*
         *  resolveDir holds what path unpkg.com sends
         */
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        /*
         *  resolveDir holds what path unpkg.com sends
         */
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
