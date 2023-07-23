import "./add-cell.css";
import { useActions } from "../hooks";

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell = ({ nextCellId }: AddCellProps) => {
  const { insertCellBefore } = useActions();

  return (
    <div>
      <button onClick={() => insertCellBefore(nextCellId, "code")}>
        + Code
      </button>
      <button onClick={() => insertCellBefore(nextCellId, "text")}>
        + Text
      </button>
    </div>
  );
};

export default AddCell;
