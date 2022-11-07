import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../actions/userActions";
import { toArrayString } from "../../../service/productService";
import ConfirmTransactedModal from "../ProductMarkAsTransactedModal/ConfirmTransactedModal";
import ProductShare from "../ProductShareSocialMedia/ProductShare";
import { MdOutlineMoreVert } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

const ProductInfo = ({
  product,
  currentUser,
  id,
  setOnClickShowComments,
  showComments,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showItemSettings, setShowItemSettings] = useState(false);
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
      <div className="flex justify-between ">
        <p className="font-bold text-base font-mono text-orange-400 tracking-widest">
          {soldChecker ? "TRANSACTION SUCCESSFUL" : stringPrefer}
        </p>
        {product.status !== "sold" && product.userId === currentUser._id && (
          <div className="relative">
            <MdOutlineMoreVert
              size={25}
              onClick={() => setShowItemSettings(!showItemSettings)}
              className="cursor-pointer hover:text-gray-500"
            />
            <div
              className={`absolute top-5 bg-gray-800 text-white z-10 right-5 w-48 rounded-lg ${
                showItemSettings ? "block" : "hidden"
              }`}
            >
              <ul className="py-1 text-sm  text-gray-200">
                <li
                  onClick={() => setShowModal(!showModal)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-600 hover:text-green-300 place-items-center w-full flex"
                >
                  <BsCheckCircle size={15} />
                  <div className="px-1"></div>
                  <p>Mark as transacted</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <ConfirmTransactedModal
          show={showModal}
          onCloseModal={() => setShowModal(!showModal)}
        />
      )}
      <div className="flex place-items-center">
        <p className="font-bold text-4xl font-mono mr-3">{product.title}</p>
        <p className="text-gray-400 font-semibold">({product.condition})</p>
      </div>
      <p className="text-sm text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">Game Model Name: </span>
        {product.modelNumber}
      </p>
      <p className="text-sm text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">Serial Number: </span>
        {product.serialNumber}
      </p>
      <p className=" text-gray-400 mb-2 mt-2">
        <span className="text-gray-200">More Details: </span>
        {product.description}
      </p>
      <div className="border-t border-b border-gray-600 py-3 font-bold text-2xl">
        {stringPrefer === "SELLING" && <p>CASH: ₱{product.cash}</p>}
        {stringPrefer === "SWAPPING" && <p>SWAP: {product.item}</p>}
        {stringPrefer === "TRADE-IN" && (
          <div className="flex">
            TRADE-IN:{" "}
            <p className={`mr-3 ${product.cash !== 0 ? "block" : "hidden"}`}>
              ₱{product.cash}
            </p>
            {product.item !== "" && product.cash !== 0 && " & "}
            <p className="ml-3">{product.item}</p>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8 ">
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
                <p className="font-semibold font-sans tracking-wider hover:text-red-500 capitalize">
                  {product.userName}
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
              className="text-base text-gray-500 hover:text-red-500 cursor-pointer capitalize"
              onClick={() =>
                window.open(
                  "http://maps.google.com/?q=" + product.location,
                  "_blank"
                )
              }
            >
              {product.location}
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
                <Link to={`/search/platform/${platform}`} key={index}>
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
                <Link to={`/search/genre/${category}`} key={index}>
                  <span className="inline-block bg-[rgba(100%,100%,100%,10%)] text-white rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2 hover:text-red-400">
                    {category}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="flex h-2/6 items-end">
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
              <Link
                to={`/messages/product/${product._id}/${product.userId}`}
                state={product}
              >
                <button
                  disabled={soldChecker}
                  type="button"
                  className="mt-5 text-white self-end
                    bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
                    w-full rounded-md p-3 font-semibold text-sm md:text-lg"
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
          w-full rounded-md p-3 font-semibold text-sm md:text-lg"
          >
            Add another Item
          </button>
        ) : (
          product && (
            <Link to={`/product/edit/${product._id}`} className="w-full">
              <button
                type="button"
                className="mt-5 text-white self-end
            bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500
            w-full rounded-md p-3 font-semibold text-sm md:text-lg"
              >
                Edit Item
              </button>
            </Link>
          )
        )}
        <div className="w-full ml-5">
          <ProductShare
            title={product.title}
            description={product.description}
          />
          <button
            type="button"
            onClick={setOnClickShowComments}
            className="mt-5 text-white 
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-cyan-500 hover:to-blue-500
                    w-full rounded-md p-3 font-semibold text-sm md:text-lg"
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
