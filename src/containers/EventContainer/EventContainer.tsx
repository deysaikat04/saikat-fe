import React from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import useAllEvents from "../../hooks/useAllEvents";
import { useNavigate, useParams } from "react-router-dom";
import EventDetails from "../EventDetailsContainer/EventDetailsContainer";
import EventDetailsContainer from "../EventDetailsContainer";

const EventContainer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const eventId = params && params["*"] ? params["*"] : "";

  const { data: eventData, isFetching } = useAllEvents();

  const handleCardClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  if (eventId) {
    return <EventDetailsContainer eventId={eventId} />;
  }
  return (
    <div className="flex p-24 flex-col space-y-4 justify-center m-auto">
      <Header title={"Events"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {isFetching ? (
          <p>Loading ...</p>
        ) : eventData?.events && eventData?.events.length ? (
          eventData?.events.map((anEvent: any) => (
            <Card
              key={anEvent?.id}
              eventId={anEvent?.id}
              name={anEvent?.name}
              handleCardClick={handleCardClick}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default EventContainer;
