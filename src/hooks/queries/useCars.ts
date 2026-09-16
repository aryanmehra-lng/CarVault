import { useQuery } from '@tanstack/react-query';

import { carsService } from '@/lib/services/cars.service';
import type { Car } from '@/types/car';

/**
 * Filters out duplicate car entries based on generation_id and display_name.
 * Each distinct car model/generation appears only once.
 */
export const deduplicateCars = (cars: Car[]): Car[] => {
  const seenGenerations = new Set<number>();
  const seenNames = new Set<string>();

  return cars.filter((car) => {
    // Prevent multiple trim/transmission variants of the same generation
    if (seenGenerations.has(car.generation_id)) {
      return false;
    }
    const cleanName = car.display_name.trim().toLowerCase();
    if (seenNames.has(cleanName)) {
      return false;
    }

    seenGenerations.add(car.generation_id);
    seenNames.add(cleanName);
    return true;
  });
};

export const useCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: carsService.getCars,
    select: deduplicateCars,
  });
};