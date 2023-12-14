import './index.css'
import {useContext} from 'react'
// import {FaPlus, FaMinus} from 'react-icons/fa'
// import {IoMdInformationCircleOutline} from 'react-icons/io'
// import {v4 as uuidv4} from 'uuid'
import Context from '../../Context'

const Dishes = props => {
  const {data, activeTabId, increaseCount, decreaseCount} = props

  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    count,
    addOnCat,
  } = data

  const price = count ? dishPrice * count : dishPrice

  const context = useContext(Context)
  const {increaseCartCount, decreaseCartCount} = context

  const isVegNonveg = dishType === 1 ? 'non-veg box' : 'veg box'
  const circle = dishType === 1 ? 'non-veg-circle circle' : 'veg-circle circle'
  const isAddOnAvailable = addOnCat.length !== 0
  const calories = count ? dishCalories * count : dishCalories

  const onIncreased = () => {
    increaseCount(data, dishId, activeTabId)
    increaseCartCount(activeTabId)
  }
  const onDecreased = () => {
    decreaseCount(data, dishId, activeTabId)
    decreaseCartCount(activeTabId)
  }

  // for future
  //   const inputElement = event => {
  //     const isChecked = event.target.checked
  //     const addOnDishId = event.target.value
  //     const mainDishId = dishId
  //     updateAddons(isChecked, mainDishId, activeTabId, addOnDishId)
  //   }

  return (
    <li className="dishes-list-item">
      <div className={isVegNonveg}>
        <span className={circle} />
      </div>
      <div className="dish-info">
        <h1 className="dish-name-heading">{dishName}</h1>
        {/* <div className="currency-container">
          <p className="dish-price">{dishCurrency}</p>
          <p className="dish-price">{price}</p>
        </div> */}
        <p className="dish-price">
          {dishCurrency} {price}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          <>
            <div className="add-to-cart-buttons">
              <button
                className="button"
                type="button"
                onClick={onDecreased}
                disabled={count === 0}
              >
                {/* <FaMinus className="button-icon" /> */}-
              </button>
              <p className="cart-count">{count}</p>
              <button className="button" type="button" onClick={onIncreased}>
                {/* <FaPlus className="button-icon" /> */}+
              </button>
            </div>
            {isAddOnAvailable && (
              <div className="customizations-container">
                <p className="customizations">Customizations available</p>
              </div>
            )}
          </>
        ) : (
          <p className="not-available">Not available</p>
        )}
      </div>
      <div className="calorie-image-container-main">
        <div className="calorie-image-container">
          <div className="calories-container">
            <p>{calories} calories</p>
          </div>
          <div className="dish-image-container">
            <img className="dish-image" src={dishImage} alt={dishName} />
          </div>
        </div>
      </div>
    </li>
  )
}

export default Dishes

//  {isAddOnAvailable ? (
//           <ul className="addons-list">
//             {addOnCat.map(each =>
//               each.addons.map(e => {
//                 const addOnDishId = e.dishId
//                 const dishCals = e.dishCalories
//                 const addOnDishName = e.dishName
//                 const addOnDishCurrency = e.dishCurrency
//                 const addOndishRate = e.dishPrice
//                 const vegNonveg = e.dishType === 1
//                 const isItemVegNonveg = vegNonveg ? 'non-veg box' : 'veg box'
//                 const vegNonVegcircle = vegNonveg
//                   ? 'non-veg-circle circle'
//                   : 'veg-circle circle'
//                 const {isChecked} = e
//                 return (
//                   <li className="addons-item" key={uuidv4()}>
//                     <form className="input-container">
//                       <input
//                         value={addOnDishId}
//                         disabled={count === 0}
//                         onChange={inputElement}
//                         checked={isChecked}
//                         className="input"
//                         id="check"
//                         type="checkbox"
//                       />
//                       <label htmlFor="check" className="add-ons-dish-name">
//                         {addOnDishName}
//                       </label>
//                       <sub className="veg-nonveg-dish">
//                         ({vegNonveg ? 'non-veg' : 'veg'})
//                       </sub>
//                       <IoMdInformationCircleOutline className="addon-dish-info-icon" />
//                     </form>
//                     <p className="add-ons-dish-price">
//                       {addOnDishCurrency}
//                       <span className="add-on-dish-rate">{addOndishRate}</span>
//                     </p>
//                     {/* <div className="modal">
//                       <p>Item: {addOnDishName}</p>
//                       <p>{dishCals} calories</p>
//                       <p>
//                         price: {addOndishRate} {addOnDishCurrency}
//                       </p>
//                       <p>Type: {vegNonveg ? 'non-veg' : 'veg'}</p>
//                     </div> */}
//                   </li>
//                 )
//               }),
//             )}
//           </ul>
//         ) : (
//           <p className="add-ons-not-available">add-ons unavailable</p>
//         )}
