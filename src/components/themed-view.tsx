import { StyleSheet, View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { Theme } from '@/theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, type, ...otherProps }: ThemedViewProps) {
  const bgStyle = styles[type ?? 'background'] ?? styles.background;
  return <View style={[bgStyle, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Theme.colors.background,
  },
  backgroundElement: {
    backgroundColor: Theme.colors.surface,
  },
  backgroundSelected: {
    backgroundColor: Theme.colors.surfaceElevated,
  },
  text: {
    backgroundColor: Theme.colors.textPrimary,
  },
  textSecondary: {
    backgroundColor: Theme.colors.textSecondary,
  },
  tint: {
    backgroundColor: Theme.colors.accent,
  },
});
