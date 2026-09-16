import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuthStore } from '@/store/authStore';
import { Theme } from '@/theme';

const ONBOARDING_CATEGORIES = [
  'Supercars',
  'Hypercar',
  'JDM',
  'Muscle',
  'Sports',
  'Luxury',
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Supercars');
  const setOnboardingCompleted = useAuthStore(
    (state) => state.setOnboardingCompleted
  );

  const handleFinish = () => {
    setOnboardingCompleted(name, selectedCategory);
    router.replace('/');
  };

  const scrollPadding = {
    paddingTop: insets.top > 0 ? insets.top + 20 : 50,
    paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 36,
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, scrollPadding]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Badge */}
        <View style={styles.brandBadge}>
          <Text style={styles.brandBadgeText}>WELCOME TO CARVAULT</Text>
        </View>

        <Text style={styles.heroTitle}>Tailor your{'\n'}showroom.</Text>
        <Text style={styles.subtitle}>
          Personalize your digital garage to highlight the high-performance machines you revere.
        </Text>

        {/* Step 1: Name Input */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>QUESTION 01</Text>
          <Text style={styles.questionTitle}>What should we call you?</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name or driver handle"
            placeholderTextColor={Theme.colors.textMuted}
            style={styles.textInput}
            autoCapitalize="words"
            selectionColor={Theme.colors.accentLight}
          />
        </View>

        {/* Step 2: Car Preference */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>QUESTION 02</Text>
          <Text style={styles.questionTitle}>What type of cars do you like?</Text>
          <View style={styles.categoriesGrid}>
            {ONBOARDING_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.catPill,
                    isSelected ? styles.catPillSelected : styles.catPillDefault,
                  ]}
                >
                  <Text
                    style={[
                      styles.catText,
                      isSelected ? styles.catTextSelected : styles.catTextDefault,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <PrimaryButton
            title="Enter Showroom"
            onPress={handleFinish}
            size="lg"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  brandBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.accentMuted,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
    marginBottom: 16,
  },
  brandBadgeText: {
    ...Theme.typography.brandBadge,
  },
  heroTitle: {
    ...Theme.typography.hero,
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    ...Theme.typography.body,
    marginBottom: 28,
  },
  sectionCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginBottom: 20,
    ...Theme.shadows.card,
  },
  sectionLabel: {
    ...Theme.typography.metadata,
    fontSize: 10,
    color: Theme.colors.accentLight,
    marginBottom: 6,
  },
  questionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Theme.colors.textPrimary,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  textInput: {
    backgroundColor: Theme.colors.surfaceInput,
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.textPrimary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Theme.radius.full,
    borderWidth: 1,
  },
  catPillDefault: {
    backgroundColor: Theme.colors.surfaceElevated,
    borderColor: Theme.colors.border,
  },
  catPillSelected: {
    backgroundColor: Theme.colors.accent,
    borderColor: Theme.colors.accentLight,
    shadowColor: Theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
  },
  catTextDefault: {
    color: Theme.colors.textSecondary,
  },
  catTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  actionSection: {
    marginTop: 12,
  },
});
