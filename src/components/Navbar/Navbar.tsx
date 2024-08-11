import React from "react";
import { logout } from "./../../store/auth/authSlice";
import { LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const userName = authState?.user?.name;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EventShuffle
          </span>

          <p className="hidden md:block text-white">Hello {userName}!</p>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className=" text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
              onClick={handleLogout}
            >
              <LogOut />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
