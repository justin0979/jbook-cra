import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      /*
       *  Figure out where `index.js` is stored.
       *  This function overrides esbuild's natural process of finding out what a file's
       *  path is.
       */
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        return { path: args.path, namespace: "a" };
      });

      /*
       *  onLoad uses the path found in onResolve to load the file. Overrides esbuild's
       *  natural way of loading a file by just reading the file off of a file system
       *  by loading the object below.
       *  Once the object is loaded to esbuild, esbuild will attempt to parse the file
       *  for any imports/exports. If found, esbuild will repeat the onResolve and
       *  onLoad steps to find the path of the imported/exported file and then load
       *  the file from the path.
       */
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from './message';
              console.log(message);
              `,
          };
        } else {
          return {
            loader: "jsx",
            contents: "export default 'hi there!'",
          };
        }
      });
    },
  };
};
