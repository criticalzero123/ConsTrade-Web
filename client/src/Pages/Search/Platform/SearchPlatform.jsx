import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductByPlatform } from "../../../actions/productActions";
import PlatformCard from "../../../Components/Search/Platform/PlatformCard";

const SearchPlatform = () => {
  const { platform } = useParams();

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.getAllProductByPlatformReducer
  );

  useEffect(() => {
    dispatch(getAllProductByPlatform(platform));
  }, [dispatch, platform]);

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
          <PlatformCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPlatform;
