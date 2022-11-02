import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import ProductComment from "../../Components/ProductDetails/ProductComment/ProductComment";
import ProductAddComment from "../../Components/ProductDetails/ProductAddComment/ProductAddComment";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { addToFavorite } from "../../actions/userActions";
import ProductInfo from "../../Components/ProductDetails/ProductInfo/ProductInfo";
import ProductDetailHelmet from "../../Helmets/ProductDetails.jsx/ProductDetailHelmet";

const ProductDetails = () => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  const getproductbyid = useSelector((state) => state.getProductByIdReducer);
  const getcomments = useSelector((state) => state.commentListProductReducer);
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const { comments } = getcomments;
  const { loading, error, product } = getproductbyid;

  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  //For Favorites
  const userFavoriteProduct = currentUser.favorites.some(
    (favorite) => favorite.productId === id
  );
  const [select, setSelected] = useState(userFavoriteProduct);

  const favoriteOnClick = () => {
    dispatch(addToFavorite(product._id));
    setSelected(!select);
  };

  return (
    <div className="container mx-auto px-0 lg:px-4">
      {error && <div>Something Went Wrong...</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        product && (
          <div>
            <ProductDetailHelmet
              imageUrl={product.imageURL}
              title={product.title}
              metaDescription={product.description}
            />
            <div className="lg:grid lg:grid-cols-3  h-[42rem] p-5 ">
              <div className="lg:col-span-1 mb-5 lg:mb-0 relative rounded  shadow-lg mr-5 flex place-items-center justify-center text-black  bg-[#031533]">
                <div className="h-5/6">
                  <img
                    className="object-contain rounded h-4/5"
                    src={
                      displayImage !== null ? displayImage : product.imageURL
                    }
                    alt={product.title}
                  />
                </div>
                {product.imageListURL !== undefined && (
                  <div className="mt-5 justify-center flex absolute bottom-0 p-5 w-full bg-[rgba(100%,100%,100%,0.6)] backdrop-blur-[30px]">
                    {product.imageListURL.map((image, index) => (
                      <img
                        className="object-contain rounded h-20 cursor-pointer mr-3"
                        src={image}
                        key={image}
                        alt={index}
                        onClick={() => setDisplayImage(image)}
                        onMouseEnter={() => setDisplayImage(image)}
                      />
                    ))}
                  </div>
                )}

                {/* For the favorites */}
                {product && currentUser._id !== product.userId && (
                  <div className="absolute top-0 w-full">
                    <div className="flex justify-end ">
                      <BsBookmarkHeartFill
                        size={40}
                        className={`${
                          select && "text-red-600"
                        } text-gray-400 mr-1 hover:cursor-pointer `}
                        onClick={favoriteOnClick}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 lg:ml-5 ">
                <ProductInfo
                  product={product}
                  currentUser={currentUser}
                  id={product.userId}
                  setOnClickShowComments={() => setShowComments(!showComments)}
                  showComments={showComments}
                />
              </div>
            </div>
            <div
              className={`${
                showComments ? "block" : "hidden"
              } bg-gray-200 rounded mx-5`}
            >
              {product.comments !== undefined &&
                (comments.length === 0 ? (
                  <div className="flex p-5 bg-gray-400 rounded">
                    No Comment Yet.
                    <br />
                    be the first to comment
                  </div>
                ) : (
                  <div className="h-[20rem]  overflow-auto mt-1">
                    {comments.map((comment) => (
                      <ProductComment
                        key={comment._id}
                        comment={comment}
                        productId={product._id}
                        ownerId={product.userId}
                      />
                    ))}
                  </div>
                ))}
              <ProductAddComment id={id} />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
