import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentProduct } from "../../../actions/productActions";
import { calculateDateRelative } from "../../../service/commentService";
import { firstLetterUpper } from "../../../service/userService";

import CommentSettings from "./CommentSettings/CommentSettings";

const ProductComment = ({ comment, productId, ownerId }) => {
  const dispatch = useDispatch();

  const getuser = useSelector((state) => state.userInfoReducer);

  const { currentUser } = getuser;

  const { _id } = currentUser;

  const time = calculateDateRelative(comment.timePosted);

  return (
    <div>
      <div className="flex m-3" key={comment._id}>
        <div className=" mr-4 ml-2 1/12">
          <img
            src={comment.imagePhoto}
            alt={comment.name}
            className="rounded-full w-10 h-10"
          />
        </div>
        <div className="w-11/12 bg-slate-400 rounded p-2  shadow-lg">
          <div className="flex justify-between">
            <div>
              <Link to={`/user/${comment.userId}`}>
                {firstLetterUpper(comment.name)}{" "}
              </Link>
              ● {time}
            </div>
            <div>
              {(comment.userId === _id || ownerId === _id) && (
                <CommentSettings
                  deleteComment={() =>
                    dispatch(
                      deleteCommentProduct(
                        productId,
                        comment.userId,
                        comment._id
                      )
                    )
                  }
                />
              )}
            </div>
          </div>
          <div className="mr-5">{comment.comment}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductComment;
