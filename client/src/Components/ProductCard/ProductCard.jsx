import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="">
      <div className="w-3/4 rounded-lg border bg-gray-500 border-gray-500  hover:drop-shadow-[0_10px_15px_rgba(32,41,65,0.6)] group">
        <Link to={`/product/item/${product._id}`}>
          <div className="h-56">
            <img
              className="rounded-t-lg h-full w-full object-fit"
              src={product.imageURL}
              alt={product._id}
            />
          </div>
          <div className="p-5">
            <h6 className="mb-2 text-lg font-medium tracking-tight text-white font-mono">
              {product.title}
            </h6>
            <p className="mb-3 font-normal text-gray-300">{product.userName}</p>
            <p className="mb-3 font-normal text-gray-300">
              {product.gameGenre}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
