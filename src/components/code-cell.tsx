import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks";
import { useTypedSelector } from "../hooks";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  const { updateCell, createBundle } = useActions(); // update user input content
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cell.content, cell.id]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
