import * as esbuild from "esbuild-wasm";
import { fetchPlugin, unpkgPathPlugin } from "./plugins";

/*
 *  esbuild.startService returns the bundler used to bundle the user's code. esbuild
 *  only needs to be initialized once.
 */
let service: esbuild.Service;

/**
 *  function to bundle code.
 *  rawCode is user input code that will be bundled
 */
const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  try {
    /*
     *  Run bundler here
     */
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    /*
     *  result.outputFiles[0].text contains the transpiled and bundled code that will
     *  be sent off to the Preview component.
     */
    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: "",
        err: err.message,
      };
    } else {
      throw err;
    }
  }
};

export default bundle;
