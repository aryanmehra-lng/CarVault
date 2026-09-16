import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeartIcon, SpeedIcon } from '@/components/ui/Icons';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuthStore } from '@/store/authStore';
import { useSavedCarsStore } from '@/store/savedCarsStore';
import { Theme } from '@/theme';

interface ProfileScreenProps {
  onNavigateToSaved?: () => void;
}

export default function ProfileScreen({ onNavigateToSaved }: ProfileScreenProps) {
  const user = useAuthStore((state) => state.user);
  const preferredCategory = useAuthStore((state) => state.preferredCategory);
  const logout = useAuthStore((state) => state.logout);
  const savedCarIds = useSavedCarsStore((state) => state.savedCarIds ?? []);

  const handleLogoutConfirm = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of CarVault?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: logout,
        },
      ],
      { cancelable: true }
    );
  };

  const initials = (user?.name || 'Driver')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
        {/* Brand Badge */}
        <View style={styles.brandRow}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>CARVAULT SHOWROOM</Text>
          </View>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Car Collector'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'collector@carvault.io'}</Text>
          </View>
        </View>

        {/* Garage Statistics Grid */}
        <Text style={styles.sectionTitle}>Garage Overview</Text>
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statCard}
            activeOpacity={0.7}
            onPress={onNavigateToSaved}
          >
            <View style={styles.statIconBadge}>
              <HeartIcon color={Theme.colors.heartRed} filled />
            </View>
            <Text style={styles.statValue}>{savedCarIds.length}</Text>
            <Text style={styles.statLabel}>Saved Cars</Text>
          </TouchableOpacity>

          <View style={styles.statCard}>
            <View style={[styles.statIconBadge, styles.accentIconBadge]}>
              <SpeedIcon color={Theme.colors.accentLight} />
            </View>
            <Text style={styles.statValue} numberOfLines={1}>
              {preferredCategory || 'Supercars'}
            </Text>
            <Text style={styles.statLabel}>Preferred Class</Text>
          </View>
        </View>

        {/* Membership Info */}
        <Text style={styles.sectionTitle}>Collector Status</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tier</Text>
            <Text style={styles.infoValueAccent}>VIP Collector</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Curated Models</Text>
            <Text style={styles.infoValue}>Full Access</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>CarVault v1.0.0</Text>
          </View>
        </View>

        {/* Logout Action */}
        <View style={styles.actionSection}>
          <PrimaryButton
            title="Log Out of Showroom"
            onPress={handleLogoutConfirm}
            variant="secondary"
          />
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  brandRow: {
    marginBottom: 16,
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: 24,
    ...Theme.shadows.card,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: Theme.colors.accentLight,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Theme.typography.screenTitle,
    fontSize: 19,
    marginBottom: 4,
  },
  userEmail: {
    ...Theme.typography.body,
    fontSize: 13,
    color: Theme.colors.textMuted,
  },
  sectionTitle: {
    ...Theme.typography.sectionTitle,
    fontSize: 13,
    color: Theme.colors.textSecondary,
    marginBottom: 12,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  statIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  accentIconBadge: {
    backgroundColor: Theme.colors.accentMuted,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  infoCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: 28,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    color: Theme.colors.textPrimary,
    fontWeight: '600',
  },
  infoValueAccent: {
    fontSize: 13,
    color: Theme.colors.accentLight,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  actionSection: {
    marginTop: 4,
  },
});
