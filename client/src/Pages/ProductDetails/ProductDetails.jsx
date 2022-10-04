import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import ProductAddComment from "./ProductAddComment/ProductAddComment";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const getproductbyid = useSelector((state) => state.getProductByIdReducer);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const { loading, error, product } = getproductbyid;

  return (
    <div>
      {error && <div>Something Went Wrong...</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        product && (
          <div>
            <p>{product.title}</p>
            <p>comments</p>
            <p>{product.comments !== undefined && product.comments.length}</p>
            {/* input */}
            <ProductAddComment id={id} />
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
