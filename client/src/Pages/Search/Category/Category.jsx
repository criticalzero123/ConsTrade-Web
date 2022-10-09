import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProductByCategory } from "../../../actions/productActions";

import CategoryComponent from "../../../Components/Search/Category/CategoryComponent";

const Category = () => {
  const { category } = useParams();

  const dispatch = useDispatch();

  const getProductByCategory = useSelector(
    (state) => state.getAllProductByCategoryReducer
  );

  const { products, error, loading } = getProductByCategory;

  useEffect(() => {
    dispatch(getAllProductByCategory(category));
  }, [dispatch, category]);
  return (
    <div>
      {error && <div>error</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        products && (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <CategoryComponent product={product} key={product._id} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Category;
