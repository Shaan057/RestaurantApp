import './App.css'
import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    restaurantName: '',
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

  setRestaurantName = value => {
    this.setState({restaurantName: value})
  }

  render() {
    const {restaurantName, cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          restaurantName,
          setRestaurantName: this.setRestaurantName,

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
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
