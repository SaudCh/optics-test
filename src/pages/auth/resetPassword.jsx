import React, { useState } from "react";
import "./auth.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/spinner";
import ErrorAlert from "../../components/ErrorAlert";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await axios
      .post("reset-password", {
        password: data.password,
        token,
      })
      .then((res) => {
        navigate("/login", {
          state: {
            message: "Password Reset Successfully",
          },
        });
      })
      .catch((err) => {
        setErrors({ api: err?.response?.data?.message || err.message });
      });

    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      {isLoading && <LoadingSpinner asOverlay />}
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="grid  grid-cols-1 md:grid-cols-3 justify-center items-center flex-wrap h-full">
            <div />
            <div className="mb-12 md:mb-0 bg-white p-5 rounded shadow">
              <form onSubmit={handleSubmit}>
                <ErrorAlert error={errors.api} />

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">
                    MS Optics Admin
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <div className="text-center lg:text-center">
                  <button className="inline-block px-7 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div />
          </div>
        </div>
      </section>
    </div>
  );
}
const Validation = (data) => {
  let errors = {};

  if (!data.password) {
    errors.password = "Password is required";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Password does not match";
  }

  return errors;
};
