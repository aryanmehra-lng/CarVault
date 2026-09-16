import React, { useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarVaultLoader from '@/components/CarVaultLoader';
import { EmptyState } from '@/components/ui/EmptyState';
import { HeartIcon } from '@/components/ui/Icons';
import CarCard from '@/features/cars/components/CarCard';
import { useCars } from '@/hooks/queries/useCars';
import { useSavedCarsStore } from '@/store/savedCarsStore';
import { Theme } from '@/theme';

interface SavedCarsScreenProps {
  onExplore?: () => void;
}

export default function SavedCarsScreen({ onExplore }: SavedCarsScreenProps) {
  const { data: cars, isLoading, refetch, isRefetching } = useCars();
  const savedCarIds = useSavedCarsStore((state) => state.savedCarIds ?? []);

  // Filter cars that are in savedCarIds
  const savedCars = useMemo(() => {
    if (!cars || savedCarIds.length === 0) return [];
    return cars.filter((car) => savedCarIds.includes(car.variant_id));
  }, [cars, savedCarIds]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>PERSONAL GARAGE</Text>
            </View>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Saved Cars</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{savedCarIds.length}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <CarVaultLoader message="Loading your garage..." />
          </View>
        ) : (
          <FlatList
            data={savedCars}
            keyExtractor={(item) => String(item.variant_id)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CarCard car={item} />}
            ListHeaderComponent={
              isRefetching ? (
                <View style={styles.refreshBanner}>
                  <CarVaultLoader
                    size={76}
                    height={48}
                    message="Updating Personal Garage..."
                    style={styles.refreshLoader}
                    textStyle={styles.refreshText}
                  />
                </View>
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={refetch}
                tintColor="transparent"
                colors={['transparent']}
                progressBackgroundColor="transparent"
              />
            }
            ListEmptyComponent={
              <EmptyState
                icon={<HeartIcon color={Theme.colors.textMuted} filled={false} />}
                title="Your garage is empty"
                description="Save cars you love and they'll appear here in your personal collection."
                actionTitle={onExplore ? 'Explore Showroom' : undefined}
                onAction={onExplore}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  badgeRow: {
    marginBottom: 8,
  },
  brandBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.accentMuted,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  brandBadgeText: {
    ...Theme.typography.brandBadge,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...Theme.typography.screenTitle,
    fontSize: 24,
  },
  countBadge: {
    backgroundColor: Theme.colors.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Theme.radius.full,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  countText: {
    fontSize: 13,
    fontWeight: '800',
    color: Theme.colors.accentLight,
  },
  loadingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  refreshBanner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  refreshLoader: {
    flex: 0,
    padding: 0,
  },
  refreshText: {
    marginTop: 6,
    fontSize: 12,
    color: Theme.colors.accentLight,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

