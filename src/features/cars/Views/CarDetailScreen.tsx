import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarVaultLoader from '@/components/CarVaultLoader';
import { EmptyState } from '@/components/ui/EmptyState';
import { HeartIcon } from '@/components/ui/Icons';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CarHeroGallery } from '@/features/cars/components/CarHeroGallery';
import { CarStatsGrid } from '@/features/cars/components/CarStatsGrid';
import { CarTechnicalSpecs } from '@/features/cars/components/CarTechnicalSpecs';
import { useCarDetail } from '@/features/cars/hooks/useCarDetail';
import { Theme } from '@/theme';

export default function CarDetailScreen() {
  const {
    car,
    images,
    activeImageUrl,
    selectedImageIndex,
    setSelectedImageIndex,
    isSaved,
    toggleSave,
    goBack,
    isLoading,
    isError,
  } = useCarDetail();

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <CarVaultLoader message="Loading vehicle specifications..." />
      </View>
    );
  }

  if (isError || !car) {
    return (
      <View style={[styles.root, styles.centerContainer]}>
        <EmptyState
          title="Vehicle Data Unavailable"
          description="We couldn't retrieve the technical details for this vehicle."
          actionTitle="Return to Showroom"
          onAction={goBack}
        />
      </View>
    );
  }

  // Quick metadata badges
  const metaBadges: string[] = [];
  if (car.power_hp) metaBadges.push(`${car.power_hp} HP`);
  if (car.fuel_slug) metaBadges.push(car.fuel_slug.toUpperCase());
  if (car.body_type_en) metaBadges.push(car.body_type_en.toUpperCase());

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cinematic Gallery Viewport */}
        <CarHeroGallery
          activeImageUrl={activeImageUrl}
          images={images}
          selectedImageIndex={selectedImageIndex}
          onSelectImage={setSelectedImageIndex}
          isSaved={isSaved}
          onToggleSave={toggleSave}
          onBack={goBack}
        />

        {/* Title Header Section */}
        <View style={styles.titleSection}>
          {/* Metadata Badges */}
          <View style={styles.badgeRow}>
            {metaBadges.map((badge, idx) => (
              <View
                key={badge + idx}
                style={[
                  styles.badge,
                  idx === 0 && styles.badgeAccent,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    idx === 0 && styles.badgeTextAccent,
                  ]}
                >
                  {badge}
                </Text>
              </View>
            ))}
          </View>

          {/* Car Display Name */}
          <Text style={styles.carName}>{car.display_name}</Text>

          {/* Subtitle / Generation */}
          <Text style={styles.generationText}>
            Generation #{car.generation_id}  •  {car.spec_count} Specifications Recorded
          </Text>
        </View>

        {/* Performance Metrics Grid */}
        <CarStatsGrid car={car} />

        {/* Engineering & Chassis Specs */}
        <CarTechnicalSpecs car={car} />
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBarWrapper}>
        <View style={styles.bottomBarContent}>
          <View style={styles.bottomPriceCol}>
            <Text style={styles.bottomPriceLabel}>Est. Original Price</Text>
            <Text style={styles.bottomPriceValue}>
              {car.price_new_eur
                ? `€${car.price_new_eur.toLocaleString()}`
                : 'Estimate in Showroom'}
            </Text>
          </View>

          <View style={styles.bottomButtonWrapper}>
            <PrimaryButton
              title={isSaved ? 'Saved to Garage' : 'Save to Garage'}
              onPress={toggleSave}
              variant={isSaved ? 'danger' : 'primary'}
              icon={<HeartIcon size={16} color="#FFFFFF" filled={isSaved} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  loadingWrapper: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: Theme.colors.surfaceElevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Theme.radius.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  badgeAccent: {
    backgroundColor: Theme.colors.accentMuted,
    borderColor: Theme.colors.accent,
  },
  badgeText: {
    ...Theme.typography.metadata,
    fontSize: 10,
  },
  badgeTextAccent: {
    color: Theme.colors.accentLight,
  },
  carName: {
    ...Theme.typography.screenTitle,
    fontSize: 26,
    lineHeight: 32,
    color: '#FFFFFF',
  },
  generationText: {
    ...Theme.typography.caption,
    color: Theme.colors.textMuted,
    marginTop: 6,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  bottomBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(14, 16, 23, 0.96)',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    ...Theme.shadows.floating,
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  bottomPriceCol: {
    flex: 1,
    marginRight: 16,
  },
  bottomPriceLabel: {
    ...Theme.typography.caption,
    fontSize: 10,
    textTransform: 'uppercase',
    color: Theme.colors.textMuted,
  },
  bottomPriceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
    letterSpacing: -0.3,
  },
  bottomButtonWrapper: {
    flex: 1.2,
  },
});
