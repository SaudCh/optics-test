import React from "react";
import Facebook from "../../images/home/facebook.png";
import Whatsapp from "../../images/home/whatsapp.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="pl-5 bg-white sm:p-6 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 sm:grid-cols-4">
            <div className="mb-6 sm:mb-1">
              <h2 className="mb-1 sm:mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Folow us
              </h2>
              <div className="flex">
                <img
                  src={Facebook}
                  className="h-10 w-10 mr-3 rounded"
                  alt="Fb Logo"
                />
                <img
                  src={Whatsapp}
                  className="h-10 w-10 mr-3"
                  alt="Whatsapp Logo"
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-1">
              <h2 className="mb-1 sm:mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                quick links
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <Link to={'/glasses/prescription'} className="hover:underline">
                    Prescription
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to={'/glasses/sunglasses'} className="hover:underline">
                    Sunglasses
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6 sm:mb-1">
              <h2 className="mb-1 sm:mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Read us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <Link to={'/lenses'} className="hover:underline ">
                    Our Lenses
                  </Link>
                </li>
                <li>
                  <Link to={'shipping-return'} className="hover:underline">
                    Shipping & Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-1">
              <h2 className="mb-1 sm:mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Get in Touch
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <p>Office Address : 111 Expo Avenue Society , Lahore</p>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Mobile:+92 3214242547
                  </a>
                </li>
                <li>
                  <p href="#" className="hover:underline">
                    Email: sales@msoptics.pk
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between text-center">
          <span className="text-sm text-gray-500 text-center dark:text-gray-400">
            © Copyright{" "}
            <a href="https://msoptics.pk/" className="hover:underline">
              msoptics.pk
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer >
    </div >
  );
}

export default Footer;
