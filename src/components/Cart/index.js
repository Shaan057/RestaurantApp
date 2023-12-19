import './index.css'
import {useContext} from 'react'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartItems from '../CartItems'

const Cart = () => {
  const context = useContext(CartContext)
  const {cartList, removeAllCartItems} = context

  const emptyCartView = () => (
    <div className="cart-empty-list">
      <img
        className="empty-cart-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty-cart"
      />
      <p>Add Items To The Cart</p>
    </div>
  )

  const renderCartList = () => (
    <>
      <button
        className="cart-removeAll-button"
        onClick={removeAllCartItems}
        type="button"
      >
        Remove All
      </button>
      <ul className="cart-dishes">
        {cartList.map(each => (
          <CartItems key={each.dishId} cartData={each} />
        ))}
      </ul>
    </>
  )

  return (
    <div>
      <Header />
      <div className="cart-background-container">
        {cartList.length === 0 ? emptyCartView() : renderCartList()}
      </div>
    </div>
  )
}

export default Cart
