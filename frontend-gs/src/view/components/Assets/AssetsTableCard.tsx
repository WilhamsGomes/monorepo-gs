import { Box, Button, Card, Grid, GridItem, HStack, Icon, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useMemo } from "react";

import { AssetSearchInput } from "./AssetSearchInput";
import AssetSelect from "./AssetSelect";
import { categoryCollection } from "@/app/utils/categoryCollection";
import { AssetsTable } from "./AssetsTable";

import type { AssetRow } from "@/app/types/asset";
import type { AssetFormValues } from "@/app/utils/assetSchema";
import { AssetFormModal } from "./AssetFormModal";
import { useAssetsQuery } from "@/app/hooks/useAssetsQuery";
import { useAssetsContext } from "@/app/context/useSettingsContext";
import { useCreateAsset } from "@/app/hooks/useCreateAsset";
import { useEditAsset } from "@/app/hooks/useEditAsset";
import { useDeleteAsset } from "@/app/hooks/useDeleteAsset";
import { statusCollection } from "@/app/utils/statusCollection";

const CATEGORY_OPTIONS = [
  { label: "Computador", value: "Computador" },
  { label: "Monitor", value: "Monitor" },
  { label: "Periférico", value: "Periférico" },
  { label: "Rede", value: "Rede" },
  { label: "Impressora", value: "Impressora" },
];

const STATUS_OPTIONS = [
  { label: "Ativo", value: "ACTIVE" },
  { label: "Manutenção", value: "MAINTENANCE" },
  { label: "Inativo", value: "INACTIVE" },
];

export function AssetsTableCard() {
  const { data = [], isLoading, refetch } = useAssetsQuery();

  const {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    modalOpen,
    setModalOpen,
    mode,
    editing,
    setMode,
    setEditing,
  } = useAssetsContext();

  const createMutation = useCreateAsset();
  const editMutation = useEditAsset();
  const deleteMutation = useDeleteAsset();

  const filteredRows = useMemo(() => {
    const s = search?.trim().toLowerCase();

    return data.filter((r) => {
      const matchSearch =
        !s ||
        r.name.toLowerCase().includes(s) ||
        r.serialNumber?.toLowerCase().includes(s);

      const matchCategory =
        categoryFilter.length === 0 || categoryFilter.includes(r.category);

      const matchStatus =
        statusFilter.length === 0 || statusFilter.includes(r.status);

      return matchSearch && matchCategory && matchStatus;
    });
  }, [data, search, categoryFilter, statusFilter]);

  const openCreate = () => {
    setMode("create");
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (asset: AssetRow) => {
    setMode("edit");
    setEditing(asset);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    await refetch();
  };

  const handleSubmit = async (values: AssetFormValues) => {
    if (mode === "create") {
      await createMutation.mutateAsync(values);
    } else if (editing) {
      await editMutation.mutateAsync({
        id: editing.id,
        data: values,
      });
    }

    await refetch();
    setModalOpen(false);
  };

  const clearFilter = () => {
    setCategoryFilter([]);
    setStatusFilter([]);
    setSearch("");
  };

  return (
    <Card.Root
      bg="white"
      borderRadius="16px"
      borderWidth="1px"
      borderColor="gray.200"
      display={"flex"}
    >
      <Card.Body>
        <HStack
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          mb="4"
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 3, md: 0 }}
        >
          <Text fontSize="lg" fontWeight="700" color="blackAlpha.900">
            Ativos
          </Text>

          <Button
            colorPalette="blue"
            borderRadius="12px"
            onClick={openCreate}
            width={{ base: "100%", md: "auto" }}
          >
            <Icon as={FiPlus} />
            Adicionar ativo
          </Button>
        </HStack>

        <Grid
          mb="4"
          gap="3"
          templateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "2fr 1fr 1fr auto",
          }}
          alignItems="center"
        >
          <GridItem minW={0}>
            <AssetSearchInput value={search} onChange={setSearch} />
          </GridItem>

          <GridItem minW={0}>
            <AssetSelect
              collection={categoryCollection}
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder="Todas categorias"
              width="100%"
            />
          </GridItem>

          <GridItem minW={0}>
            <AssetSelect
              collection={statusCollection}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Todos status"
              width="100%"
            />
          </GridItem>

          <GridItem>
            <Button
              colorPalette="red"
              borderRadius="12px"
              onClick={clearFilter}
              width={{ base: "100%", lg: "auto" }}
            >
              Limpar
            </Button>
          </GridItem>
        </Grid>

        {isLoading ? (
          <Text>Carregando ativos...</Text>
        ) : (
          <Box
            overflowX="auto"
            overflowY="hidden"
            width="100%"
            minW={0}
            borderRadius="12px"
          >
            <Box minW="900px">
              <AssetsTable
                rows={filteredRows}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            </Box>
          </Box>
        )}

        <AssetFormModal
          open={modalOpen}
          mode={mode}
          initialData={editing}
          categories={CATEGORY_OPTIONS}
          statuses={STATUS_OPTIONS}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Card.Body>
    </Card.Root>
  );
}
