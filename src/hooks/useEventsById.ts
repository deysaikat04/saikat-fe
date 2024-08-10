import { useQuery } from "react-query";
import apiService from "../utils/apiService";
import { EventByIdAPIResponse } from "../constants/types";

export default function useEventsById(eventId: string) {
  return useQuery<EventByIdAPIResponse>(["Event", eventId], () =>
    apiService
      .get(`/event/${eventId}`)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  );
}
