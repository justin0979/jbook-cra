import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { CodeCell } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

root.render(<App />);
