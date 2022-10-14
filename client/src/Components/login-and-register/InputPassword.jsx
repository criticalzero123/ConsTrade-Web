import React from "react";

const InputPassword = ({ text, onChange }) => {
  return (
    <div>
      <div className="mt-6">
        <label
          htmlFor={text}
          className="block mb-2 text-xs font-medium text-gray-500"
        >
          {text}*
        </label>
        <input
          type="password"
          id={text}
          placeholder={`Enter your ${text.toLowerCase()}...`}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default InputPassword;
