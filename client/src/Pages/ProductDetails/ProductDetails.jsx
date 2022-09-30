import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const getproductbyid = useSelector((state) => state.getProductByIdReducer);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const { loading, error, product } = getproductbyid;

  return <div>{product && product._id}</div>;
};

export default ProductDetails;
