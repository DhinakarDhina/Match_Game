const TabItem = ({tabDetails, isActive, onClickTab}) => (
  <li>
    <button
      type="button"
      className={isActive ? 'active-tab' : ''}
      onClick={() => onClickTab(tabDetails.tabId)}
    >
      {tabDetails.displayText}
    </button>
  </li>
)
export default TabItem
