import React from "react";

import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const PostsCard = ({ product }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg relative">
      <div className="flex justify-center bg-gray-100">
        <img
          className="h-40 object-contain "
          src={product.imageURL}
          alt={product.title}
        />
      </div>
      <div className="px-6 py-4 mb-16">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 absolute bottom-3">
        <Link
          to={`/product/item/${product._id}`}
          className="bg-gray-100 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 flex place-items-center hover:text-orange-500"
        >
          Go to Product <BsArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default PostsCard;
