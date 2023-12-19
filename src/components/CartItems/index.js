import './index.css'
import {useContext} from 'react'
import CartContext from '../../context/CartContext'

const CartItems = props => {
  const {cartData} = props
  const {
    dishId,
    dishImage,
    dishName,
    dishPrice,
    count,
    dishCurrency,
    dishCalories,
    dishDescription,
  } = cartData
  const context = useContext(CartContext)

  const {
    removeCartItem,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
  } = context

  //   const onRemoveDish = () => {
  //     removeCartItem(dishId)
  //   }

  const onRemoveCartItem = () => {
    removeCartItem(dishId)
  }

  const onIncreaseItems = () => {
    incrementCartItemQuantity(dishId)
  }

  const onDecreaseItems = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-item">
      <img className="cart-dish-image" src={dishImage} alt={dishName} />
      <div className="cart-dish-details">
        <div className="cart-dish-price">
          <h2 className="cart-dish-name">{dishName}</h2>
          <p className="cart-dish-rate">
            {dishCurrency} {dishPrice * count}
            {/* {(dishPrice * count).toFixed(2)} */}
            {/* <span className="sub"> {dishCurrency}</span> */}
          </p>
          <div className="cart-count-counter">
            <button
              className="cart-counter-button"
              type="button"
              onClick={onDecreaseItems}
            >
              -
            </button>
            <p className="cart-count-point">{count}</p>
            <button
              className="cart-counter-button"
              type="button"
              onClick={onIncreaseItems}
            >
              +
            </button>
          </div>
          <button
            className="cart-remove-button-sm"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
        <div className="description-calorie-div">
          <p className="dish-calories">{dishCalories} Calories</p>
          <p className="cart-dish-description">{dishDescription}</p>
        </div>
      </div>

      <button
        className="cart-remove-button-md"
        type="button"
        onClick={onRemoveCartItem}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItems
