import { useMutation, useQueryClient } from "@tanstack/react-query";
import { edit, type AssetsRequest } from "../services/assets/assets";

export function useEditAsset() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AssetsRequest> }) =>
      edit(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
