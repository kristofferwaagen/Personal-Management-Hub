import { useEffect } from "react";
import { loadTheme } from "./utils/theme";
import "./index.scss";
import { toggleTheme } from "./utils/theme";

function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <div className="app">
      <h1>Budget Buddy is ready</h1>
      <button onClick={toggleTheme}>🌓 Toggle Theme</button>
    </div>
  );
}

export default App;
