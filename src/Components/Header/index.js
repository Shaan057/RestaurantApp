import './index.css'
import {useContext} from 'react'
// import {Link} from 'react-router-dom'
// import {GrCafeteria} from 'react-icons/gr'
// import {AiOutlineShoppingCart} from 'react-icons/ai'
import Context from '../../Context'

const Header = props => {
  const {id} = props
  const context = useContext(Context)
  const {restaurantName, cartData, itemsCount} = context
  const object = cartData.find(each => each.activeTabId === id)

  //   const {itemsCount} = object
  return (
    <nav className="navBar">
      {/* <Link to="/" className="link"> */}
      <div className="restaurantName-container">
        {/* <GrCafeteria className="website-icon" /> */}
        <h1 className="restaurantName">{restaurantName}</h1>
      </div>
      {/* </Link> */}
      <div className="buttons-div">
        <p className="my-orders">My Orders</p>
        {/* <Link to="/cart" className="link"> */}
        {/* <button className="cart-button" type="button"> */}
        {/* <AiOutlineShoppingCart className="cart-icon" /> */}
        <img
          className="cart-icon"
          src="https://res.cloudinary.com/dx8csuvrh/image/upload/v1702554012/Movies%20App/Login%20Page/cart1_chhkzo.png"
          alt="cart"
        />
        <span className="cart-items">
          <p className="items-count">{itemsCount}</p>
        </span>
        {/* </button> */}
        {/* </Link> */}
      </div>
    </nav>
  )
}

export default Header
