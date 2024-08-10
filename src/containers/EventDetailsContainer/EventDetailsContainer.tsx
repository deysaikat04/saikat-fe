import React from "react";
import EventVotes from "../../components/EventVotes";
import useEventsById from "../../hooks/useEventsById";
import useEventResultById from "../../hooks/useEventResultById";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericLoader from "../../components/Loader/Generic";

interface EventDetailsContainerProps {
  eventId: string;
}

const EventDetailsContainer = ({ eventId }: EventDetailsContainerProps) => {
  const navigate = useNavigate();

  const { data: eventData, isFetching } = useEventsById(eventId);
  const { data: eventResultData } = useEventResultById(eventId);

  const eventVotes = eventData?.data?.votes || [];

  const suitableDates = eventResultData?.suitableDates?.map(
    (aDate: any) => aDate.date
  );

  const handleBack = () => {
    navigate("/events");
  };

  return (
    <section className="bg-white mt-24">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div
          onClick={handleBack}
          className="flex mb-16 cursor-pointer font-semibold hover:underline"
        >
          <ChevronLeft />
          <span>Back</span>
        </div>
        {isFetching ? (
          <div className="col-span-12 flex justify-center m-auto w-full">
            <GenericLoader />
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
};

export default EventDetailsContainer;
