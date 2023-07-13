import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import { fetchPlugin, unpkgPathPlugin } from "./plugins";
import { CodeEditor, Preview } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

/*
 *  code: transpiled & bundled code
 *  startService: defined when component is mounted.
 */
const App = () => {
  const ref = useRef<any>();
  const [code, setCode] = useState("");
  const [input, setInput] = useState(""); // user code in textarea sent to unpkgPathPlugin()
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    /*
     *  Run bundler here
     */
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    /*
     *  result.outputFiles[0].text contains the transpiled and bundled code that will
     *  be sent off to the Preview component.
     *
     */
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <CodeEditor
        initialValue='import React from "react"'
        onChange={(value) => value && setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

root.render(<App />);
