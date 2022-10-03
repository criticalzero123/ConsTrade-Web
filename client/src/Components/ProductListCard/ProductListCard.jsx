import React from "react";

const ProductListCard = ({ product }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="h-96">
        <img
          className="rounded-t-lg h-full w-full object-fill"
          src={product.imageURL}
          alt={product.title}
        />
      </div>
      <div className="p-5">
        <p>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400  text-ellipsis overflow-hidden whitespace-nowrap">
          {product.description}
        </p>
        <div className="flex justify-between place-items-center">
          <p className="inline-flex cursor-pointer items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Go To Post
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </p>
          <div className="flex text-white">
            <p className="mr-5 cursor-pointer">Delete</p>
            <p className="cursor-pointer">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;