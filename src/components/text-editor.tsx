import MDEditor from "@uiw/react-md-editor";

interface TextEditorProps {}

const TextEditor = ({}: TextEditorProps) => {
  return (
    <div>
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};

export default TextEditor;
