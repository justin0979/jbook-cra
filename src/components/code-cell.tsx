import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const [code, setCode] = useState(""); // transpiled and bundled code.
  const [err, setErr] = useState("");
  const [input, setInput] = useState(""); // user code in textarea sent to unpkgPathPlugin()

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div
        style={{ height: "100%", display: "flex", flexDirection: "row" }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue='import React from "react"'
            onChange={(value) => value && setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
