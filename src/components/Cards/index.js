import './index.css'

const Cards = props => {
  const {cardsitem, count, onClicktoCountDecrease, onClicktoCountIncrease} =
    props
  const filteredList = {
    dishAvailability: cardsitem.dish_Availability,
    dishCalories: cardsitem.dish_calories,
    addonCat: cardsitem.addonCat,
    dishCurrency: cardsitem.dish_currency,
    dishId: cardsitem.dish_id,
    dishImage: cardsitem.dish_image,
    dishName: cardsitem.dish_name,
    dishDescription: cardsitem.dish_description,
    dishPrice: cardsitem.dish_price,
  }
  const {
    dishAvailability,
    dishCalories,
    addonCat,
    dishCurrency,
    dishId,
    dishImage,
    dishName,
    dishDescription,
    dishPrice,
  } = filteredList

  const onClickDecrease = () => {
    onClicktoCountDecrease()
  }
  const onClicktoncrease = () => {
    onClicktoCountIncrease()
  }
  return (
    <>
      <div className="start">
        <h1 className="head">{dishName}</h1>
        <p className="head2">
          {dishCurrency} {dishPrice}
        </p>
        <p>{dishDescription}</p>
        {dishAvailability ? (
          <div className="buttonbg">
            <button className="buttonplus" onClick={onClickDecrease}>
              -
            </button>
            <p>0</p>
            <button className="buttonplus" onClick={onClicktoncrease}>
              +
            </button>
          </div>
        ) : (
          <p className="paragra">Not available</p>
        )}
        {addonCat.length > 0 ? (
          <p className="custom">Customizations available</p>
        ) : null}
      </div>
      <div className="start">
        <p className="calories">{dishCalories} calories</p>
      </div>
      <div className="start">
        <img src={dishImage} className="image" alt={dishName} />
      </div>
    </>
  )
}
export default Cards
