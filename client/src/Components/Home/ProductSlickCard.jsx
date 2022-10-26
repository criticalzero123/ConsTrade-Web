import React from "react";
import { Link } from "react-router-dom";

import { firstLetterUpper } from "../../service/userService";

import { AiFillHeart } from "react-icons/ai";

const ProductSlickCard = ({ product }) => {
  return (
    <div className=" hover:bg-gray-200 rounded-lg border border-gray-200 mx-3">
      <Link to={`/product/item/${product._id}`}>
        <div className="relative">
          <div className="h-56 flex justify-center">
            <img
              className="rounded-lg h-full w-full object-contain shadow-md"
              src={product.imageURL}
              alt={product._id}
            />
          </div>
          <div className="p-5 ">
            <h4 className="text-sm text-gray-500 tracking-tight text-ellipsis overflow-hidden whitespace-nowrap w-32 lg:w-full">
              {firstLetterUpper(product.userName)}
            </h4>
            <h3 className="text-lg  text-black font-mono tracking-tight text-ellipsis overflow-hidden whitespace-nowrap  font-poppins w-32 lg:w-full">
              {product.title}
            </h3>
          </div>
          <div className="absolute top-2 right-3 flex place-items-center rounded-lg px-2 bg-[#ddd8d899] backdrop-blur-4xl text-gray-800">
            <AiFillHeart className="mr-1" /> {product.favoritesCount}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductSlickCard;
