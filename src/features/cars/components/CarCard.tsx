import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HeartIcon } from '@/components/ui/Icons';
import { useCarImages } from '@/hooks/queries/useCarImages';
import { analyticsService } from '@/lib/analytics/analytics.service';
import { useSavedCarsStore } from '@/store/savedCarsStore';
import { Theme } from '@/theme';
import type { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
}

const CAR_IMAGE_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

const CarCard = React.memo(function CarCard({ car }: CarCardProps) {
  if (!car) return null;

  const { data: images, isLoading } = useCarImages(car.variant_id);
  const isSaved = useSavedCarsStore((state) =>
    (state.savedCarIds ?? []).includes(car.variant_id)
  );
  const saveCar = useSavedCarsStore((state) => state.saveCar);
  const unsaveCar = useSavedCarsStore((state) => state.unsaveCar);

  const handleToggleSave = () => {
    if (isSaved) {
      unsaveCar(car.variant_id);
      analyticsService.trackCarUnsaved(car.variant_id, car.display_name);
    } else {
      saveCar(car.variant_id);
      analyticsService.trackCarSaved(car.variant_id, car.display_name);
    }
  };

  const handleOpenDetail = () => {
    router.push(`/car/${car.variant_id}` as any);
  };

  const hasLoggedRef = useRef(false);

  const cardImage =
    images?.find((img) => img.variant === 'card') ?? images?.[0];
  const imageUrl = cardImage?.url;

  const imageSource = useMemo(() => {
    if (!imageUrl) return null;
    return {
      uri: imageUrl,
      headers: CAR_IMAGE_HEADERS,
    };
  }, [imageUrl]);

  // Format specifications row cleanly
  const specsRow = useMemo(() => {
    const parts: string[] = [];
    if (car.power_hp !== null && car.power_hp !== undefined) {
      parts.push(`${car.power_hp} HP`);
    }
    if (car.body_type_en) {
      parts.push(car.body_type_en);
    }
    if (car.fuel_slug) {
      parts.push(car.fuel_slug.toUpperCase());
    }
    return parts.length > 0 ? parts.join('  •  ') : 'Specifications in Garage';
  }, [car]);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleOpenDetail}
        style={styles.cardInner}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${car.display_name}`}
      >
        {/* Visual Photography Container */}
        <View style={styles.imageWrapper}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.carImage}
              contentFit="cover"
              transition={250}
              priority="high"
              cachePolicy="memory-disk"
              onLoad={() => {
                if (!hasLoggedRef.current) {
                  hasLoggedRef.current = true;
                }
              }}
            />
          ) : isLoading ? (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="small" color={Theme.colors.accentLight} />
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.noImageText}>Studio Photography Pending</Text>
            </View>
          )}

          {/* Subtle Dark Gradient Overlay for bottom text legibility */}
          <View style={styles.bottomScrim} />

          {/* Floating Heart Save Button in Top-Right */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleToggleSave}
            style={[
              styles.heartButton,
              isSaved ? styles.heartButtonSaved : styles.heartButtonDefault,
            ]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? 'Remove from saved' : 'Save to garage'}
          >
            <HeartIcon
              size={18}
              color="#FFFFFF"
              filled={isSaved}
            />
          </TouchableOpacity>

          {/* In-Card Details Positioned over bottom */}
          <View style={styles.cardDetails}>
            <Text style={styles.carTitle} numberOfLines={1}>
              {car.display_name}
            </Text>
            <Text style={styles.specsText} numberOfLines={1}>
              {specsRow}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

CarCard.displayName = 'CarCard';

export default CarCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    overflow: 'hidden',
    ...Theme.shadows.card,
  },
  cardInner: {
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#0E1017',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  carImage: {
    ...StyleSheet.absoluteFill,
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E1017',
  },
  noImageText: {
    ...Theme.typography.caption,
    color: Theme.colors.textMuted,
  },
  bottomScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 10, 15, 0.45)',
  },
  heartButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 10,
  },
  heartButtonDefault: {
    backgroundColor: 'rgba(9, 10, 15, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  heartButtonSaved: {
    backgroundColor: Theme.colors.heartRed,
    borderColor: Theme.colors.heartRed,
    shadowColor: Theme.colors.heartRed,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  heartButtonPressed: {
    transform: [{ scale: 0.92 }],
  },
  cardDetails: {
    padding: 16,
    zIndex: 5,
  },
  carTitle: {
    ...Theme.typography.carName,
    fontSize: 20,
    marginBottom: 4,
  },
  specsText: {
    ...Theme.typography.caption,
    color: '#CBD5E1',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});