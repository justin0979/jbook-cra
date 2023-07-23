import "./add-cell.css";
import { useActions } from "../hooks";

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell = ({ nextCellId }: AddCellProps) => {
  const { insertCellBefore } = useActions();

  return (
    <div className="add-cell">
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small btn--code"
          onClick={() => insertCellBefore(nextCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small btn--text"
          onClick={() => insertCellBefore(nextCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fa fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
