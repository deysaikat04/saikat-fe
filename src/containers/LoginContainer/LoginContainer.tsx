import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Login from "../../components/Login/Login";
import { useAppSelector } from "../../hooks";
import { isLoggedInFromStore } from "../../store/auth/authSlice";
import { getImagePath } from "../../utils/helpers/media.helper";

const LoginContainer = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(isLoggedInFromStore);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/events`);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        <div className="max-w-md text-center">
          <img src={getImagePath(`auth.jpg`)} alt="copy" />
        </div>
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <Header title="EventShuffle" />
          <h1 className="text-xl font-semibold mb-6 text-black text-center">
            Log In
          </h1>

          <Login />

          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Don't have an account? SignUp{" "}
              <span
                onClick={() => navigate("/signup")}
                className="underline cursor-pointer hover:text-gray-900"
              >
                here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
