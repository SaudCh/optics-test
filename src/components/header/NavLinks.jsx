import React from "react";
import { Link } from "react-router-dom";

export default function NavLinks({ }) {

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Sunglasses",
      path: "/glasses/sunglasses",
    },
    {
      name: "Prescription",
      path: "/glasses/prescription",
    },
  ]

  return (
    <>
      {links.map((link, index) => (
        <Link to={link.path} key={index.toString()}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1 className="py-7 md:py-3">{link.name}</h1>
            {/* {link.submenu && (
              <div className="relative" style={{ zIndex: 10 }}>
                <div className="absolute top-15 hidden group-hover:md:block hover:md:block">
                  <div className="py-3 ">
                    <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45" />
                  </div>
                  <div className="bg-white p-3.5 w-[200px]">
                    {link.sublinks.map((sublink, index) => {
                      return (
                        <div key={index.toString()}>
                          <Link
                            to={`${link.path}/${sublink?._id}`}
                            className="text-sm text-gray-600 my-2.5 hover:text-blue-600"
                          >
                            {sublink?.name}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </Link>
      ))}
    </>
  );
}
