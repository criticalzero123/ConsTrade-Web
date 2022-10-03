import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import ProductCard from "../../Components/ProductCard/ProductCard";

import { Link } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  const getallproducts = useSelector((state) => state.getAllProductsReducer);

  const { loading, products, error } = getallproducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Something Went Wrong Check for the logs</h1>
      ) : (
        products &&
        products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))
      )}

      <Link to="/product/add">Add a item</Link>
    </div>
  );
};

export default Index;
