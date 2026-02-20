import { z } from "zod";

export const assetSchema = z.object({
  name: z.string().min(2, "Informe um nome válido"),
  category: z.string().min(1, "Selecione uma categoria"),
  serialNumber: z.string().min(2, "Informe o número de série"),
  acquisitionDate: z
    .string()
    .min(1, "Informe a data de aquisição")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD"),
  status: z.string(),
});

export type AssetFormValues = z.infer<typeof assetSchema>;
