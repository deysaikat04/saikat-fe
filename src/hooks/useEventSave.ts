import { useMutation, useQueryClient } from "react-query";
import apiService from "../utils/apiService";

export default function useEventSave() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => apiService.post(`/event`, data).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["All Events"]);
      },
    }
  );
}
