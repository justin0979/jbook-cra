import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { useState, useEffect, useRef } from "react";
import { CodeEditor, Preview } from "./components";
import bundle from "./bundler";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const App = () => {
  const [code, setCode] = useState(""); // transpiled and bundled code.
  const [input, setInput] = useState(""); // user code in textarea sent to unpkgPathPlugin()

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
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
