import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarVaultLoader from '@/components/CarVaultLoader';
import { EmptyState } from '@/components/ui/EmptyState';
import { BackIcon, SearchIcon } from '@/components/ui/Icons';
import CarCard from '@/features/cars/components/CarCard';
import { SearchBar } from '@/features/search/components/SearchBar';
import { useCarSearch } from '@/features/search/hooks/useCarSearch';
import { useCars } from '@/hooks/queries/useCars';
import { Theme } from '@/theme';

interface SearchScreenProps {
  onBack?: () => void;
}

export default function SearchScreen({ onBack }: SearchScreenProps) {
  const { data: cars, isLoading } = useCars();
  const { searchQuery, setSearchQuery, clearSearch, searchResults } =
    useCarSearch(cars ?? []);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.root}>
        {/* Search Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            {Boolean(onBack) && (
              <TouchableOpacity
                onPress={onBack}
                style={styles.backButton}
                activeOpacity={0.7}
                hitSlop={styles.hitSlopArea}
              >
                <BackIcon size={20} color="#FFFFFF" />
              </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>Search Showroom</Text>
          </View>

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={clearSearch}
            placeholder="Search Ferrari, Porsche, Lamborghini..."
            autoFocus={false}
          />

          {Boolean(searchQuery.trim()) && (
            <View style={styles.resultCountRow}>
              <Text style={styles.resultCountText}>
                {searchResults.length}{' '}
                {searchResults.length === 1 ? 'vehicle' : 'vehicles'} found
              </Text>
            </View>
          )}
        </View>

        {/* Results or Loading */}
        {isLoading ? (
          <View style={styles.loadingWrapper}>
            <CarVaultLoader message="Searching vehicle fleet..." />
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => String(item.variant_id)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CarCard car={item} />}
            ListEmptyComponent={
              <EmptyState
                icon={<SearchIcon size={28} color={Theme.colors.accentLight} />}
                title={
                  searchQuery.trim()
                    ? `No matches for "${searchQuery}"`
                    : 'Search the Showroom'
                }
                description={
                  searchQuery.trim()
                    ? 'Fuzzy search didn’t find any models. Try searching by marque, body type, or fuel.'
                    : 'Type a name like "Ferrari", "Porsche", "V12", or "Coupe" to explore the collection.'
                }
                actionTitle={searchQuery.trim() ? 'Clear Query' : undefined}
                onAction={searchQuery.trim() ? clearSearch : undefined}
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
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  headerTitle: {
    ...Theme.typography.screenTitle,
    fontSize: 20,
  },
  resultCountRow: {
    marginTop: 10,
  },
  resultCountText: {
    ...Theme.typography.caption,
    color: Theme.colors.textMuted,
    fontWeight: '600',
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
  hitSlopArea: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
