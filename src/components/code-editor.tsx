import MonacoEditor, { OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange: OnChange;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  const onFormatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // get current value from editor
    // format the value
    // set the formatted value back in the editor
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>

      <MonacoEditor
        onChange={onChange}
        defaultValue={initialValue}
        theme="vs-dark"
        defaultLanguage="javascript"
        height="30vh"
        options={{
          tabSize: 2,
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
