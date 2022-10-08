import React from "react";
import { useSelector } from "react-redux";
import FavoriteCard from "../../Components/Favorite/FavoriteCard";

const Favorites = () => {
  const getFavorites = useSelector((state) => state.userInfoReducer);

  const { favorites } = getFavorites.currentUser && getFavorites.currentUser;

  return (
    <div className="flex">
      {favorites &&
        favorites.map((favorite) => (
          <FavoriteCard favorite={favorite} key={favorite.productId} />
        ))}
    </div>
  );
};

export default Favorites;
