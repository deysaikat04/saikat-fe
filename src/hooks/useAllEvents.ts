import { useQuery } from "react-query";
import apiService from "../utils/apiService";

export default function useAllEvents() {
  return useQuery(["All Events"], () =>
    apiService
      .get(`/event/list`)
      .then((res) => res.data)
      .catch((error) => console.error(error))
  );
}
