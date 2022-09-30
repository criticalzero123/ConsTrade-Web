import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Link to={`/product/${product._id}`}> Product ID {product._id}</Link>
    </div>
  );
};

export default ProductCard;
