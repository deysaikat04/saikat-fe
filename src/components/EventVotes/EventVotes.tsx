import React from "react";
import moment from "moment";
import { Vote } from "../../constants/types";

interface EventVotesInterface {
  date: Date;
  votes: Vote[];
  suitableDates: string[];
  handleVoteCheckCLick: (date: string) => void;
}

const EventVotes = ({
  date,
  votes,
  suitableDates,
  handleVoteCheckCLick,
}: EventVotesInterface) => {
  const isSuitableDate = suitableDates?.includes(date.toString());

  const people = votes?.find((aVote) => aVote.date === date)?.people;

  const numberOfVotes = people?.length || 0;

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
              Votes: {numberOfVotes}
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
        <div className="flex items-center">
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onClick={() => handleVoteCheckCLick(date.toString())}
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Vote
          </label>
        </div>
      </div>
      <hr className="my-8" />
    </>
  );
};

export default EventVotes;
