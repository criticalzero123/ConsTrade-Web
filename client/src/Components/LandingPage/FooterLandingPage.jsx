import React from "react";
import { Footer } from "flowbite-react";

import { BsFacebook, BsInstagram } from "react-icons/bs";

import { MdAttachEmail } from "react-icons/md";

import textLogo from "../../Assets/Images/Branding/ConsTrade.svg";

const FooterLandingPage = () => {
  return (
    <div className="mt-52 sm:mt-0 border-2 border-gray-100 shadow-lg rounded-lg">
      <Footer container={true}>
        <div className="w-full">
          <div className="grid w-full justify-between lg:flex lg:grid-cols-1">
            <div className="mb-10">
              <Footer.Brand
                src={textLogo}
                alt="Contrade Logo"
                name="ConsTrade"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-4 sm:gap-8">
              <div>
                <Footer.Title title="ABOUT" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">About Us</Footer.Link>
                  <Footer.Link href="#">Careers</Footer.Link>
                  <Footer.Link href="#">Brand Center</Footer.Link>
                  <Footer.Link href="#">Blog</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="SOCIAL MEDIA" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="https://www.facebook.com/profile.php?id=100086988933778">
                    Facebook
                  </Footer.Link>
                  <Footer.Link href="#">Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="LEGAL" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms & Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="DOWNLOAD" />
                <Footer.LinkGroup col={true}>
                  <Footer.Link href="#">iOS</Footer.Link>
                  <Footer.Link href="#">Android</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between  ">
            <Footer.Copyright by="ConsTrade™" year={2022} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <BsFacebook
                size={20}
                className="cursor-pointer transition hover:-translate-y-1 hover:delay-100 hover:text-[#3b5998]"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=100086988933778",
                    "_blank"
                  )
                }
              />
              <BsInstagram
                size={20}
                className="cursor-pointer transition hover:-translate-y-1 hover:delay-100 hover:text-[#D4415A]"
              />

              <MdAttachEmail
                size={23}
                className="cursor-pointer transition hover:-translate-y-1 hover:delay-100 hover:text-[#BB001B]"
                onClick={() =>
                  window.open(
                    "mailto:constradeapplication22@gmail.com?subject=ConsTrade%20Website&body=Hi%20ConsTrade"
                  )
                }
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterLandingPage;
