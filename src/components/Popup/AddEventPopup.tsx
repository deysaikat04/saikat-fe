import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../Input";
import ReactDatePicker from "../DatePicker";
import moment from "moment";
import { X } from "lucide-react";

interface AddEventPopupProps {
  handleAddEvent: (name: string, dates: string[]) => void;
  setAddEventPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddEventFormDataInterface {
  name: string;
}

const formSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(4, { message: "Event name must contain at least 6 character(s)." }),
});

// const AddEventPopup = ({ setOpen, handleSaveVote }: ConfirmationPopupProps) => {
const AddEventPopup = ({
  handleAddEvent,
  setAddEventPopUpOpen,
}: AddEventPopupProps) => {
  const form = useForm<AddEventFormDataInterface>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [eventDates, setEventDates] = useState<string[]>([]);
  const [eventDatesError, setEventDatesError] = useState("");

  const handleEventDate = (date: Date) => {
    const datesArr = [...eventDates];
    datesArr.push(moment(date).format("YYYY-MM-DD"));
    setEventDates(datesArr);
    setEventDatesError("");
  };

  const handleDateRemove = (date: string) => {
    const datesArr = eventDates.filter((aDate) => aDate !== date);
    setEventDates(datesArr);
    customDateValidator(datesArr.length);
  };

  const onSubmit = (data: AddEventFormDataInterface, event: any) => {
    event.preventDefault();
    if (!customDateValidator()) {
      handleAddEvent(data.name, eventDates);
    }
  };

  const customDateValidator = (length?: number) => {
    if (eventDates.length === 0 || length === 0) {
      setEventDatesError("Date can not be empty!");
      return true;
    }
    setEventDatesError("");
    return false;
  };

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-[#000000b3]"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-2xl font-semibold text-gray-900 ">Add Event</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setAddEventPopUpOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form
            className="space-y-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="p-4 md:p-5 space-y-4">
              <Input
                label={"Event name"}
                type={"text"}
                id={"name"}
                name={"name"}
                error={errors.name?.message}
                register={register}
              />

              <ReactDatePicker
                handleChange={handleEventDate}
                label={"Select dates"}
                id={"event_date"}
              />
              {eventDatesError.length ? (
                <span className="text-sm text-red-500 ">{eventDatesError}</span>
              ) : null}

              <div className="flex flex-row">
                {eventDates?.map((aDate) => {
                  return (
                    <div className="flex flex-row p-2 mr-2 rounded-md bg-slate-100 border border-slate-300 w-fit gap-2">
                      <span className="">{aDate}</span>
                      <X
                        className="cursor-pointer text-slate-400 hover:text-slate-800"
                        onClick={() => handleDateRemove(aDate)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray200 rounded-b justify-end">
              <button
                type="submit"
                data-modal-hide="default-modal"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={() => setAddEventPopUpOpen(false)}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventPopup;
