import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/pages/BudgetBuddy.scss";

const BudgetBuddy = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Topbar />
        <div className="grid">
          {/* Cards and charts will go here */}
          <div className="card placeholder">Budget Summary</div>
          <div className="card placeholder">Category Pie Chart</div>
          <div className="card placeholder full">Spending Graph</div>
        </div>
      </main>
    </div>
  );
};

export default BudgetBuddy;
