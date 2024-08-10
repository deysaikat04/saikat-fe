import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SignUp from "../../components/Signup/Signup";

const SignUpContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
        {/* <div className="max-w-md text-center">
          <img src="../../assets/svg/signup.svg" alt="signup" />
        </div> */}
      </div>
      <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <Header title="EventShuffle" />

          <h1 className="text-xl font-semibold mb-6 text-black text-center">
            Sign Up
          </h1>

          <SignUp />
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account? Login{" "}
              <span
                onClick={() => navigate("/login")}
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

export default SignUpContainer;
