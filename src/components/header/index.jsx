import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import Logo from "../../images/logo.png";
import IconTray from "./iconTray";
import axios from "axios";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-white py-2">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 px-5 md:w-auto w-full flex justify-between items-center">
          <img
            src={Logo}
            alt="Logo"
            className="md:cursor-pointer w-[100px]"
            onClick={() => navigate("/")}
          />

          <IconTray className="md:hidden flex flex-row" />
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {open ? <RxCross1 /> : <CiMenuFries />}
          </div>
        </div>

        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <NavLinks
          />
        </ul>
        <IconTray className="md:flex hidden" />
        <ul
          className={`md:hidden uppercase bg-white absolute z-10 w-full h-full bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"
            }`}
        >
          <NavLinks
          />
        </ul>
      </div>
    </nav>
  );
}
