import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/productActions";
import ProductComment from "../../Components/ProductDetails/ProductComment/ProductComment";
import ProductAddComment from "../../Components/ProductDetails/ProductAddComment/ProductAddComment";

import { BsBookmarkHeartFill } from "react-icons/bs";
import { addToFavorite } from "../../actions/userActions";
import ProductInfo from "../../Components/ProductDetails/ProductInfo/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  const getproductbyid = useSelector((state) => state.getProductByIdReducer);
  const getcomments = useSelector((state) => state.commentListProductReducer);
  const { currentUser } = useSelector((state) => state.userInfoReducer);

  const { comments } = getcomments;
  const { loading, error, product } = getproductbyid;

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
    <div>
      {error && <div>Something Went Wrong...</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        product && (
          <div>
            <div className="lg:grid lg:grid-cols-3  h-[42rem] p-5 ">
              <div className="lg:col-span-1  relative rounded w-full shadow-lg mr-5 text-black flex justify-center place-items-center bg-[#031533]">
                <img
                  className="object-contain rounded h-5/6"
                  src={product.imageURL}
                  alt={product.title}
                />
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
