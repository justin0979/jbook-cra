import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <MonacoEditor
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
