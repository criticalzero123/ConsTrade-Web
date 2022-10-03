import React from "react";

const ProductCardDetails = ({ image, title }) => {
  return (
    <div className="ml-16 grid grid-cols-2 place-items-center h-4/6 rounded">
      <div className=" h-full bg-blue-900 flex align-center rounded lg:rounded-r-none">
        <img
          src={image}
          alt=""
          className="object-contain place-content-center "
        />
      </div>
      <div className="h-full w-full  bg-white rounded-b lg:rounded-b-none rounded p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8 ">
          <div className="flex justify-between items-center">
            <div className="text-gray-900 font-bold text-xl mb-2 text-ellipsis overflow-hidden whitespace-nowrap w-80">
              {title === "" ? "TITLE" : title}
            </div>
            <div className=" block">chat logo</div>
          </div>
          <p className="text-gray-700 text-base">description</p>
          <p className="text-gray-700 text-base">condition</p>
          <p className="text-gray-700 text-base">category</p>
          <p className="text-gray-700 text-base">condition</p>
          <p className="text-gray-700 text-base">location</p>
          <p className="text-gray-700 text-base">prefer trade</p>
          <p className="text-gray-700 text-base">cash</p>
          <p className="text-gray-700 text-base">item</p>
          <p className="text-gray-700 text-base">meetup preference</p>
        </div>

        <div className="flex items-center justify-between  pt-4">
          <div className="flex">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={image}
              alt="name"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                James Dylan Caramonte
              </p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>

          <div className="place-items-center">share</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetails;
