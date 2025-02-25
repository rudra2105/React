import {CON_URL} from "../utils/constant";

const RestaurantCard = (props) => {
    const{resData}=props;
    const {
      cloudinaryImageId = "",
      name = "Unknown Restaurant",
      avgRating = " ",
      cuisines = [],
      costForTwo = "₹0 for two",
      sla: { deliveryTime } = {},
    } = resData?.info || {};
    const cost = parseInt(costForTwo.replace(/[^\d]/g, ""), 10) || 0;
    return (
      <div className="res-card">
        <img
          className="res-logo"
          alt="Restaurant Logo"
          src={`${CON_URL}${cloudinaryImageId}`}
        />
        <h3>{name}</h3>
        <h4>{cuisines.join("," )}</h4>
        <h4>{avgRating} stars</h4>
        <h4>₹{cost} FOR TWO</h4>
        <h4>{deliveryTime ? `${deliveryTime} minutes` : "Unknown ETA"}</h4>
      </div>
    );
  };

  export default RestaurantCard;