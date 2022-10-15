import React from "react";

const CardPulse = () => {
  return (
    <div>
      <div className="border border-gray-300 shadow rounded-md p-4 w-64 mx-auto lg:mx-0 mt-3">
        <div className="animate-pulse ">
          <div className="rounded-md bg-slate-700 h-48 w-full mb-5"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPulse;
