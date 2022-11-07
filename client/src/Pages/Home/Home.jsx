import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/productActions";
import ProductSlickCarousel from "../../Components/Home/ProductSlickCarousel";

import HomePulseLoader from "../../Components/Home/HomePulseLoader";
import UpperCard from "../../Components/Home/UpperCard";
import { FaHotjar } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import UserSlickCarousel from "../../Components/Home/UserSlickCarousel";
import FooterLandingPage from "../../Components/LandingPage/FooterLandingPage";
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
        <div className="container mx-auto px-0 lg:px-4">
          {products && products.length === 0 ? (
            <div>There are no product posted yet.</div>
          ) : (
            <div>
              <UpperCard />
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-10">
                <ProductSlickCarousel
                  products={products
                    .sort((a, b) => b.favoritesCount - a.favoritesCount)
                    .filter((product) => product.favoritesCount >= 2)}
                  title={"Hot Items"}
                  icon={<FaHotjar className="mr-3 text-red-500" />}
                  redirectTo="hotitems"
                />

                <ProductSlickCarousel
                  products={products
                    .sort(
                      (a, b) =>
                        new Date(a.dateCreated).getTime() -
                        new Date(b.dateCreated).getTime()
                    )
                    .filter((product) => product.status !== "sold")}
                  title={"All Items"}
                  icon={<CgGames size={33} className="mr-3 text-orange-500" />}
                  redirectTo="all"
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
      <FooterLandingPage />
    </div>
  );
};

export default Index;
