import React from "react";

interface EventCardProps {
  name: string;
  eventId: string;
  handleCardClick: (eventId: string) => void;
}

const Card = ({ name, eventId, handleCardClick }: EventCardProps) => {
  return (
    <div
      className="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md "
      onClick={() => handleCardClick(eventId)}
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {name}
      </h5>

      <div className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-black cursor-pointer bg-blue-200 rounded-lg  focus:ring-4 focus:outline-none">
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card;
