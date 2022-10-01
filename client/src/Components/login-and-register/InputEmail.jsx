import React from "react";

const InputEmail = ({ onChange }) => {
  return (
    <div>
      <div>
        <label htmlFor="email" className="block mb-2 text-xs font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          placeholder="Enter your email"
          required
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputEmail;
