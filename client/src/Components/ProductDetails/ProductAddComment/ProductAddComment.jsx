import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { addCommentProduct } from "../../../actions/productActions";

const ProductAddComment = ({ id }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(addCommentProduct(id, comment));
    setComment("");
  };

  return (
    <div className="w-full">
      <form onSubmit={formSubmit} className="flex">
        <input
          type="text"
          id="comment"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          placeholder="Enter your comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button className="ml-5">Submit</button>
      </form>
    </div>
  );
};

export default ProductAddComment;
