import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  /*
   *  1st parameter is a function that returns the contents of the editor.
   *  2nd parameter is a reference to the editor itself. This can be used to tell the
   *  editor when the contents of the editor have been changed.
   */
  const onEditorDidMount = (
    getValue: () => string,
    monacoEditor: any,
  ) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      theme="dark"
      language="javascript"
      height="30vh"
      options={{
        wordWrap: "on",
        miniMap: { enabled: false },
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
