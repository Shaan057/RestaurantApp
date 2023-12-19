import './index.css'
import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

const Header = props => {
  const {history} = props

  const onLogoutButtonClicked = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  //   const onClickCart = () => {
  //     history.push('/cart')
  //   }
  const context = useContext(CartContext)

  const {restaurantName, cartList} = context // itemsCount,cartData

  const itemsInCart = cartList.length
  return (
    <nav className="navBar">
      <Link to="/" className="link restaurantName-container">
        <h1 className="restaurantName">{restaurantName}</h1>
      </Link>
      <div className="buttons-div">
        <p className="my-orders">My Orders</p>
        <Link to="/cart" className="link">
          <button className="cart-button" type="button">
            <img
              className="cart-icon"
              src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1702554012/Movies%20App/Login%20Page/cart1_chhkzo.png"
              alt="cart icon"
            />
          </button>
        </Link>
        <span className="cart-items">
          <p className="items-count">{itemsInCart}</p>
        </span>
        <button
          className="logout-button"
          type="button"
          onClick={onLogoutButtonClicked}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
