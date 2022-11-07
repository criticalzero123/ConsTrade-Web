import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { productSettings } from "../../service/slickService";
import ProductSlickCard from "./ProductSlickCard";
import "./ProductSlickCss.css";

const ProductSlickCarousel = ({ products, title, icon, redirectTo }) => {
  return products.length !== 0 ? (
    <div>
      <div className="flex justify-between  mb-4 ">
        <h1 className="ml-2 text-xl flex place-items-center  font-poppins">
          {icon && icon}
          {title}
        </h1>
        <Link
          to={`/product/category/${redirectTo}`}
          className="px-3 py-1 text-sm shadow-md flex place-items-center rounded-lg  hover:text-orange-500 text-gray-600"
        >
          View all <BsArrowRight className="ml-1" />
        </Link>
      </div>
      <div className="bg-gray-100 py-3 rounded-lg slick-container">
        <Slider {...productSettings}>
          {products &&
            products.map((product) => (
              <ProductSlickCard product={product} key={product._id} />
            ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div>no product </div>
  );
};

export default ProductSlickCarousel;
