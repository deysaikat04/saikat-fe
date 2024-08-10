import React from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import useAllEvents from "../../hooks/useAllEvents";

const EventContainer = () => {
  const { data: eventData, isFetching } = useAllEvents();

  return (
    <div className="flex p-24 flex-col space-y-4 justify-center m-auto">
      <Header title={"Events"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {isFetching ? (
          <p>Laoding ...</p>
        ) : eventData?.events && eventData?.events.length ? (
          eventData?.events.map((anEvent: any) => (
            <Card key={anEvent?.id} name={anEvent?.name} />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default EventContainer;
