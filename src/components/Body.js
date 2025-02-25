import RestaurantCard from "./RestaurantCard";
import {useState,useEffect} from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [ListofRestaurant,setListofRestaurant]=useState([]);
  const [filteredRestaurant,setFilteredRestaurant]=useState([]);

  const [searchText,setSearchText]=useState(""); 

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData=async()=>{
    const data=await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json=await data.json();
    console.log(json);
    setListofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  if(ListofRestaurant.length===0){
    return <Shimmer/>;
  }
    
  return ListofRestaurant.length===0?(<Shimmer/>):(
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" className="search-box" value={searchText}
          onChange={(e)=>{
            setSearchText(e.target.value);
          }}
          />
          <button
          onClick={()=>{
            const filteredRes = ListofRestaurant.filter(
              (res) => res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filteredRes);
          }}
          >
            search
          </button>
        </div>
        <button className="filter-btn"
        onClick={()=>{
          const filteredList = ListofRestaurant.flat().filter(
            (res) => res.info?.avgRating && res.info.avgRating > 4.5
          );
           setListofRestaurant(filteredList);
        }}
        >Top Rated Restaurants</button> 
      </div>
      <div className="res-container">
      {filteredRestaurant.flat()
          .map((restaurant, index) => (
            <RestaurantCard key={index} resData={restaurant} />
          ))}
      </div>
    </div>
  );
};

export default Body;