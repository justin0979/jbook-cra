import { useTypedSelector } from "../hooks";
import CellListItem from "./cell-list-item";

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  return (
    <div>
      <h1>Cell List</h1>
      <CellListItem />
    </div>
  );
};

export default CellList;
