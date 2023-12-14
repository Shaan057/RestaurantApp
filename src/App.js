import './App.css'
import {Component} from 'react'
// import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
// import Cart from './Components/Cart'
// import NotFound from './Components/NotFound'
import Context from './Context'

class App extends Component {
  state = {
    restaurantName: '',
    cartData: [{activeTabId: 'Salads and Soup', itemsCount: 0}],
    activeTab: 'Salads and Soup',
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

  increaseCartCount = id => {
    const {cartData} = this.state

    const isPresent = cartData.some(each => each.activeTabId === id)

    if (isPresent) {
      const arr = cartData.map(each => {
        if (each.activeTabId === id) {
          return {
            ...each,
            itemsCount: each.itemsCount + 1,
          }
        }
        return each
      })

      this.setState({
        cartData: arr,
      })
    } else {
      this.setState(prev => ({
        cartData: [...prev.cartData, {activeTabId: id, itemsCount: 0}],
      }))
    }
  }

  decreaseCartCount = id => {
    const {cartData} = this.state
    const arr = cartData.map(each => {
      if (each.activeTabId === id) {
        return {
          ...each,
          itemsCount: each.itemsCount > 0 ? each.itemsCount - 1 : 0,
        }
      }
      return each
    })
    this.setState({
      cartData: arr,
    })
  }

  setRestaurantName = value => {
    this.setState({restaurantName: value})
  }

  render() {
    const {restaurantName, activeTab, cartData} = this.state

    return (
      <Context.Provider
        value={{
          restaurantName,
          setRestaurantName: this.setRestaurantName,
          increaseCartCount: this.increaseCartCount,
          decreaseCartCount: this.decreaseCartCount,
          cartData,
          activeTab,
          setActiveTabs: this.setActiveTabs,
        }}
      >
        <Home />
        {/* <Switch> */}
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/cart" component={Cart} /> */}
        {/* <Route exact path="/not-found" component={NotFound} /> */}
        {/* <Redirect to="/not-found" /> */}
        {/* </Switch> */}
      </Context.Provider>
    )
  }
}

export default App
