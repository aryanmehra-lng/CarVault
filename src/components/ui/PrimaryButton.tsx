import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '@/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

export function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  testID,
}: PrimaryButtonProps) {
  const containerStyles = [
    styles.base,
    size === 'sm' && styles.sizeSm,
    size === 'md' && styles.sizeMd,
    size === 'lg' && styles.sizeLg,
    variant === 'primary' && styles.variantPrimary,
    variant === 'secondary' && styles.variantSecondary,
    variant === 'danger' && styles.variantDanger,
    variant === 'glass' && styles.variantGlass,
    variant === 'ghost' && styles.variantGhost,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.textBase,
    size === 'sm' && styles.textSizeSm,
    size === 'md' && styles.textSizeMd,
    size === 'lg' && styles.textSizeLg,
    variant === 'ghost' && styles.textGhost,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={containerStyles}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sizeSm: {
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  sizeMd: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  sizeLg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  variantPrimary: {
    backgroundColor: Theme.colors.accent,
    borderColor: Theme.colors.accentLight,
  },
  variantSecondary: {
    backgroundColor: Theme.colors.surfaceElevated,
    borderColor: Theme.colors.borderLight,
  },
  variantDanger: {
    backgroundColor: Theme.colors.heartRed,
    borderColor: '#DC2626',
  },
  variantGlass: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  variantGhost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  textBase: {
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  textSizeSm: {
    fontSize: 13,
  },
  textSizeMd: {
    fontSize: 15,
  },
  textSizeLg: {
    fontSize: 16,
  },
  textGhost: {
    color: Theme.colors.accentLight,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
});
