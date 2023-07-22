import { Cell } from "../state";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem = ({ cell }: CellListItemProps) => {
  return <div>{cell.id}</div>;
};

export default CellListItem;
