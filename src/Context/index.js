import React from 'react'

const Context = React.createContext({
  restaurantName: '',
  setRestaurantName: () => {},
  //   increaseCartCount: () => {},
  //   decreaseCartCount: () => {},
  //   cartData: [],
  activeTab: 'Salads and Soup',
  setActiveTab: () => {},
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
