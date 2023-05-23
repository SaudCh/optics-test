import React from "react";
import { Link } from "react-router-dom";
export default function TopBrandCard() {
  return (
    <div className="flex justify-center">
      <Link to="/product/:id">
        <div className="block max-w-sm rounded-lg bg-white">
          <a href="#!" data-te-ripple-init data-te-ripple-color="light">
            <img
              className="rounded-t-lg"
              src="https://purepng.com/public/uploads/large/purepng.com-glassesglasseseyeglassesspectaclesplastic-lensesmounted-1421526499472qlaqz.png"
              alt=""
            />
          </a>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 text-center">
              Card title
            </h5>
            <p className="mb-2 text-base text-neutral-600 text-center">
              Rs 1700
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
