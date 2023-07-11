import Editor, { OnMount, OnChange } from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor = ({ initialValue, onChange }: CodeEditorProps) => {
  /*
   *  1st parameter is a function that returns the contents of the editor.
   *  2nd parameter is a reference to the editor itself. This can be used to tell the
   *  editor when the contents of the editor have been changed.
   */
  const handleChange: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  };

  return (
    <Editor
      //onChange={onChange}
      onMount={handleChange}
      defaultValue={initialValue}
      theme="vs-dark"
      language="javascript"
      height="30vh"
      options={{
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
