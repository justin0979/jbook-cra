import { useRef } from "react";
import MonacoEditor, { OnMount, OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  const editorRef = useRef<any>();

  const onFormatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(editorRef.current);
    // get current value from editor
    const unformatted = editorRef.current.getValue();

    // format the value
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  const handleOnMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>

      <MonacoEditor
        onMount={handleOnMount}
        //onChange={onChange}
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
