import React from "react";
import moment from "moment";

interface EventVotesInterface {
  date: string;
  people: string[];
  suitableDates: string[];
}

const EventVotes = ({ date, people, suitableDates }: EventVotesInterface) => {
  const isSuitableDate = suitableDates?.includes(date);

  return (
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
          Votes
        </dt>
        <dd className="mb-4  text-black sm:mb-5">
          <div className="">
            {people?.map((aPeople) => (
              <span
                key={aPeople}
                className="p-2 m-2 rounded-md bg-slate-200 w-fit h-10"
              >
                {aPeople}
              </span>
            ))}
          </div>
        </dd>
      </dl>
      <hr className="my-8" />
    </div>
  );
};

export default EventVotes;
