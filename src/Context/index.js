import React from 'react'

const Context = React.createContext({
  restaurantName: '',
  setRestaurantName: () => {},
  //   itemsCount: 0,
  //   increaseItemsCount: () => {},
  //   decreaseItemsCount: () => {},
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default Context
