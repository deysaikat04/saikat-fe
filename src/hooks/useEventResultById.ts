import { useQuery } from "react-query";
import apiService from "../utils/apiService";
import { EventResultByIdAPIResponse } from "../constants/types";

export default function useEventResultById(eventId: string) {
  return useQuery<EventResultByIdAPIResponse>(["Event results", eventId], () =>
    apiService
      .get(`/event/${eventId}/results`)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  );
}
