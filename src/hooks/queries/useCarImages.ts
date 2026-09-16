import { useQuery } from '@tanstack/react-query';

import { carsService } from '@/lib/services/cars.service';

export const useCarImages = (variantId: number) => {
  return useQuery({
    queryKey: ['car-images', variantId],
    queryFn: () => carsService.getCarImages(variantId),
    enabled: Boolean(variantId),
  });
};