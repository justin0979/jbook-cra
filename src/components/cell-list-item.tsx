import { ReactNode } from "react";
import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem = ({ cell }: CellListItemProps) => {
  let child: ReactNode;
  if (cell.type === "code") {
    child = <CodeCell />;
  } else {
    child = <TextEditor />;
  }

  return <div>{child}</div>;
};

export default CellListItem;
