import React from "react";
import SunglassesCard from "../../components/home/SunglassesCard";

function Sunglasses() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1 sm:col-span-2" />
      <div className="col-span-10 sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center">
        <SunglassesCard />
        <SunglassesCard />
        <SunglassesCard />
        <SunglassesCard />
        <SunglassesCard />
      </div>
      <div className="col-span-1 sm:col-span-2" />
    </div>
  );
}

export default Sunglasses;
