import React from "react";
import moment from "moment";
import { Plus } from "lucide-react";

interface EventVotesInterface {
  date: string;
  people: string[];
  suitableDates: string[];
}

const EventVotes = ({ date, people, suitableDates }: EventVotesInterface) => {
  const isSuitableDate = suitableDates?.includes(date);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl ">
            {moment(date).format("LL")}{" "}
            {isSuitableDate ? (
              <span className="font-medium  text-sm bg-orange-400 leading mb-2 py-1 px-4 rounded-2xl">
                Preferred
              </span>
            ) : (
              ""
            )}
          </p>
          <dl>
            <dt className="mb-6 font-semibold leading-none text-gray-900 ">
              Votes: {people?.length}
            </dt>
            <dd className="mb-4 text-black sm:mb-5">
              <div className="">
                {people?.map((aPeople) => (
                  <span
                    key={aPeople}
                    className="p-2 mr-2 rounded-md bg-slate-200 w-fit h-10"
                  >
                    {aPeople}
                  </span>
                ))}
              </div>
            </dd>
          </dl>
        </div>
        <div>
          <button
            type="button"
            className="text-gray-900 bg-white border border-blue-300 focus:outline-none hover:bg-blue-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-4 py-2 me-2 mb-2 flex flex-row gap-2"
          >
            <Plus className="text-blue-500" />
            <span className="text-blue-500 ">Add vote</span>
          </button>
        </div>
      </div>
      <hr className="my-8" />
    </>
  );
};

export default EventVotes;
