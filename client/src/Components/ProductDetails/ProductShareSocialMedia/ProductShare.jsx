import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { BsLink } from "react-icons/bs";
import { Tooltip } from "flowbite-react";

const ProductShare = ({ title, description }) => {
  const fullUrl = window.location.href;

  return (
    <div className="flex place-items-center">
      <span>Share: </span>
      <span className="px-1"></span>
      <FacebookShareButton
        quote={title}
        url={fullUrl}
        description={description}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <span className="px-1"></span>
      <Tooltip content="Link Copied!" arrow={false} trigger="click">
        <BsLink
          size={29}
          className="p-1 rounded-full bg-gray-300 text-black cursor-pointer"
          onClick={() => navigator.clipboard.writeText(fullUrl)}
        />
      </Tooltip>
    </div>
  );
};

export default ProductShare;
