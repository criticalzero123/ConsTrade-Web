import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductByGenre } from "../../../actions/productActions";
import GenreCard from "../../../Components/Search/Genre/GenreCard";

const SearchGenre = () => {
  const { genre } = useParams();

  const dispatch = useDispatch();

  const { products, error, loading } = useSelector(
    (state) => state.getAllProductByGenreReducer
  );

  useEffect(() => {
    dispatch(getAllProductByGenre(genre));
  }, [dispatch, genre]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // Change this to error if got no find
    // TODO: Temporary solution
    return <div>No Item Found</div>;
  }

  if (products.length === 0) {
    return <div>No item found</div>;
  }

  return (
    <div className="container mx-auto lg:px-4 px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <GenreCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchGenre;
