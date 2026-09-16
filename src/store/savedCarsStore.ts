import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SavedCarsState {
  savedCarIds: number[];

  saveCar: (carId: number) => void;
  unsaveCar: (carId: number) => void;
  toggleSaveCar: (carId: number) => void;
  isSaved: (carId: number) => boolean;
  clearSavedCars: () => void;
}

export const useSavedCarsStore = create<SavedCarsState>()(
  persist(
    (set, get) => ({
      savedCarIds: [],

      saveCar: (carId) =>
        set((state) => {
          const current = state.savedCarIds ?? [];
          return {
            savedCarIds: current.includes(carId) ? current : [...current, carId],
          };
        }),

      unsaveCar: (carId) =>
        set((state) => ({
          savedCarIds: (state.savedCarIds ?? []).filter((id) => id !== carId),
        })),

      toggleSaveCar: (carId) => {
        const current = get().savedCarIds ?? [];
        if (current.includes(carId)) {
          set({ savedCarIds: current.filter((id) => id !== carId) });
        } else {
          set({ savedCarIds: [...current, carId] });
        }
      },

      isSaved: (carId) => (get().savedCarIds ?? []).includes(carId),

      clearSavedCars: () => set({ savedCarIds: [] }),
    }),
    {
      name: 'carvault-saved-cars-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
