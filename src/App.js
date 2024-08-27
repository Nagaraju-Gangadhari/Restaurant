import {Component} from 'react'
import Header from './components/Header'
import Cards from './components/Cards'
import './App.css'

//write your code here
class App extends Component {
  state = {activeMenuCategory: [], menuList: [], count: 0}
  componentDidMount() {
    this.getDetailsofRestaurant()
  }
  getDetailsofRestaurant = async () => {
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      options,
    )
    if (response.ok) {
      const fetcheddata = await response.json()
      const updatedData = fetcheddata[0].table_menu_list.map(each => ({
        categoryDishes: each.category_dishes,
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        nextUrl: each.nexturl,
      }))
      const categoryData =
        fetcheddata[0].table_menu_list[0].category_dishes.map(eachone => ({
          dishAvailability: eachone.dish_Availability,
          dishCalories: eachone.dish_calories,
          addonCat: eachone.addonCat,
          dishCurrency: eachone.dish_currency,
          dishId: eachone.dish_id,
          dishImage: eachone.dish_image,
          dishName: eachone.dish_name,
          dishDescription: eachone.dish_description,
          dishPrice: eachone.dish_price,
        }))
      console.log(categoryData[0])
      this.setState({
        menuList: updatedData,
        activeMenuCategory: updatedData[0].categoryDishes,
      })
    } else {
      console.log('error')
    }
  }
  onClicktoCountDecrease = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }
  onClicktoCountIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }
  onClicktoChangeactive = event => {
    const {menuList} = this.state
    const updatedactiveCategory = menuList.filter(
      eachone => eachone.menuCategoryId === event.target.value,
    )
    this.setState({
      activeMenuCategory: updatedactiveCategory[0].categoryDishes,
    })
  }
  renderSlides = () => {
    const {menuList, activeMenuCategory} = this.state
    return (
      <>
        <ul className="slider">
          {menuList.map(each => (
            <li className="listitem" key={each.menuCategoryId}>
              <button
                className="button"
                onClick={this.onClicktoChangeactive}
                value={each.menuCategoryId}
              >
                {each.menuCategory}
              </button>
            </li>
          ))}
        </ul>
      </>
    )
  }
  renderCards = () => {
    const {menuList, activeMenuCategory, count} = this.state

    return (
      <ul className="listContainer">
        {activeMenuCategory.map(each => (
          <li className="foodItem" key={each.dishId}>
            <Cards
              cardsitem={each}
              count={count}
              onClicktoCountDecrease={this.onClicktoCountDecrease}
              onClicktoCountIncrease={this.onClicktoCountIncrease}
            />
          </li>
        ))}
      </ul>
    )
  }
  renderpage = () => {
    return (
      <>
        <div className="container">
          <Header />
          {this.renderSlides()}
          {this.renderCards()}
        </div>
      </>
    )
  }
  render() {
    return <div>{this.renderpage()}</div>
  }
}

export default App
