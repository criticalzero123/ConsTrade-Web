import React, { useState } from "react";
import { useEffect } from "react";

const ProductAddSelect = (props) => {
  const {
    items,
    labeltext,
    width,
    onChange,
    required,
    defaultValue,
    flagCategory,
  } = props;

  const [defaultVal, setDefaultVal] = useState();

  useEffect(() => {
    if (defaultValue && defaultValue !== undefined) {
      setDefaultVal(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {labeltext}
      </label>
      <div className={`inline-block relative ${width}`}>
        <select
          onChange={onChange}
          required={required}
          value={
            flagCategory
              ? defaultVal !== undefined
                ? defaultVal
                : "--SELECT--"
              : defaultVal
          }
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {items &&
            items.map((item) => (
              <option key={item} value={item} disabled={item === "--SELECT--"}>
                {item}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ProductAddSelect;
