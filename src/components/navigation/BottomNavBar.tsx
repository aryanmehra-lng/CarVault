import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  HeartIcon,
  HomeIcon,
  ProfileIcon,
  SearchIcon,
} from '@/components/ui/Icons';
import { Theme } from '@/theme';

export type TabId = 'home' | 'search' | 'saved' | 'profile';

interface BottomNavBarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  savedCount?: number;
}

export function BottomNavBar({
  activeTab,
  onSelectTab,
  savedCount = 0,
}: BottomNavBarProps) {
  const tabs: { id: TabId; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (active) => (
        <HomeIcon
          color={active ? Theme.colors.accentLight : Theme.colors.textMuted}
        />
      ),
    },
    {
      id: 'search',
      label: 'Search',
      icon: (active) => (
        <SearchIcon
          color={active ? Theme.colors.accentLight : Theme.colors.textMuted}
        />
      ),
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: (active) => (
        <View style={styles.savedIconContainer}>
          <HeartIcon
            color={active ? Theme.colors.heartRed : Theme.colors.textMuted}
            filled={active}
          />
          {savedCount > 0 && (
            <View style={styles.savedBadge}>
              <Text style={styles.savedBadgeText}>
                {savedCount > 99 ? '99+' : savedCount}
              </Text>
            </View>
          )}
        </View>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (active) => (
        <ProfileIcon
          color={active ? Theme.colors.accentLight : Theme.colors.textMuted}
        />
      ),
    },
  ];

  return (
    <SafeAreaView edges={['bottom']} style={styles.navBarWrapper}>
      <View style={styles.navBarContent}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => onSelectTab(tab.id)}
              style={styles.tabItem}
              hitSlop={8}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
            >
              <View style={styles.iconWrapper}>{tab.icon(isActive)}</View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                ]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(14, 16, 23, 0.96)',
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    ...Theme.shadows.floating,
    zIndex: 50,
  },
  navBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 6,
    minHeight: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  iconWrapper: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: -0.1,
  },
  tabLabelInactive: {
    color: Theme.colors.textMuted,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: Theme.colors.accentLight,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 22,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: Theme.colors.accent,
  },
  savedIconContainer: {
    position: 'relative',
  },
  savedBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: Theme.colors.accent,
    borderRadius: Theme.radius.full,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  savedBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
