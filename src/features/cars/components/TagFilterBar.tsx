import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TagIcon } from '@/components/ui/Icons';
import { analyticsService } from '@/lib/analytics/analytics.service';
import { Theme } from '@/theme';

interface TagFilterBarProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export function TagFilterBar({
  tags,
  selectedTag,
  onSelectTag,
}: TagFilterBarProps) {
  const handleSelect = (tag: string) => {
    // Tapping the active tag toggles it back to All
    const nextTag = selectedTag === tag ? 'All' : tag;
    onSelectTag(nextTag);
    analyticsService.track('tag_filter_selected', { tag: nextTag });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        overScrollMode="never"
      >
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <TouchableOpacity
              key={tag}
              activeOpacity={0.75}
              onPress={() => handleSelect(tag)}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipDefault,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`Filter by ${tag}`}
            >
              <View style={styles.tagIconWrapper}>
                <TagIcon
                  color={isSelected ? '#FFFFFF' : Theme.colors.accentLight}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  isSelected ? styles.labelSelected : styles.labelDefault,
                ]}
                numberOfLines={1}
              >
                {tag === 'All' ? 'All Specs' : tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    marginBottom: 14,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 6,
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  chipDefault: {
    backgroundColor: Theme.colors.surfaceElevated,
    borderColor: Theme.colors.border,
  },
  chipSelected: {
    backgroundColor: Theme.colors.accent,
    borderColor: Theme.colors.accentLight,
    shadowColor: Theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  tagIconWrapper: {
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    letterSpacing: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexShrink: 0,
  },
  labelDefault: {
    color: Theme.colors.textMuted,
    fontWeight: '600',
  },
  labelSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
