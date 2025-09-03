import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Types for the store
interface UserPreferences {
  soundEnabled: boolean
  autoNext: boolean
  theme: 'light' | 'dark' | 'system'
}

interface UiState {
  loading: boolean
  modals: {
    premiumSubscribe: boolean
    // Add other modals as needed
  }
  errors: {
    general: string | null
    // Add specific error types as needed
  }
}

interface AppStore {
  // User preferences (persisted)
  preferences: UserPreferences
  setPreferences: (preferences: Partial<UserPreferences>) => void
  setSoundEnabled: (enabled: boolean) => void
  setAutoNext: (enabled: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void

  // UI state (not persisted)
  ui: UiState
  setLoading: (loading: boolean) => void
  setModal: (modal: keyof UiState['modals'], open: boolean) => void
  setError: (error: keyof UiState['errors'], message: string | null) => void
  clearErrors: () => void

  // Reset functions
  resetUi: () => void
}

const initialPreferences: UserPreferences = {
  soundEnabled: true,
  autoNext: false,
  theme: 'system',
}

const initialUiState: UiState = {
  loading: false,
  modals: {
    premiumSubscribe: false,
  },
  errors: {
    general: null,
  },
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        // Preferences (persisted)
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

        // UI state (not persisted)
        ui: initialUiState,
        setLoading: (loading) =>
          set(
            (state) => ({
              ui: { ...state.ui, loading },
            }),
            false,
            'setLoading',
          ),
        setModal: (modal, open) =>
          set(
            (state) => ({
              ui: {
                ...state.ui,
                modals: { ...state.ui.modals, [modal]: open },
              },
            }),
            false,
            'setModal',
          ),
        setError: (error, message) =>
          set(
            (state) => ({
              ui: {
                ...state.ui,
                errors: { ...state.ui.errors, [error]: message },
              },
            }),
            false,
            'setError',
          ),
        clearErrors: () =>
          set(
            (state) => ({
              ui: { ...state.ui, errors: initialUiState.errors },
            }),
            false,
            'clearErrors',
          ),

        // Reset functions
        resetUi: () =>
          set(
            () => ({
              ui: initialUiState,
            }),
            false,
            'resetUi',
          ),
      }),
      {
        name: 'chess-training-app-store',
        // Only persist preferences, not UI state
        partialize: (state) => ({ preferences: state.preferences }),
      },
    ),
    {
      name: 'chess-training-app-store',
    },
  ),
)
