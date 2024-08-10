import { useQuery } from "react-query";
import apiService from "../utils/apiService";

export default function useEventResultById(eventId: string) {
  return useQuery(["Event results", eventId], () =>
    apiService
      .get(`/event/${eventId}/results`)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  );
}
