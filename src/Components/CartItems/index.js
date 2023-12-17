import './index.css'
import {useContext} from 'react'
import Context from '../../Context'

const CartItems = props => {
  const {cartData} = props
  const {dishId, dishImage, dishName, dishPrice, count, dishCurrency} = cartData
  const context = useContext(Context)
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
        <h2 className="cart-dish-name">{dishName}</h2>
        <p className="cart-dish-price">
          {dishPrice * count}
          {/* {(dishPrice * count).toFixed(2)} */}
          <span className="sub"> {dishCurrency}</span>
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
      <button
        className="cart-remove-button"
        type="button"
        onClick={onRemoveCartItem}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItems
