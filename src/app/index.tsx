import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomNavBar, TabId } from '@/components/navigation/BottomNavBar';
import CarsScreen from '@/features/cars/Views/CarsScreen';
import ProfileScreen from '@/features/profile/Views/ProfileScreen';
import SavedCarsScreen from '@/features/saved/Views/SavedCarsScreen';
import SearchScreen from '@/features/search/Views/SearchScreen';
import { useSavedCarsStore } from '@/store/savedCarsStore';
import { Theme } from '@/theme';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const savedCarIds = useSavedCarsStore((state) => state.savedCarIds ?? []);

  return (
    <View style={styles.container}>
      {/* Screen Views */}
      <View style={styles.screenContainer}>
        {activeTab === 'home' && (
          <CarsScreen onNavigateToSearch={() => setActiveTab('search')} />
        )}
        {activeTab === 'search' && (
          <SearchScreen onBack={() => setActiveTab('home')} />
        )}
        {activeTab === 'saved' && (
          <SavedCarsScreen onExplore={() => setActiveTab('home')} />
        )}
        {activeTab === 'profile' && (
          <ProfileScreen onNavigateToSaved={() => setActiveTab('saved')} />
        )}
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedCount={savedCarIds.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  screenContainer: {
    flex: 1,
  },
});