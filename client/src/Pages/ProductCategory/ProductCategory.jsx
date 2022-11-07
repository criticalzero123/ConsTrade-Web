import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductByCategory } from "../../actions/productActions";
import ProductCategoryCard from "./ProductCategoryCard";

const ProductCategory = () => {
  const { search } = useParams();

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.getAllProductByCategoryReducer
  );

  useEffect(() => {
    dispatch(getAllProductByCategory(search));
  }, [dispatch, search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className="container mx-auto lg:px-4 px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.map((product) => (
            <ProductCategoryCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductCategory;
