import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { BsLink } from "react-icons/bs";
import { Tooltip } from "flowbite-react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { QRCodeCanvas } from "qrcode.react";
import logo from "../../../Assets/Images/Branding/Web/SVG/IconWeb.svg";

const ProductShare = ({ title, description }) => {
  const fullUrl = window.location.href;

  const exportQrImage = () => {
    const canva = document.getElementById("qrCodePic");
    const pngUrl = canva
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = title + ".png";
    // Remove the created and invisible link.
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex place-items-center">
      <span>Share: </span>
      <span className="px-1"></span>
      {/* Facebook */}
      <FacebookShareButton
        quote={title}
        url={fullUrl}
        description={description}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      {/* Link */}
      <span className="px-1"></span>
      <Tooltip content="Link Copied!" arrow={false} trigger="click">
        <BsLink
          size={29}
          className="p-1 rounded-full bg-gray-200 text-black cursor-pointer"
          onClick={() => navigator.clipboard.writeText(fullUrl)}
        />
      </Tooltip>
      <span className="px-1"></span>
      {/* QRCode Download */}
      <div className="hidden">
        <QRCodeCanvas
          id="qrCodePic"
          value={fullUrl}
          size={256}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
          imageSettings={{
            src: logo,
            x: undefined,
            y: undefined,
            height: 50,
            width: 50,
            excavate: true,
          }}
        />
      </div>
      <MdOutlineQrCodeScanner
        size={29}
        className="p-1 rounded-full  bg-gray-200 text-black cursor-pointer"
        onClick={exportQrImage}
      />
    </div>
  );
};

export default ProductShare;
