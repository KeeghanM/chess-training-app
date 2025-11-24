import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Types
export type UserProfile = {
  id: string
  email: string
  name: string
  xp: number
  streak: number
  // Add other profile fields as needed
}

export type XpUpdate = {
  xp: number
  type: 'line' | 'tactic'
}

// Profile Queries
export function useProfileQueries() {
  const queryClient = useQueryClient()

  // Get user profile - typically fetched server-side and passed as props
  // This query is disabled since /api/profile only has PUT method for updates
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<UserProfile> => {
      // This endpoint only has PUT method - profile data is typically server-side
      throw new Error(
        'Profile data should be fetched server-side and passed as props',
      )
    },
    enabled: false, // Disabled since no GET route exists
  })

  // Update XP mutation
  const updateXp = useMutation({
    mutationFn: async (data: XpUpdate) => {
      await fetch('/api/profile/xp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    },
    onSuccess: () => {
      // Invalidate profile to refresh XP display
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Update streak mutation
  const updateStreak = useMutation({
    mutationFn: async () => {
      await fetch('/api/profile/streak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return {
    // Queries
    profile,

    // Mutations
    updateXp,
    updateStreak,
  }
}
