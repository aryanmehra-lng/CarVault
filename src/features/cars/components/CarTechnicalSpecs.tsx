import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/theme';
import type { CarDetail } from '@/types/car';

interface CarTechnicalSpecsProps {
  car: CarDetail;
}

export function CarTechnicalSpecs({ car }: CarTechnicalSpecsProps) {
  const specs = car.specs ?? {};

  const specRows = [
    {
      label: 'Length',
      value: specs.length_mm?.v ? `${specs.length_mm.v} mm` : null,
    },
    {
      label: 'Width',
      value: specs.width_mm?.v ? `${specs.width_mm.v} mm` : null,
    },
    {
      label: 'Height',
      value: specs.height_mm?.v ? `${specs.height_mm.v} mm` : null,
    },
    {
      label: 'Wheelbase',
      value: specs.wheelbase_mm?.v ? `${specs.wheelbase_mm.v} mm` : null,
    },
    {
      label: 'Kerb Weight',
      value: specs.kerb_weight_kg?.v ? `${specs.kerb_weight_kg.v} kg` : null,
    },
    {
      label: 'Fuel Tank Capacity',
      value: specs.fuel_tank_l?.v ? `${specs.fuel_tank_l.v} L` : null,
    },
    {
      label: 'Boot Capacity',
      value: specs.boot_capacity_l?.v ? `${specs.boot_capacity_l.v} L` : null,
    },
    {
      label: 'Fuel System',
      value: specs.fuel_system?.v ? String(specs.fuel_system.v) : null,
    },
    {
      label: 'Front Suspension',
      value: specs.front_suspension?.v ? String(specs.front_suspension.v) : null,
    },
    {
      label: 'Rear Suspension',
      value: specs.rear_suspension?.v ? String(specs.rear_suspension.v) : null,
    },
    {
      label: 'Braking System',
      value:
        specs.front_brakes?.v && specs.rear_brakes?.v
          ? `${specs.front_brakes.v} / ${specs.rear_brakes.v}`
          : null,
    },
    {
      label: 'Original Price (New)',
      value: car.price_new_eur ? `€${car.price_new_eur.toLocaleString()}` : null,
    },
  ].filter((row) => Boolean(row.value));

  if (specRows.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Engineering & Chassis</Text>
      <View style={styles.card}>
        {specRows.map((row, idx) => (
          <View
            key={row.label + idx}
            style={[
              styles.row,
              idx < specRows.length - 1 && styles.rowBorder,
            ]}
          >
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{row.value}</Text>
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
    paddingBottom: 24,
  },
  sectionHeader: {
    ...Theme.typography.sectionTitle,
    marginBottom: 14,
    color: Theme.colors.textSecondary,
    fontSize: 13,
    letterSpacing: 1.2,
  },
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.textPrimary,
    maxWidth: '55%',
    textAlign: 'right',
  },
});
