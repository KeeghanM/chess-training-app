import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types for the store
interface UserPreferences {
  soundEnabled: boolean
  autoNext: boolean
  theme: 'light' | 'dark' | 'system'
}

interface AppStore {
  // User preferences (persisted)
  preferences: UserPreferences
  setPreferences: (preferences: Partial<UserPreferences>) => void
  setSoundEnabled: (enabled: boolean) => void
  setAutoNext: (enabled: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

const initialPreferences: UserPreferences = {
  soundEnabled: true,
  autoNext: false,
  theme: 'system',
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        preferences: initialPreferences,
        setPreferences: (newPreferences) =>
          set(
            (state) => ({
              preferences: { ...state.preferences, ...newPreferences },
            }),
            false,
            'setPreferences',
          ),
        setSoundEnabled: (enabled) =>
          set(
            (state) => ({
              preferences: { ...state.preferences, soundEnabled: enabled },
            }),
            false,
            'setSoundEnabled',
          ),
        setAutoNext: (enabled) =>
          set(
            (state) => ({
              preferences: { ...state.preferences, autoNext: enabled },
            }),
            false,
            'setAutoNext',
          ),
        setTheme: (theme) =>
          set(
            (state) => ({
              preferences: { ...state.preferences, theme },
            }),
            false,
            'setTheme',
          ),
      }),
      {
        name: 'chess-training-app-store',
        partialize: (state) => ({ preferences: state.preferences }),
      },
    ),
    {
      name: 'chess-training-app-store',
    },
  ),
)
