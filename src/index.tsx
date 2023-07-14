import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom/client";
import { TextEditor } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

root.render(<App />);
