import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '@/theme';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  count?: number;
}

export function CategoryChip({
  label,
  isSelected,
  onPress,
  count,
}: CategoryChipProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.chip,
        isSelected ? styles.chipSelected : styles.chipDefault,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text
        style={[
          styles.label,
          isSelected ? styles.labelSelected : styles.labelDefault,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {typeof count === 'number' && (
        <View
          style={[
            styles.countBadge,
            isSelected ? styles.countBadgeSelected : styles.countBadgeDefault,
          ]}
        >
          <Text
            style={[
              styles.countText,
              isSelected ? styles.countTextSelected : styles.countTextDefault,
            ]}
          >
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  chipDefault: {
    backgroundColor: Theme.colors.surface,
    borderColor: Theme.colors.border,
  },
  chipSelected: {
    backgroundColor: Theme.colors.accent,
    borderColor: Theme.colors.accentLight,
    shadowColor: Theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    letterSpacing: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexShrink: 0,
  },
  labelDefault: {
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
  labelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeDefault: {
    backgroundColor: Theme.colors.surfaceElevated,
  },
  countBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  countTextDefault: {
    color: Theme.colors.textMuted,
  },
  countTextSelected: {
    color: '#FFFFFF',
  },
});
