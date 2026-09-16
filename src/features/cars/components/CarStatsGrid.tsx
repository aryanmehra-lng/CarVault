import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/theme';
import type { CarDetail } from '@/types/car';

interface CarStatsGridProps {
  car: CarDetail;
}

export function CarStatsGrid({ car }: CarStatsGridProps) {
  const stats = [
    {
      label: 'Horsepower',
      value: car.power_hp !== null && car.power_hp !== undefined ? `${car.power_hp} HP` : '—',
      tag: 'POWER',
    },
    {
      label: 'Top Speed',
      value: car.top_speed_kmh !== null && car.top_speed_kmh !== undefined ? `${car.top_speed_kmh} km/h` : '—',
      tag: 'VELOCITY',
    },
    {
      label: '0–100 km/h',
      value: car.accel_0_100_s !== null && car.accel_0_100_s !== undefined ? `${car.accel_0_100_s} s` : '—',
      tag: 'ACCEL',
    },
    {
      label: 'Torque',
      value: car.torque_nm !== null && car.torque_nm !== undefined ? `${car.torque_nm} Nm` : '—',
      tag: 'OUTPUT',
    },
    {
      label: 'Body Style',
      value: car.body_type_en ?? '—',
      tag: 'CHASSIS',
    },
    {
      label: 'Powertrain',
      value: car.fuel_slug ? car.fuel_slug.toUpperCase() : '—',
      tag: 'FUEL',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Performance Metrics</Text>
      <View style={styles.grid}>
        {stats.map((stat, idx) => (
          <View key={stat.label + idx} style={styles.statCard}>
            <Text style={styles.statTag}>{stat.tag}</Text>
            <Text style={styles.statValue} numberOfLines={1}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionHeader: {
    ...Theme.typography.sectionTitle,
    marginBottom: 14,
    color: Theme.colors.textSecondary,
    fontSize: 13,
    letterSpacing: 1.2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '31%',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTag: {
    fontSize: 9,
    fontWeight: '800',
    color: Theme.colors.accentLight,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Theme.colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
