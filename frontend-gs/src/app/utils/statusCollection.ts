import { createListCollection } from "@chakra-ui/react";

export const statusCollection = createListCollection({
  items: [
    { label: "Ativo", value: "ACTIVE" },
    { label: "Manutenção", value: "MAINTENANCE" },
    { label: "Inativo", value: "INACTIVE" },
  ],
});
