import { useEffect } from "react";
import { loadTheme } from "./utils/theme";
import { injectMockExpensesIfEmpty } from "./utils/mockData";
import BudgetBuddy from "./pages/BudgetBuddy";
import "./index.scss";

function App() {
  useEffect(() => {
    injectMockExpensesIfEmpty();
    loadTheme();
  }, []);

  return <BudgetBuddy />;
}

export default App;
