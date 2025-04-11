import "../styles/components/Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>BudgetBuddy</h2>
      <nav>
        <ul>
          <li>Dashboard</li>
          {/* Add more links when modules grow */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
