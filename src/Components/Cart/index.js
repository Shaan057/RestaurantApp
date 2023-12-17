import './index.css'
import {useContext} from 'react'

import Header from '../Header'
import Context from '../../Context'
import CartItems from '../CartItems'

const CartRoute = () => {
  const context = useContext(Context)
  const {cartList, removeAllCartItems} = context

  return (
    <>
      <Header />
      <div className="cart-background-container">
        {cartList.length === 0 ? (
          <div className="cart-empty-list">
            <img
              className="empty-cart-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="Empty Cart"
            />
            <p>Add Items to The Cart</p>
          </div>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default CartRoute
