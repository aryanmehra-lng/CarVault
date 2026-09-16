import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { Car, CarDetail, CarImage } from '@/types/car';
export const carsService = {
  async getCars(): Promise<Car[]> {
    const response = await apiClient.get(endpoints.variants);

    return response.data.data;
  },

  async getCarDetail(variantId: number): Promise<CarDetail> {
    const response = await apiClient.get(
      endpoints.variant(variantId)
    );

    return response.data.data;
  },

  async getCarSpecs(variantId: number) {
    const response = await apiClient.get(
      endpoints.variantSpecs(variantId)
    );

    return response.data.data;
  },

  async getCarImages(variantId: number): Promise<CarImage[]>  {
    const response = await apiClient.get(
      endpoints.variantImages(variantId)
    );

    return response.data.data;
  },

  async searchCars(query: string) {
    const response = await apiClient.get(endpoints.search, {
      params: {
        q: query,
      },
    });

    return response.data.data;
  },
};