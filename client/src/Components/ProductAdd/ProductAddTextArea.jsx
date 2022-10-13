import React from "react";

const ProductAddTextArea = (props) => {
  const { fortext, labeltext, placeholdertext, onChange } = props;
  return (
    <div>
      <label
        htmlFor={fortext}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {labeltext}
      </label>
      <textarea
        id={fortext}
        rows="4"
        className="block resize-none p-2.5 w-full text-sm  rounded-lg border  bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholdertext}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default ProductAddTextArea;
