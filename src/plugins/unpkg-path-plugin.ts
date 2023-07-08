import * as esbuild from "esbuild-wasm";
import axios from "axios";

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
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        /*
         *  handle if args.path = "./utils" or something similar.
         */
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            /*
             *  args.importer = "https://unpkg.com/nested-test-pkg"
             *  args.path = "./utils"
             *  add "/" to end so new URL() will append 'utils' to importer
             */
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/",
            ).href,
          };
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };

        // else if (args.path === "tiny-test-pkg") {
        // return {
        //   path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js",
        //   namespace: "a",
        // };
        // }
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
              import { Component } from "react"
              console.log(message);
              `,
          };
        }

        /*
         *  resolveDir holds what unpkg.com sends as where to find the index.js
         */
        const { data, request } = await axios.get(args.path);
        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
