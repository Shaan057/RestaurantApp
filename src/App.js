/* eslint-disable no-else-return */
import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'
import Context from './Context'
import ProtectedRoute from './Components/ProtectedRoute'

class App extends Component {
  state = {
    restaurantName: '',
    // cartData: [{activeTabId: 'Salads and Soup', itemsCount: 0}],
    activeTab: 'Salads and Soup',
    cartList: [],
    // itemsCount: 0,
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = data => {
    const {cartList} = this.state
    const isPresent = cartList.some(each => each.dishId === data.dishId)
    if (isPresent) {
      const cartArray = cartList.map(each => {
        if (each.dishId === data.dishId) {
          return {
            ...each,
            count: each.count + data.count,
          }
        }
        return each
      })
      this.setState({
        cartList: cartArray,
      })
    } else {
      this.setState(prev => ({
        cartList: [...prev.cartList, data],
      }))
    }
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.dishId !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.dishId === id) {
          return {
            ...each,
            count: each.count + 1,
          }
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const dish = cartList.find(each => each.dishId === id)

    if (dish.count > 1) {
      const newCartList = cartList.map(each => {
        if (each.dishId === id) {
          return {
            ...each,
            count: each.count - 1,
          }
        }
        return each
      })
      this.setState({
        cartList: newCartList,
      })
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.filter(each => each.dishId !== id),
      }))
    }
  }

  //   increaseItemsCount = () => {
  //     this.setState(prev => ({
  //       itemsCount: prev.itemsCount + 1,
  //     }))
  //   }

  //   decreaseItemsCount = () => {
  //     const {itemsCount} = this.state
  //     if (itemsCount > 0) {
  //       this.setState(prev => ({
  //         itemsCount: prev.itemsCount - 1,
  //       }))
  //     }
  //   }

  setActiveTab = tab => {
    this.setState({
      activeTab: tab,
    })
  }

  setActiveTabs = id => {
    const {cartData} = this.state

    const isPresent = cartData.some(each => each.activeTabId === id)
    if (!isPresent) {
      this.setState(prev => ({
        cartData: [...prev.cartData, {activeTabId: id, itemsCount: 0}],
      }))
    }
    this.setState({activeTab: id})
  }

  //   increaseCartCount = id => {
  //     const {cartData} = this.state

  //     const isPresent = cartData.some(each => each.activeTabId === id)

  //     if (isPresent) {
  //       const arr = cartData.map(each => {
  //         if (each.activeTabId === id) {
  //           return {
  //             ...each,
  //             itemsCount: each.itemsCount + 1,
  //           }
  //         }
  //         return each
  //       })

  //       this.setState({
  //         cartData: arr,
  //       })
  //     } else {
  //       this.setState(prev => ({
  //         cartData: [...prev.cartData, {activeTabId: id, itemsCount: 0}],
  //       }))
  //     }
  //   }

  //   decreaseCartCount = id => {
  //     const {cartData} = this.state
  //     const arr = cartData.map(each => {
  //       if (each.activeTabId === id) {
  //         return {
  //           ...each,
  //           itemsCount: each.itemsCount > 0 ? each.itemsCount - 1 : 0,
  //         }
  //       }
  //       return each
  //     })
  //     this.setState({
  //       cartData: arr,
  //     })
  //   }

  setRestaurantName = value => {
    this.setState({restaurantName: value})
  }

  render() {
    const {restaurantName, activeTab, cartList} = this.state

    return (
      <Context.Provider
        value={{
          restaurantName,
          setRestaurantName: this.setRestaurantName,
          increaseCartCount: this.increaseCartCount,
          decreaseCartCount: this.decreaseCartCount,
          activeTab,
          setActiveTab: this.setActiveTab,
          //   itemsCount,
          //   increaseItemsCount: this.increaseItemsCount,
          //   decreaseItemsCount: this.decreaseItemsCount,
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          {/* <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" /> */}
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
