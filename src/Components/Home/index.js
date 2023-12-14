import './index.css'
import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Dishes from '../Dishes'
import Context from '../../Context'
import MenuCategoryItems from '../MenuCategoryItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const context = useContext(Context)
  const {setRestaurantName, activeTab} = context

  const [apiData, setApiData] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const formattedData = data => ({
    branchName: data.branch_name,
    restaurantId: data.restaurant_id,
    restaurantName: data.restaurant_name,
    restaurantImage: data.restaurant_image,
    tableId: data.table_id,
    tableName: data.table_name,
    nextUrl: data.nexturl,
    tableMenuList: data.table_menu_list.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nexturl,
      categoryDishes: each.category_dishes.map(obj => ({
        count: 0,
        dishId: obj.dish_id,
        dishName: obj.dish_name,
        dishPrice: obj.dish_price,
        dishImage: obj.dish_image,
        dishCurrency: obj.dish_currency,
        dishCalories: obj.dish_calories,
        dishDescription: obj.dish_description,
        dishAvailability: obj.dish_Availability,
        dishType: obj.dish_Type,
        nextUrl: obj.nexturl,
        addOnCat: obj.addonCat.map(d => ({
          addonCategory: d.addon_category,
          addonCategoryId: d.addon_category_id,
          addonSelection: d.addon_selection,
          nextUrl: d.nexturl,
          addons: d.addons.map(a => ({
            isChecked: false,
            dishId: a.dish_id,
            dishName: a.dish_name,
            dishPrice: a.dish_price,
            dishImage: a.dish_image,
            dishCurrency: a.dish_currency,
            dishCalories: a.dish_calories,
            dishDescription: a.dish_description,
            dishAvailability: a.dish_Availability,
            dishType: a.dish_Type,
          })),
        })),
      })),
    })),
  })

  const increaseCount = (value, id, activeTabId) => {
    const updatedData = apiData.tableMenuList.map(each => {
      if (each.menuCategory === activeTabId) {
        const updatedCategoryDishes = each.categoryDishes.map(e => {
          if (e.dishId === id) {
            return {
              ...e,
              count: e.count + 1,
            }
          }
          return e
        })

        return {
          ...each,
          categoryDishes: updatedCategoryDishes,
        }
      }
      return each
    })
    const newData = {
      ...apiData,
      tableMenuList: updatedData,
    }
    setApiData(newData)
  }

  const decreaseCount = (value, id, activeTabId) => {
    const updatedData = apiData.tableMenuList.map(each => {
      if (each.menuCategory === activeTabId) {
        const updatedCategoryDishes = each.categoryDishes.map(e => {
          if (e.dishId === id) {
            if (e.count > 0) {
              return {
                ...e,
                count: e.count - 1,
              }
            }
          }
          return e
        })

        return {
          ...each,
          categoryDishes: updatedCategoryDishes,
        }
      }
      return each
    })
    const newData = {
      ...apiData,
      tableMenuList: updatedData,
    }
    setApiData(newData)
  }

  const fetchData = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok === true) {
      const [result] = responseData.map(each => formattedData(each))
      const {restaurantName} = result
      setApiData(result)
      setApiStatus(apiStatusConstants.success)
      setRestaurantName(restaurantName)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderVideosView = () => {
    const {tableMenuList} = apiData
    const [activeDishes] = tableMenuList.filter(
      each => each.menuCategory === activeTab,
    )

    return (
      <>
        <Header id={activeTab} />
        <ul className="menu-category-container">
          {tableMenuList.map(each => (
            <MenuCategoryItems
              key={each.menuCategory}
              data={each}
              activeTAB={activeTab}
            />
          ))}
        </ul>
        <ul className="dishes-list-container">
          {activeDishes.categoryDishes.map(ea => (
            <Dishes
              key={ea.dishId}
              data={ea}
              activeTabId={activeDishes.menuCategory}
              increaseCount={increaseCount}
              decreaseCount={decreaseCount}
              //   updateAddons={updateAddons}
            />
          ))}
        </ul>
      </>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="black" height="50" width="50" />
    </div>
  )
  const renderFailureView = () => (
    <div className="failure-container">
      <div>
        <h1 className="failure">Something went wrong.</h1>
        <p> Please try again later.</p>
      </div>
    </div>
  )

  const renderOriginalsVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  return <div className="bg-container">{renderOriginalsVideos()}</div>
}

export default Home

// furture

//   const updateAddons = (checked, mainDishId, activeTabId, addOnDishId) => {
//     const {apiData} = state
//     const updatedMenuList = apiData.tableMenuList.map(each => {
//       if (each.menuCategoryId === activeTabId) {
//         const newCategoryDishes = each.categoryDishes.map(e => {
//           if (e.dishId === mainDishId) {
//             const newAddonCatList = e.addOnCat.map(b => {
//               if (b.addons.some(a => a.dishId === addOnDishId)) {
//                 return {
//                   ...b,
//                   addons: b.addons.map(a => {
//                     if (a.dishId === addOnDishId) {
//                       return {
//                         ...a,
//                         isChecked: !a.isChecked,
//                       }
//                     }
//                     return a
//                   }),
//                 }
//               }
//               return b
//             })
//             return {
//               ...e,
//               addOnCat: newAddonCatList,
//             }
//           }
//           return e
//         })
//         return {
//           ...each,
//           categoryDishes: newCategoryDishes,
//         }
//       }
//       return each
//     })

//     const newData = {
//       ...apiData,
//       tableMenuList: updatedMenuList,
//     }
//     setState(prev => ({
//       ...prev,
//       apiData: newData,
//     }))
//   }
