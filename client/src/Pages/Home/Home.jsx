import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import { IoMdAddCircle } from "react-icons/io";
import SlickCarousel from "../../Components/Home/SlickCarousel";

import { Link } from "react-router-dom";
import HomePulseLoader from "../../Components/Home/HomePulseLoader";
const Index = () => {
  const dispatch = useDispatch();
  const getallproducts = useSelector((state) => state.getAllProductsReducer);

  const { loading, products, error } = getallproducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Link to="/product/add">
        <div className="fixed z-30 bottom-5 right-5 p-3 shadow-lg  md:p-5 bg-[#051632] rounded-full flex place-items-center text-white hover:text-orange-500">
          <IoMdAddCircle size={25} className="md:mr-1" />
          <p className="font-semibold text-lg md:block hidden">Add item</p>
        </div>
      </Link>

      {loading ? (
        <HomePulseLoader />
      ) : error ? (
        <h1>Something Went Wrong.</h1>
      ) : (
        <div>
          {products && products.length === 0 ? (
            <div>There are no product posted yet.</div>
          ) : (
            <div>
              <section>
                <div className="w-full bg-gray-400 h-52 rounded-2xl px-5 lg:px-14 py-5">
                  <h1 className="font-poppins text-2xl ">
                    One Stop{" "}
                    <span className="bg-clip-text font-semibold  text-transparent bg-gradient-to-r from-[#3D4BA9] via-purple-500 to-[#EE661C]">
                      Trade
                    </span>{" "}
                    Platform
                  </h1>
                  <div className="mt-5 font-poppins text-gray-300">
                    <h3>Discover Various of Console Games</h3>
                    <h3>Add, Trade and collect yours now!</h3>
                  </div>
                </div>
              </section>
              <SlickCarousel
                products={products.filter(
                  (product) => product.status !== "sold"
                )}
                title={"Recommended for you"}
              />
              <br />
              <br />
              <br />
              <SlickCarousel
                products={products.filter(
                  (product) => product.status === "sold"
                )}
                title={"Successful Transactions"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
