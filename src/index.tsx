import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import { fetchPlugin, unpkgPathPlugin } from "./plugins";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

/*
 *  code: transpiled & bundled code
 *  startService: defined when component is mounted.
 */
const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState(""); // user code in textarea sent to unpkgPathPlugin()
  const [code, setCode] = useState("");
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
     *  result.outputFiles[0].text contains the transpiled and bundled code.
     */
    setCode(result.outputFiles[0].text);
  };

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
        window.addEventListener("message", (event) => {
          console.log(event.data);
        }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={80}
        rows={15}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe srcDoc={html} sandbox="allow-scripts"></iframe>
    </div>
  );
};

root.render(<App />);
