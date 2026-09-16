import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/theme';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CARVAULT VIP</Text>
        </View>
      </View>
      <Text style={styles.brandTitle}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  badgeRow: {
    marginBottom: 10,
  },
  badge: {
    backgroundColor: Theme.colors.accentMuted,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  badgeText: {
    color: Theme.colors.accentLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
