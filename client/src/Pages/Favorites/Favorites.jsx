import React from "react";
import { useSelector } from "react-redux";

const Favorites = () => {
  const getFavorites = useSelector((state) => state.userInfoReducer);

  const { favorites } = getFavorites.currentUser && getFavorites.currentUser;

  return (
    <div>
      {favorites &&
        favorites.map((favorite) => (
          <div key={favorite.productId}>{favorite.productId}</div>
        ))}
    </div>
  );
};

export default Favorites;
