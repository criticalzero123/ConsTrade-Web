import React from "react";
import { Link } from "react-router-dom";
import { toArrayString } from "../../service/productService";

const SlickCard = ({ product }) => {
  const gameGenre = product && toArrayString(product.gameGenre);
  const platform = product && toArrayString(product.platform);

  return (
    <Link to={`/product/item/${product._id}`}>
      <div className=" hover:bg-gray-200 rounded-lg border border-gray-200 mx-3">
        <div className="">
          <div className="h-56 flex justify-center">
            <img
              className="rounded-lg h-full w-full object-contain shadow-md"
              src={product.imageURL}
              alt={product._id}
            />
          </div>
          <div className="p-5 ">
            <h6 className=" text-xl  font-semibold text-black font-mono tracking-tight mb-2 text-ellipsis overflow-hidden whitespace-nowrap w-48 lg:w-full">
              {product.title}
            </h6>
            <div className=" font-normal text-sm text-gray-500 mb-4">
              Platform Supported{" "}
              <div className="mt-1">
                {platform !== undefined &&
                  platform.map((supported, index) => (
                    <span
                      key={index}
                      className="py-1 px-2 mr-2 bg-gray-100 rounded-lg text-black font-semibold"
                    >
                      {supported}
                    </span>
                  ))}
              </div>
            </div>
            <div className=" font-normal text-sm text-gray-500">
              Game Genre{" "}
              <div className="mt-1">
                {gameGenre !== undefined &&
                  gameGenre.map((genre, index) => (
                    <span
                      key={index}
                      className="py-1 px-2 mr-2 bg-gray-100 rounded-lg text-black font-semibold"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SlickCard;
