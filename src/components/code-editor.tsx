import Editor, { OnChange } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange: OnChange;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  return (
    <Editor
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
  );
};

export default CodeEditor;
