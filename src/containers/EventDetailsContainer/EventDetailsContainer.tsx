import React, { useState } from "react";
import EventVotes from "../../components/EventVotes";
import useEventsById from "../../hooks/useEventsById";
import useEventResultById from "../../hooks/useEventResultById";
import { ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericLoader from "../../components/Loader/Generic";
import ConfirmationPopup from "../../components/Popup/ConfirmationPopup";
import useVoteSave from "../../hooks/useVoteSave";
import { useAppSelector } from "../../hooks";

interface EventDetailsContainerProps {
  eventId: string;
}

const EventDetailsContainer = ({ eventId }: EventDetailsContainerProps) => {
  const navigate = useNavigate();

  const authState = useAppSelector((state) => state.auth);

  const { data: eventData, isFetching } = useEventsById(eventId);
  const { data: eventResultData } = useEventResultById(eventId);

  const { mutate: addVote } = useVoteSave(eventId);

  const eventVotes = eventData?.data?.votes || [];

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [voteChecked, setVoteChecked] = useState<string[]>([]);

  const suitableDates =
    eventResultData?.suitableDates?.map((aDate) => aDate.date) || [];

  const handleBack = () => {
    navigate("/events");
  };

  const handleVoteCheckCLick = (date: string) => {
    let updatedVoteChecked: string[] = [...voteChecked];

    if (updatedVoteChecked.includes(date)) {
      updatedVoteChecked = updatedVoteChecked.filter((aVote) => aVote !== date);
    } else {
      updatedVoteChecked.push(date);
    }
    setVoteChecked([...updatedVoteChecked]);
  };

  const handleSaveVote = () => {
    const payload = {
      name: authState.user?.name,
      votes: voteChecked,
    };
    addVote(payload);
    setConfirmOpen(false);
    setVoteChecked([]);
  };

  return (
    <>
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
              <div className="flex flex-row justify-between">
                <h2 className="mb-2 text-3xl font-bold leading-none text-gray-700 md:text-4xl ">
                  {eventData?.data?.name}
                </h2>
                <div>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-blue-300 focus:outline-none hover:bg-blue-50 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-4 py-2 me-2 mb-2 flex flex-row gap-2  disabled:opacity-30"
                    onClick={() => setConfirmOpen(true)}
                    disabled={!Boolean(voteChecked.length)}
                  >
                    <Plus className="text-blue-500" />
                    <span className="text-blue-500 ">Add vote</span>
                  </button>
                </div>
              </div>
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                {eventVotes.map((aVote: any) => (
                  <EventVotes
                    date={aVote?.date}
                    people={aVote?.people}
                    suitableDates={suitableDates}
                    handleVoteCheckCLick={handleVoteCheckCLick}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      {confirmOpen ? (
        <ConfirmationPopup
          setOpen={setConfirmOpen}
          handleSaveVote={handleSaveVote}
        />
      ) : null}
    </>
  );
};

export default EventDetailsContainer;
