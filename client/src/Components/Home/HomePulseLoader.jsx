import React from "react";
import CardPulse from "../CardPulse/CardPulse";

const HomePulseLoader = () => {
  return (
    <div className="mt-10">
      <div className="flex w-full lg:justify-center  overflow-x-hidden">
        <div className="mr-10">
          <CardPulse />
        </div>

        <div className="mr-10">
          <CardPulse />
        </div>

        <div className="mr-10">
          <CardPulse />
        </div>
        <div className="mr-10">
          <CardPulse />
        </div>
      </div>

      <div className="flex w-full lg:justify-center overflow-x-hidden">
        <div className="mr-10">
          <CardPulse />
        </div>
        <div className="mr-10">
          <CardPulse />
        </div>
        <div className="mr-10">
          <CardPulse />
        </div>
        <div className="mr-10">
          <CardPulse />
        </div>
      </div>
    </div>
  );
};

export default HomePulseLoader;
