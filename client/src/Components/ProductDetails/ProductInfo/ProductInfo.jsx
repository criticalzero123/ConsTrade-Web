import React from "react";
import { firstLetterUpper } from "../../../service/userService";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../actions/userActions";
import { toArrayString } from "../../../service/productService";

const ProductInfo = ({
  product,
  currentUser,
  id,
  setOnClickShowComments,
  showComments,
}) => {
  const date = product && new Date(product.dateCreated).toDateString();
  const stringPrefer =
    product.preferTrade !== undefined &&
    product.preferTrade.toString().toUpperCase();

  const soldChecker =
    product.status !== undefined && product.status === "sold" && true;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.getUserByIdReducer);

  //
  const gameGenreArray = product && toArrayString(product.gameGenre);
  const platformArray = product && toArrayString(product.platform);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  return (
    <div className=" bg-[#031533]  px-10 py-5 rounded h-full text-white">
      <p className="font-bold text-base font-mono text-orange-400 tracking-widest">
        {soldChecker ? "TRANSACTION SUCCESSFUL" : stringPrefer}
      </p>
      <div className="flex place-items-center">
        <p className="font-bold text-4xl font-mono mr-3">{product.title}</p>
        <p className="text-gray-400 font-semibold">({product.condition})</p>
      </div>

      <p className="text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">More Details: </span>
        {product.description}
      </p>
      <div className="border-t border-b border-gray-600 py-3 font-bold text-2xl">
        {stringPrefer === "SELLING" && <p>CASH: ₱{product.cash}</p>}
        {stringPrefer === "SWAPPING" && <p>SWAP: {product.item}</p>}
        {stringPrefer === "TRADE-IN" && (
          <div className="flex">
            TRADE-IN:
            <p className="mr-3">₱{product.cash} </p>&
            <p className="ml-3">{product.item}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-8 ">
        <div className="h-full ">
          <div className="flex mt-3 place-items-center">
            <Link to={`/user/${product.userId}`}>
              <img
                src={user && user.imagePhotoURL}
                alt={product.userName}
                className="rounded-full w-12 "
              />
            </Link>
            <div className="ml-3">
              <Link to={`/user/${product.userId}`}>
                <p className="font-semibold font-sans tracking-wider hover:text-red-500">
                  {firstLetterUpper(product.userName)}
                </p>{" "}
              </Link>
              <p className="text-gray-500 font-semibold tracking-wide">
                Seller
              </p>
            </div>
          </div>

          <p className="mt-2 font-semibold text-lg">
            Location:{" "}
            <span
              className="text-base text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={() =>
                window.open(
                  "http://maps.google.com/?q=" + product.location,
                  "_blank"
                )
              }
            >
              {firstLetterUpper(product.location)}
            </span>
          </p>
          <p className="mt-2 font-semibold text-lg">
            Item Posted: <span className="text-base text-gray-500">{date}</span>
          </p>
          <p className="mt-2 font-semibold text-lg">
            Delivery Method:{" "}
            <span className="text-base text-gray-500">
              {product.deliveryType}
            </span>
          </p>
        </div>
        <div className="h-full flex flex-col mt-3">
          <div>
            <p className="mb-2 font-semibold text-lg">Platform Supported: </p>
            {platformArray !== undefined &&
              platformArray.map((platform, index) => (
                <Link to={`/search/category/${platform}`} key={index}>
                  <span className="inline-block bg-[rgba(100%,100%,100%,10%)] rounded-full px-3 py-1 text-sm font-semibold text-white   mr-2 mb-2 hover:text-red-400">
                    {platform}
                  </span>
                </Link>
              ))}
          </div>
          <div className="pt-4 pb-2">
            <p className="mb-2 font-semibold text-lg">Game Genre:</p>
            {gameGenreArray !== undefined &&
              gameGenreArray.map((category, index) => (
                <Link to={`/search/category/${category}`} key={index}>
                  <span className="inline-block bg-[rgba(100%,100%,100%,10%)] text-white rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2 hover:text-red-400">
                    {category}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="flex h-2/5 items-end">
        {currentUser._id !== product.userId ? (
          product && product.status === "sold" ? (
            <div className="w-full">
              <Link to={`/search/category/${gameGenreArray[0]}`}>
                <button
                  type="button"
                  className="mt-5 text-white self-end
                    bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
                    w-full rounded-md p-3 font-semibold text-lg"
                >
                  Look for similar Items
                </button>
              </Link>
            </div>
          ) : (
            <div className="w-full">
              <Link to={`/messages/user/${product.userId}`} state={product}>
                <button
                  disabled={soldChecker}
                  type="button"
                  className="mt-5 text-white self-end
                    bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
                    w-full rounded-md p-3 font-semibold text-lg"
                >
                  Contact Seller
                </button>
              </Link>
            </div>
          )
        ) : product && product.status === "sold" ? (
          <button
            type="button"
            onClick={() => (window.location.href = "/product/add")}
            className="mt-5 text-white self-end
          bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
          w-full rounded-md p-3 font-semibold text-lg"
          >
            Add another Item
          </button>
        ) : (
          <button
            type="button"
            className="mt-5 text-white self-end
            bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
            w-full rounded-md p-3 font-semibold text-lg"
          >
            Edit Item
          </button>
        )}
        <div className="w-full ml-5">
          <button
            type="button"
            onClick={setOnClickShowComments}
            className="mt-5 text-white 
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-cyan-500 hover:to-blue-500
                    w-full rounded-md p-3 font-semibold text-lg"
          >
            {!showComments ? "Show" : "Hide"}{" "}
            {product.comments !== undefined && product.comments.length} Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;