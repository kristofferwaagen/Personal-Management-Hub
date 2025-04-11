import { useEffect, useState } from "react"; // ✅ Make sure useState is imported
import { useDispatch } from "react-redux";
import { injectMockExpensesIfEmpty } from "../utils/mockData";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BudgetSummaryCard from "../components/BudgetSummaryCard";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingLineGraph from "../components/SpendingLineGraph";
import ControlsPanel from "../components/ControlsPanel";
import Modal from "../components/Modal";
import "../styles/pages/BudgetBuddy.scss";

const BudgetBuddy = () => {
  const dispatch = useDispatch();
  const [isAddOpen, setAddOpen] = useState(false);
  const [isRemoveOpen, setRemoveOpen] = useState(false);
  const [isBudgetOpen, setBudgetOpen] = useState(false);
  const [isCurrencyOpen, setCurrencyOpen] = useState(false);

  // ✅ Inject mock data when component mounts
  useEffect(() => {
    injectMockExpensesIfEmpty(dispatch);
  }, [dispatch]);

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Topbar />
        <div className="top-controls">
          <button onClick={() => setAddOpen(true)}>Add expense ➕</button>
          <button onClick={() => setRemoveOpen(true)}>Remove expense 🗑️</button>
          <button onClick={() => setBudgetOpen(true)}>Adjust budget</button>
          <button onClick={() => setCurrencyOpen(true)}>Change currency</button>
        </div>

        {/* Modals */}
        <Modal isOpen={isAddOpen} onClose={() => setAddOpen(false)}>
          <ControlsPanel only="add" onClose={() => setAddOpen(false)} />
        </Modal>

        <Modal isOpen={isRemoveOpen} onClose={() => setRemoveOpen(false)}>
          <ControlsPanel only="remove" onClose={() => setRemoveOpen(false)} />
        </Modal>

        <Modal isOpen={isBudgetOpen} onClose={() => setBudgetOpen(false)}>
          <ControlsPanel only="budget" onClose={() => setBudgetOpen(false)} />
        </Modal>

        <Modal isOpen={isCurrencyOpen} onClose={() => setCurrencyOpen(false)}>
          <ControlsPanel
            only="currency"
            onClose={() => setCurrencyOpen(false)}
          />
        </Modal>

        {/* Dashboard */}
        <div className="grid">
          <div className="card">
            <BudgetSummaryCard />
          </div>
          <div className="card">
            <CategoryPieChart />
          </div>
          <div className="card full">
            <SpendingLineGraph />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetBuddy;
