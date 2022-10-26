import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import ProductSlickCarousel from "../../Components/Home/ProductSlickCarousel";

import HomePulseLoader from "../../Components/Home/HomePulseLoader";
import UpperCard from "../../Components/Home/UpperCard";
import { FaHotjar } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";

const Index = () => {
  const dispatch = useDispatch();
  const getallproducts = useSelector((state) => state.getAllProductsReducer);

  const { loading, products, error } = getallproducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
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
              <UpperCard />
              <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-10">
                <ProductSlickCarousel
                  products={products.filter(
                    (product) => product.status !== "sold"
                  )}
                  title={"Hot Items"}
                  icon={<FaHotjar className="mr-3 text-red-500" />}
                />

                <ProductSlickCarousel
                  products={products.filter(
                    (product) => product.status === "sold"
                  )}
                  title={"Success"}
                  icon={
                    <BsCheckAll size={30} className="mr-3 text-green-500" />
                  }
                />
              </div>
              {/* <div className="w-full bg-gray-400 mt-10">asd</div> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
