import React from "react";
import EventVotes from "../../components/EventVotes";
import useEventsById from "../../hooks/useEventsById";
import useEventResultById from "../../hooks/useEventResultById";

const EventDetails = () => {
  const { data: eventData } = useEventsById("66b59bca887defe4dfa80234");
  const { data: eventResultData } = useEventResultById(
    "66b59bca887defe4dfa80234"
  );

  const eventVotes = eventData?.data?.votes || [];

  console.log(eventResultData);
  const suitableDates = eventResultData?.suitableDates?.map(
    (aDate: any) => aDate.date
  );

  return (
    <section className="bg-white mt-24">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-2 text-3xl font-bold leading-none text-gray-700 md:text-4xl ">
          {eventData?.data?.name}
        </h2>

        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          {eventVotes.map((aVote: any) => (
            <EventVotes
              date={aVote?.date}
              people={aVote?.people}
              suitableDates={suitableDates}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
