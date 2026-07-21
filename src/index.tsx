import "./main.css";
import { createRoot } from "react-dom/client";

const App = () => {
  return <h1>Hello, React + TypeScript + Webpack!</h1>;
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(<App />);
