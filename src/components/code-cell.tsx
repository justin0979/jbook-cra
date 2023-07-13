import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const [code, setCode] = useState(""); // transpiled and bundled code.
  const [input, setInput] = useState(""); // user code in textarea sent to unpkgPathPlugin()

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
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
    </Resizable>
  );
};

export default CodeCell;