import './index.css'

const MenuCategoryItems = props => {
  const {data, activeTab, setActiveTab} = props
  const {menuCategory} = data

  const setActiveTabOn = () => {
    setActiveTab(menuCategory)
  }
  const activeTabClass =
    activeTab === menuCategory
      ? 'activeItem menu-category-item'
      : 'menu-category-item'
  return (
    <li className={activeTabClass}>
      <button className="menus-button" type="button" onClick={setActiveTabOn}>
        {menuCategory}
      </button>
    </li>
  )
}

export default MenuCategoryItems
