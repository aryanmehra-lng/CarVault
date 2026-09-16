import { useMemo, useState } from 'react';
import type { Car } from '@/types/car';

export function useCarFilter(
  cars: Car[] | undefined,
  savedCarIds: number[]
) {
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Base list depending on active tab (all vs saved)
  const baseCars = useMemo(() => {
    if (!cars) return [];
    if (activeTab === 'saved') {
      const ids = savedCarIds ?? [];
      return cars.filter((car) => ids.includes(car.variant_id));
    }
    return cars;
  }, [cars, activeTab, savedCarIds]);

  // Dynamically extract unique categories and their counts from the current pool
  const categories = useMemo(() => {
    if (!cars) return ['All'];
    const unique = Array.from(
      new Set(
        cars
          .map((car) => car.body_type_en)
          .filter((b): b is string => Boolean(b))
      )
    ).sort();
    return ['All', ...unique];
  }, [cars]);

  // Dynamic tags for specs (fuel types and horsepower ranges)
  const tags = useMemo(() => {
    const list: string[] = ['All'];

    // Fuel types
    const fuels = new Set<string>();
    if (cars) {
      cars.forEach((car) => {
        if (car.fuel_slug) {
          const formatted =
            car.fuel_slug.charAt(0).toUpperCase() +
            car.fuel_slug.slice(1).toLowerCase();
          fuels.add(formatted);
        }
      });
    }
    ['Petrol', 'Diesel'].forEach((f) => fuels.add(f));
    list.push(...Array.from(fuels).sort());

    // Power tags (including 45 HP, 100+ HP, 150+ HP, 200+ HP)
    list.push('45 HP', '100+ HP', '150+ HP', '200+ HP');

    return list;
  }, [cars]);

  // Filtered cars by both selected category and selected spec tag
  const filteredCars = useMemo(() => {
    let result = baseCars;

    // Filter by body category
    if (selectedCategory !== 'All') {
      result = result.filter((car) => car.body_type_en === selectedCategory);
    }

    // Filter by spec/fuel/power tag
    if (selectedTag !== 'All') {
      const tagLower = selectedTag.toLowerCase();
      if (
        tagLower === 'petrol' ||
        tagLower === 'diesel' ||
        tagLower === 'electric' ||
        tagLower === 'hybrid'
      ) {
        result = result.filter(
          (car) => car.fuel_slug?.toLowerCase() === tagLower
        );
      } else if (selectedTag === '45 HP') {
        result = result.filter((car) => car.power_hp === 45);
      } else if (selectedTag.includes('+ HP')) {
        const threshold = parseInt(selectedTag.replace(/[^0-9]/g, ''), 10);
        result = result.filter(
          (car) => car.power_hp !== null && car.power_hp >= threshold
        );
      } else if (selectedTag.endsWith(' HP')) {
        const exact = parseInt(selectedTag.replace(/[^0-9]/g, ''), 10);
        result = result.filter((car) => car.power_hp === exact);
      }
    }

    return result;
  }, [baseCars, selectedCategory, selectedTag]);

  return {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedTag,
    setSelectedTag,
    tags,
    filteredCars,
  };
}

