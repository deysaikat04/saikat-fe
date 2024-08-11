import React, { useState } from "react";
import Card from "../../components/Card/Card";
import useAllEvents from "../../hooks/useAllEvents";
import { useNavigate, useParams } from "react-router-dom";
import EventDetailsContainer from "../EventDetailsContainer";
import GenericLoader from "../../components/Loader/Generic";
import AddEventPopup from "../../components/Popup/AddEventPopup";
import useEventSave from "../../hooks/useEventSave";
import { Plus } from "lucide-react";

const EventContainer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const eventId = params && params["*"] ? params["*"] : "";

  const { data: eventData, isFetching } = useAllEvents();

  const { mutate: addEvent } = useEventSave();

  const [addEventPopUpOpen, setAddEventPopUpOpen] = useState(false);

  const handleCardClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleAddEvent = (name: string, dates: string[]) => {
    const payload = {
      name,
      dates,
    };
    addEvent(payload);
    setAddEventPopUpOpen(false);
  };

  if (eventId) {
    return <EventDetailsContainer eventId={eventId} />;
  }
  return (
    <div className="flex pt-24 md:p-24 flex-col space-y-4 justify-center m-auto">
      <div className="flex justify-end">
        <button
          type="button"
          className="text-white bg-blue-600 border border-blue-300 focus:outline-none hover:bg-blue-800 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-4 py-2 me-2 mb-2 flex flex-row gap-2 hover:shadow transition-all"
          onClick={() => setAddEventPopUpOpen(true)}
        >
          <Plus />
          <span>Add event</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {isFetching ? (
          <div className="col-span-12 flex justify-center m-auto w-full">
            <GenericLoader />
          </div>
        ) : eventData?.events && eventData?.events.length ? (
          eventData?.events.map((anEvent: any) => (
            <Card
              key={anEvent?.id}
              eventId={anEvent?.id}
              name={anEvent?.name}
              handleCardClick={handleCardClick}
            />
          ))
        ) : (
          <div className="col-span-12 flex justify-center m-auto w-full">
            <p className="text-center ">No Events found.</p>
          </div>
        )}
      </div>
      {addEventPopUpOpen ? (
        <AddEventPopup
          handleAddEvent={handleAddEvent}
          setAddEventPopUpOpen={setAddEventPopUpOpen}
        />
      ) : null}
    </div>
  );
};

export default EventContainer;
