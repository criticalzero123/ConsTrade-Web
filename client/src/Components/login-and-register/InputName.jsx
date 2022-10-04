import React from "react";

const InputName = ({ textname, onChange }) => {
  return (
    <div>
      <div>
        <label htmlFor={textname} className="block mb-2 text-xs font-medium">
          {textname}
        </label>
        <input
          type="text"
          id={textname}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          placeholder={`Enter your ${textname}`}
          required
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputName;
