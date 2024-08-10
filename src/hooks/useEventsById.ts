import { useQuery } from "react-query";
import apiService from "../utils/apiService";

export default function useEventsById(eventId: string) {
  return useQuery(["Event", eventId], () =>
    apiService
      .get(`/event/${eventId}`)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  );
}
