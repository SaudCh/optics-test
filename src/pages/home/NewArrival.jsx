import React from "react";
import NewArrivalCard from "../../components/home/NewArrivalCard";

function NewArrival({
  products = [],
}) {

  // maximum 4 products will be displayed
  products = products.length > 8 ? products.slice(0, 8) : products

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-1 sm:col-span-2" />
      <div className="col-span-10 sm:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center">
        {
          products.map((item, index) => (
            <NewArrivalCard
              key={index}
              product={item}
            />
          ))
        }

      </div>
      <div className="col-span-1 sm:col-span-2" />
    </div>
  );
}

export default NewArrival;
