import React from "react";

interface ConfirmationPopupProps {
  setOpen: (value: boolean) => void;
  handleSaveVote: () => void;
}

const ConfirmationPopup = ({
  setOpen,
  handleSaveVote,
}: ConfirmationPopupProps) => {
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-[#000000b3]"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">
              Confirm Action
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-900">
              You are about to add a vote. This action cannot be undone. Are you
              sure you want to proceed?
            </p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray200 rounded-b justify-end">
            <button
              data-modal-hide="default-modal"
              type="button"
              onClick={handleSaveVote}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Yes
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              onClick={() => setOpen(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
