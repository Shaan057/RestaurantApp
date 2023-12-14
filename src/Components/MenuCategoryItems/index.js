import './index.css'
import {useContext} from 'react'

import Context from '../../Context'

const MenuCategoryItems = props => {
  const context = useContext(Context)
  const {setActiveTabs, activeTab} = context
  const {data} = props
  const {menuCategory} = data

  const setActiveTabOn = () => {
    setActiveTabs(menuCategory)
  }
  const activeTabClass =
    activeTab === menuCategory
      ? 'activeItem menu-category-item'
      : 'menu-category-item'
  return (
    <li className={activeTabClass} onClick={setActiveTabOn}>
      <button className="menus-button" type="button">
        {menuCategory}
      </button>
    </li>
  )
}

export default MenuCategoryItems
