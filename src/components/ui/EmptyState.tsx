import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/theme';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionTitle?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon ? (
        <View style={styles.iconCircle}>{icon}</View>
      ) : (
        <View style={styles.defaultBadge}>
          <Text style={styles.badgeText}>CARVAULT</Text>
        </View>
      )}

      <Text style={styles.title}>{title}</Text>
      {Boolean(description) && <Text style={styles.description}>{description}</Text>}

      {Boolean(actionTitle && onAction) && (
        <View style={styles.actionWrapper}>
          <PrimaryButton
            title={actionTitle!}
            onPress={onAction!}
            variant="secondary"
            size="sm"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  defaultBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.accentMuted,
    borderWidth: 1,
    borderColor: Theme.colors.accent,
    marginBottom: 16,
  },
  badgeText: {
    ...Theme.typography.brandBadge,
    fontSize: 10,
  },
  title: {
    ...Theme.typography.screenTitle,
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    ...Theme.typography.body,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  actionWrapper: {
    marginTop: 20,
  },
});
