import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const App = () => {
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
};

root.render(<App />);
