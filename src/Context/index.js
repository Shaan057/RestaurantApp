import React from 'react'

const Context = React.createContext({
  restaurantName: '',
  setRestaurantName: () => {},
  increaseCartCount: () => {},
  decreaseCartCount: () => {},
  cartData: [],
  activeTab: 'Salads and Soup',
  setActiveTabs: () => {},
})

export default Context
