import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ResponseJson } from '~/app/api/responses'

// Types
export interface UserProfile {
  id: string
  email: string
  name: string
  xp: number
  streak: number
  // Add other profile fields as needed
}

export interface XpUpdate {
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
      throw new Error('Profile data should be fetched server-side and passed as props')
    },
    enabled: false, // Disabled since no GET route exists
  })

  // Update XP mutation
  const updateXp = useMutation({
    mutationFn: async (data: XpUpdate): Promise<void> => {
      const response = await fetch('/api/profile/xp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'XP added') {
        throw new Error(json.message || 'Failed to update XP')
      }
    },
    onSuccess: () => {
      // Invalidate profile to refresh XP display
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  // Update streak mutation
  const updateStreak = useMutation({
    mutationFn: async (): Promise<void> => {
      const response = await fetch('/api/profile/streak', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const json = (await response.json()) as ResponseJson
      
      if (!response.ok || json.message !== 'Streak updated') {
        throw new Error(json.message || 'Failed to update streak')
      }
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
