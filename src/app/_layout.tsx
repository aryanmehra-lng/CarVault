import '@/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PostHogProvider } from 'posthog-react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { posthog } from '@/lib/analytics/posthog';
import { useAuthStore } from '@/store/authStore';
import { Theme } from '@/theme';

const queryClient = new QueryClient();

const STACK_SCREEN_OPTIONS = {
  headerShown: false,
  contentStyle: { backgroundColor: Theme.colors.background },
  animation: 'fade' as const,
};

function RootNavigation() {
  const { isAuthenticated, hasHydrated, hasCompletedOnboarding } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;

    const currentSegment = segments[0] ?? '';
    const onAuthScreen = currentSegment === 'signup' || currentSegment === 'login';
    const onOnboardingScreen = currentSegment === 'onboarding';

    if (!hasCompletedOnboarding && !onOnboardingScreen) {
      router.replace('/onboarding');
    } else if (hasCompletedOnboarding && !isAuthenticated && !onAuthScreen) {
      router.replace('/login');
    } else if (isAuthenticated && (onAuthScreen || onOnboardingScreen)) {
      router.replace('/');
    }
  }, [isAuthenticated, hasCompletedOnboarding, hasHydrated, segments, router]);

  if (!hasHydrated) {
    return (
      <View style={styles.hydrationContainer}>
        <ActivityIndicator size="large" color={Theme.colors.accentLight} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={STACK_SCREEN_OPTIONS}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="car/[id]" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="explore" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <PostHogProvider client={posthog}>
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </PostHogProvider>
  );
}

const styles = StyleSheet.create({
  hydrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.background,
  },
});