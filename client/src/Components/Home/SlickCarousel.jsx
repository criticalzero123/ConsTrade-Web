import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { settings } from "../../service/slickService";
import SlickCard from "./SlickCard";
import "./SlickCss.css";

const SlickCarousel = ({ products, title }) => {
  return (
    products.length !== 0 && (
      <div className="lg:px-32">
        <h1 className="ml-2 mb-4 text-2xl font-semibold">{title}</h1>
        <Slider {...settings}>
          {products &&
            products.map((product) => (
              <SlickCard product={product} key={product._id} />
            ))}
        </Slider>
      </div>
    )
  );
};

export default SlickCarousel;
