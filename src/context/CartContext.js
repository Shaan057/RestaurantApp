import React from 'react'

const CartContext = React.createContext({
  restaurantName: '',
  setRestaurantName: () => {},
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
