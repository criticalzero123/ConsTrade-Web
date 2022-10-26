import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import ProductSlickCarousel from "../../Components/Home/ProductSlickCarousel";

import HomePulseLoader from "../../Components/Home/HomePulseLoader";
import UpperCard from "../../Components/Home/UpperCard";
import { FaHotjar } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";
import UserSlickCarousel from "../../Components/Home/UserSlickCarousel";
import { getAllUserByCountPost } from "../../actions/userActions";
import { RiUserStarFill } from "react-icons/ri";

const Index = () => {
  const dispatch = useDispatch();
  const getallproducts = useSelector((state) => state.getAllProductsReducer);
  const getallusers = useSelector(
    (state) => state.getAllUserByCountPostReducer
  );
  const { loading, products, error } = getallproducts;
  const { users } = getallusers;

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUserByCountPost());
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
            </div>
          )}
          {getallusers.loading ? (
            <div>Loading</div>
          ) : (
            users && (
              <div className="w-full mt-10  mb-10">
                <UserSlickCarousel
                  users={users}
                  title="Top Poster"
                  icon={
                    <RiUserStarFill
                      className="mr-2 text-yellow-400"
                      size={25}
                    />
                  }
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
