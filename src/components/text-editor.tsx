import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

interface TextEditorProps {}

const TextEditor = ({}: TextEditorProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, true);

    return () => document.removeEventListener("click", listener, true);
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={"# Header"} />
    </div>
  );
};

export default TextEditor;
