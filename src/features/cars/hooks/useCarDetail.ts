import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';

import { analyticsService } from '@/lib/analytics/analytics.service';
import { carsService } from '@/lib/services/cars.service';
import { useSavedCarsStore } from '@/store/savedCarsStore';

export function useCarDetail(variantIdProp?: number) {
  const params = useLocalSearchParams<{ id?: string }>();
  const variantId = variantIdProp ?? Number(params.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 1. Fetch car detailed specifications & metadata
  const {
    data: car,
    isLoading: isCarLoading,
    isError: isCarError,
  } = useQuery({
    queryKey: ['car-detail', variantId],
    queryFn: () => carsService.getCarDetail(variantId),
    enabled: Boolean(variantId),
  });

  // Track car view event once car details load
  const hasTrackedViewRef = useRef<number | null>(null);
  useEffect(() => {
    if (car && hasTrackedViewRef.current !== car.variant_id) {
      hasTrackedViewRef.current = car.variant_id;
      analyticsService.trackCarViewed(car);
    }
  }, [car]);

  // 2. Fetch car image gallery
  const {
    data: images,
    isLoading: isImagesLoading,
  } = useQuery({
    queryKey: ['car-images', variantId],
    queryFn: () => carsService.getCarImages(variantId),
    enabled: Boolean(variantId),
  });

  // 3. Saved / Bookmark state
  const isSaved = useSavedCarsStore((state) =>
    (state.savedCarIds ?? []).includes(variantId)
  );
  const saveCar = useSavedCarsStore((state) => state.saveCar);
  const unsaveCar = useSavedCarsStore((state) => state.unsaveCar);

  const toggleSave = () => {
    const carName = car?.display_name || `Car #${variantId}`;
    if (isSaved) {
      unsaveCar(variantId);
      analyticsService.trackCarUnsaved(variantId, carName);
    } else {
      saveCar(variantId);
      analyticsService.trackCarSaved(variantId, carName);
    }
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  // Currently active hero image url
  const activeImageUrl = useMemo(() => {
    if (!images || images.length === 0) return null;
    return images[selectedImageIndex]?.url ?? images[0]?.url;
  }, [images, selectedImageIndex]);

  return {
    variantId,
    car,
    images: images ?? [],
    activeImageUrl,
    selectedImageIndex,
    setSelectedImageIndex,
    isSaved,
    toggleSave,
    goBack,
    isLoading: isCarLoading || isImagesLoading,
    isError: isCarError,
  };
}
