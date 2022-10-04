import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentProduct } from "../../../actions/productActions";

const ProductAddComment = ({ id }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const submitComment = () => {
    dispatch(addCommentProduct(id, comment));
  };
  return (
    <div>
      <div>
        <label htmlFor="comment" className="block mb-2 text-xs font-medium">
          comment
        </label>
        <input
          type="text"
          id="comment"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          placeholder="Enter your comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={submitComment}>Submit</button>
      </div>
    </div>
  );
};

export default ProductAddComment;
