import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { analyticsService } from '@/lib/analytics/analytics.service';
import { Theme } from '@/theme';

interface CategoryFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterBarProps) {
  const handleSelect = (cat: string) => {
    onSelectCategory(cat);
    analyticsService.trackCategorySelected(cat);
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
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            isSelected={selectedCategory === cat}
            onPress={() => handleSelect(cat)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    marginBottom: 8,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});

