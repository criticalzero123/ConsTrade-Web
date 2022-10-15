import React from "react";
import CardPulse from "../CardPulse/CardPulse";

const HomePulseLoader = () => {
  return (
    <div>
      <div className="animate-pulse mt-5">
        <div className="h-6 bg-slate-700 w-48 lg:w-72 rounded"></div>
      </div>
      <div className="flex w-full overflow-x-hidden">
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
        <div className="mr-10">
          <CardPulse />
        </div>
      </div>

      <div className="animate-pulse mt-10">
        <div className="h-6 bg-slate-700 w-48 lg:w-72 rounded"></div>
      </div>
      <div className="flex w-full overflow-x-hidden">
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
        <div className="mr-10">
          <CardPulse />
        </div>
      </div>
    </div>
  );
};

export default HomePulseLoader;
