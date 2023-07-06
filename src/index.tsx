import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState(""); // transpiled & bundled code to be in the pre element

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: "jsx", // tell which language
      target: "es2015",
    });

    setCode(result.code);
  };

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
    </div>
  );
};

root.render(<App />);
