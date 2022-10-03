import React from "react";
import { useEffect } from "react";
import { isUserLoggedIn } from "../service/userService";

const Index = () => {
  useEffect(() => {
    if (isUserLoggedIn()) window.location.href = "/home";
  }, []);
  return (
    <div>
      <div>landing page</div>
    </div>
  );
};

export default Index;
