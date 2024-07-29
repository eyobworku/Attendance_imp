import "../css/Tabs.css";
import { useSelector } from "react-redux";

function TabItem({ tabId, label, isChecked, onChange, children }) {
  const table1State = useSelector((state) => state.tables.tables[tabId]);

  return (
    <>
      <input
        type="radio"
        className="tabs__radio"
        name="tabs-example"
        id={tabId}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={tabId} className="tabs__label">
        {label}
      </label>
      <div className="tabs__content">{children}</div>
    </>
  );
}

export default TabItem;
