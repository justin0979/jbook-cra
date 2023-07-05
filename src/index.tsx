import ReactDOM from "react-dom/client";
import { useState } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState(""); // transpiled & bundled code to be in the pre element

  const onClick = () => {
    console.log(input);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        cols={80}
        rows={15}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

root.render(<App />);
