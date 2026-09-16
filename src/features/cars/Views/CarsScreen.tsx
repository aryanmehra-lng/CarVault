import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarVaultLoader from '@/components/CarVaultLoader';
import { EmptyState } from '@/components/ui/EmptyState';
import CarCard from '@/features/cars/components/CarCard';
import { CategoryFilterBar } from '@/features/cars/components/CategoryFilterBar';
import { TagFilterBar } from '@/features/cars/components/TagFilterBar';
import { useCarFilter } from '@/features/cars/hooks/useCarFilter';
import { SearchBar } from '@/features/search/components/SearchBar';
import { useCarSearch } from '@/features/search/hooks/useCarSearch';
import { useCars } from '@/hooks/queries/useCars';
import { useSavedCarsStore } from '@/store/savedCarsStore';
import { Theme } from '@/theme';

interface CarsScreenProps {
  onNavigateToSearch?: () => void;
}

export default function CarsScreen({ onNavigateToSearch }: CarsScreenProps) {
  const { data, isLoading, isError, refetch, isRefetching } = useCars();
  const savedCarIds = useSavedCarsStore((state) => state.savedCarIds ?? []);

  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedTag,
    setSelectedTag,
    tags,
    filteredCars,
  } = useCarFilter(data, savedCarIds);

  const { searchQuery, setSearchQuery, clearSearch, searchResults } =
    useCarSearch(filteredCars);

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <CarVaultLoader message="Loading CarVault showroom..." />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <EmptyState
          title="Showroom Offline"
          description="Could not connect to the vehicle fleet API. Check your connection or try again."
          actionTitle="Retry Connection"
          onAction={() => refetch()}
        />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.root}>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <View style={styles.brandLeft}>
              <View style={styles.brandBadge}>
                <Text style={styles.brandBadgeText}>CARVAULT</Text>
              </View>
              <View style={styles.statusDot} />
              <Text style={styles.statusLabel}>Live Showroom</Text>
            </View>
            <View style={styles.fleetCountBadge}>
              <Text style={styles.fleetCountText}>
                {data ? `${data.length} Models` : 'Fleet'}
              </Text>
            </View>
          </View>

          {/* Hero Title */}
          <Text style={styles.heroTitle}>
            Find your dream machine.
          </Text>

          {/* Integrated Search Bar */}
          <View style={styles.searchWrapper}>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={clearSearch}
              onFocus={onNavigateToSearch}
              placeholder=""
            />
          </View>
        </View>

        {/* Category Filter Bar */}
        <CategoryFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Spec / Fuel / Power Tag Filter Bar */}
        <TagFilterBar
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        {/* Cars Showcase List */}
        <FlatList
          data={searchResults}
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
                  message="Updating Showroom Fleet..."
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
              title={
                searchQuery.trim()
                  ? `No machines matching "${searchQuery}"`
                  : selectedTag !== 'All' && selectedCategory !== 'All'
                  ? `No ${selectedTag} ${selectedCategory} vehicles`
                  : selectedTag !== 'All'
                  ? `No ${selectedTag} vehicles`
                  : `No ${selectedCategory} vehicles`
              }
              description={
                searchQuery.trim()
                  ? 'Try checking spelling or search for another vehicle name or body style.'
                  : 'Reset your category or tag filters to see available fleet vehicles.'
              }
              actionTitle={
                searchQuery.trim()
                  ? 'Clear Search'
                  : selectedCategory !== 'All' || selectedTag !== 'All'
                  ? 'Reset Filters'
                  : undefined
              }
              onAction={
                searchQuery.trim()
                  ? clearSearch
                  : () => {
                      setSelectedCategory('All');
                      setSelectedTag('All');
                    }
              }
            />
          }
        />
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
  loadingWrapper: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 2,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  brandLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.accentMuted,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  brandBadgeText: {
    ...Theme.typography.brandBadge,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.successGreen,
  },
  statusLabel: {
    fontSize: 12,
    color: Theme.colors.textMuted,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  fleetCountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Theme.radius.sm,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  fleetCountText: {
    fontSize: 11,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    letterSpacing: -0.6,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  searchWrapper: {
    marginBottom: 14,
  },
  listContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 110,
  },
  refreshBanner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 16,
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