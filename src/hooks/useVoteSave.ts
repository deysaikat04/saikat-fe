import { useMutation, useQueryClient } from "react-query";
import apiService from "../utils/apiService";

export default function useVoteSave(id?: string) {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) =>
      apiService.post(`/event/${id}/vote`, data).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Event results", id]);
        queryClient.invalidateQueries(["Event", id]);
      },
    }
  );
}
