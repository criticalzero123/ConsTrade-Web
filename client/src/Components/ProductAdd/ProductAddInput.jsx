import React from "react";

const ProductAddInput = (props) => {
  const {
    labeltext,
    placeholdertext,
    fortext,
    onChange,
    hidden,
    number,
    value,
    required,
  } = props;

  return (
    <div className={hidden ? "hidden" : "block"}>
      <div>
        <label
          htmlFor={fortext}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {labeltext}
        </label>
        <input
          type={number ? "number" : "text"}
          value={value ? value : ""}
          id={fortext}
          className=" text-sm rounded-lg  block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholdertext}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default ProductAddInput;
