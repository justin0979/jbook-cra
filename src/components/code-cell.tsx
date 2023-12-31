import "./code-cell.css";
import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks";
import { useTypedSelector, useCumulativeCode } from "../hooks";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
  const { updateCell, createBundle } = useActions(); // update user input content
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  /*
   * This useEffect is only here to wait 750ms before bundling code instead the app
   * bundling every keypress. This 750ms wait will not render the Preview component
   * to the screen immediately since bundle is undefined.
   */
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress
                className="progress is-small is-primary"
                max="100"
              >
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
