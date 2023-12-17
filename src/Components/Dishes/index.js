import './index.css'
import {useContext, useState} from 'react'
import Context from '../../Context'

const Dishes = props => {
  const {data} = props //  activeTabId, increaseCount, decreaseCount
  const [count, setCount] = useState(0)
  const {
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    // count,
    addOnCat,
  } = data

  //   const price = count ? dishPrice * count : dishPrice

  const context = useContext(Context)
  const {
    // itemsCount,
    // increaseItemsCount,
    // decreaseItemsCount,
    addCartItem,
  } = context

  const onAddToCartButtonClicked = () => {
    addCartItem({...data, count})
  }

  const isVegNonveg = dishType === 1 ? 'non-veg box' : 'veg box'
  const circle = dishType === 1 ? 'non-veg-circle circle' : 'veg-circle circle'
  const isAddOnAvailable = addOnCat.length !== 0
  //   const calories = count ? dishCalories * count : dishCalories

  const onIncreased = () => {
    setCount(prev => prev + 1)
    // increaseCount(data, dishId, activeTabId)
    // increaseItemsCount()
  }
  const onDecreased = () => {
    if (count > 0) {
      setCount(prev => prev - 1)
    }
    // decreaseCount(data, dishId, activeTabId)
    // decreaseItemsCount()
  }

  return (
    <li className="dishes-list-item">
      <div className={isVegNonveg}>
        <span className={circle} />
      </div>
      <div className="dish-info">
        <h1 className="dish-name-heading">{dishName}</h1>

        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability ? (
          <>
            <div className="flex-container">
              <div className="add-to-cart-buttons">
                <button
                  className="button"
                  type="button"
                  onClick={onDecreased}
                  disabled={count === 0}
                >
                  -
                </button>
                <p className="cart-count">{count}</p>
                <button className="button" type="button" onClick={onIncreased}>
                  +
                </button>
              </div>
              {count > 0 ? (
                <button
                  className="add-to-cart-button"
                  type="button"
                  onClick={onAddToCartButtonClicked}
                >
                  ADD TO CART
                </button>
              ) : null}
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
        {/* <div className="calorie-image-container"> */}
        <div className="calories-container">
          <p>{dishCalories} calories</p>
        </div>
        <div className="dish-image-container">
          <img className="dish-image" src={dishImage} alt={dishName} />
        </div>
      </div>
      {/* </div> */}
    </li>
  )
}

export default Dishes
