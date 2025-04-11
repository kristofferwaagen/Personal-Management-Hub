import { useEffect } from "react";
import { loadTheme } from "./utils/theme";
import BudgetBuddy from "./pages/BudgetBuddy";
import "./index.scss";

function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  return <BudgetBuddy />;
}

export default App;
