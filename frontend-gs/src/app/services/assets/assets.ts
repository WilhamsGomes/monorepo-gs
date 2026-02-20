import type { AssetStatus } from "@/app/types/asset";
import { httpClient } from "../http";

export interface AssetsRequest {
  name: string;
  category: string;
  serialNumber: string;
  acquisitionDate: string;
  status: string;
}

export interface AssetsResponse {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  acquisitionDate: string;
  status: AssetStatus;
}

export interface AssetsRequestUpdate extends AssetsRequest {
  id: string;
}

export async function create(params: AssetsRequest) {
  const { data } = await httpClient.post<AssetsResponse>("/assets", params);

  return data;
}

export async function findAll() {
  const { data } = await httpClient.get<AssetsResponse[] | null>("/assets");

  return data;
}

export async function edit(id: string, params: Partial<AssetsRequest>) {
  const { data } = await httpClient.put<AssetsResponse>( `/assets/${id}`, params);

  return data;
}

export async function deleteAsset(id: string) {
  const { data } = await httpClient.delete(`/assets/${id}`);

  return data;
}
