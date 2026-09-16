import { Image } from 'expo-image';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackIcon, HeartIcon } from '@/components/ui/Icons';
import { Theme } from '@/theme';
import type { CarImage } from '@/types/car';

interface CarHeroGalleryProps {
  activeImageUrl: string | null;
  images: CarImage[];
  selectedImageIndex: number;
  onSelectImage: (index: number) => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
}

const CAR_IMAGE_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

export function CarHeroGallery({
  activeImageUrl,
  images,
  selectedImageIndex,
  onSelectImage,
  isSaved,
  onToggleSave,
  onBack,
}: CarHeroGalleryProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Hero Image Viewport */}
      <View style={styles.heroWrapper}>
        {activeImageUrl ? (
          <Image
            source={{
              uri: activeImageUrl,
              headers: CAR_IMAGE_HEADERS,
            }}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
            priority="high"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Studio Photography Pending</Text>
          </View>
        )}

        {/* Subtle Bottom Scrim */}
        <View style={styles.heroGradient} />

        {/* Floating Top Controls (Back & Save) */}
        <View style={styles.topControls}>
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            style={styles.controlCircle}
            hitSlop={styles.hitSlopArea}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <BackIcon size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onToggleSave}
            activeOpacity={0.7}
            style={[
              styles.controlCircle,
              isSaved && styles.controlSaved,
            ]}
            hitSlop={styles.hitSlopArea}
            accessibilityRole="button"
            accessibilityLabel={isSaved ? 'Remove from saved' : 'Save to garage'}
          >
            <HeartIcon filled={isSaved} color={isSaved ? '#EF4444' : '#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thumbnails Carousel if multiple images exist */}
      {images.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailList}
        >
          {images.map((img, idx) => {
            const isSelected = selectedImageIndex === idx;
            return (
              <TouchableOpacity
                key={img.url || idx}
                onPress={() => onSelectImage(idx)}
                activeOpacity={0.75}
                style={[
                  styles.thumbCard,
                  isSelected && styles.thumbCardSelected,
                ]}
              >
                <Image
                  source={{
                    uri: img.url,
                    headers: CAR_IMAGE_HEADERS,
                  }}
                  style={styles.thumbImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
  },
  heroWrapper: {
    width: '100%',
    height: 320,
    backgroundColor: '#0E1017',
    position: 'relative',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E1017',
  },
  placeholderText: {
    ...Theme.typography.caption,
    color: Theme.colors.textMuted,
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'rgba(9, 10, 15, 0.65)',
  },
  topControls: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 36,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  hitSlopArea: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  controlCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(9, 10, 15, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.floating,
  },
  controlSaved: {
    backgroundColor: Theme.colors.heartRed,
    borderColor: Theme.colors.heartRed,
  },
  controlPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.85,
  },
  thumbnailList: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 10,
  },
  thumbCard: {
    width: 68,
    height: 48,
    borderRadius: Theme.radius.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.surface,
  },
  thumbCardSelected: {
    borderColor: Theme.colors.accentLight,
    shadowColor: Theme.colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
});
