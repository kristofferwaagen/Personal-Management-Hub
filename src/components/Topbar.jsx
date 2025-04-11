import "../styles/components/Topbar.scss";
import { toggleTheme } from "../utils/theme";

const Topbar = () => {
  return (
    <header className="topbar">
      <span className="demo-badge">Demo</span>
      <button className="theme-toggle" onClick={toggleTheme}>🌓</button>
    </header>
  );
};

export default Topbar;
