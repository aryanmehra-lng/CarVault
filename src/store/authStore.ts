import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { analyticsService } from '@/lib/analytics/analytics.service';
import { useSavedCarsStore } from '@/store/savedCarsStore';

export interface User {
  id: string;
  name: string;
  email: string;
  preferredCategory?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  hasCompletedOnboarding: boolean;
  preferredCategory: string;
  setHasHydrated: (state: boolean) => void;
  setOnboardingCompleted: (name: string, preferredCategory: string) => void;
  setPreferredCategory: (category: string) => void;
  signup: (name: string, email: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      hasCompletedOnboarding: false,
      preferredCategory: 'All',
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setOnboardingCompleted: (name: string, preferredCategory: string) => {
        const trimmedName = name.trim() || 'Driver';
        analyticsService.track('onboarding_completed', {
          name: trimmedName,
          preferred_category: preferredCategory,
        });
        const currentUser = get().user;
        set({
          hasCompletedOnboarding: true,
          preferredCategory,
          user: currentUser
            ? { ...currentUser, name: trimmedName, preferredCategory }
            : null,
        });
      },
      setPreferredCategory: (preferredCategory: string) => {
        set({ preferredCategory });
        const user = get().user;
        if (user) {
          set({ user: { ...user, preferredCategory } });
        }
      },
      signup: (name: string, email: string) => {
        const preferredCategory = get().preferredCategory || 'All';
        const newUser: User = {
          id: Date.now().toString(),
          name: name.trim() || 'Car Enthusiast',
          email: email.trim(),
          preferredCategory,
        };
        analyticsService.trackUserSignedUp(newUser.id, {
          name: newUser.name,
          email: newUser.email,
        });
        set({
          user: newUser,
          isAuthenticated: true,
          hasCompletedOnboarding: true,
        });
      },
      login: (email: string, name?: string) => {
        const derivedName =
          name?.trim() ||
          email.split('@')[0].replace(/[._-]/g, ' ') ||
          'Driver';
        const preferredCategory = get().preferredCategory || 'All';
        const loggedInUser: User = {
          id: Date.now().toString(),
          name: derivedName,
          email: email.trim(),
          preferredCategory,
        };
        analyticsService.trackUserLoggedIn(loggedInUser.id, {
          name: loggedInUser.name,
          email: loggedInUser.email,
        });
        set({
          user: loggedInUser,
          isAuthenticated: true,
          hasCompletedOnboarding: true,
        });
      },
      logout: async () => {
        analyticsService.trackUserLoggedOut();
        // Reset saved cars in-memory store so the previous user's garage is cleared
        useSavedCarsStore.getState().clearSavedCars();
        // Completely clear AsyncStorage so no two users share persisted data
        try {
          await AsyncStorage.clear();
        } catch (error) {
          console.warn('[authStore] Error clearing AsyncStorage on logout:', error);
        }
        // Reset auth state in-memory
        set({
          user: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
          preferredCategory: 'All',
        });
      },
    }),
    {
      name: 'carvault-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        if (state?.user) {
          analyticsService.identify(state.user.id, {
            name: state.user.name,
            email: state.user.email,
          });
        }
      },
    }
  )
);
