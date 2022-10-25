import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import SlickCarousel from "../../Components/Home/SlickCarousel";

import HomePulseLoader from "../../Components/Home/HomePulseLoader";
import UpperCard from "../../Components/Home/UpperCard";
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
