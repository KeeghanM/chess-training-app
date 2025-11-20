import React from 'react'

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AccountForm from '../AccountForm'

// Mock dependencies
jest.mock('@kinde-oss/kinde-auth-nextjs', () => ({
  useKindeBrowserClient: jest.fn(),
}))

jest.mock('posthog-js', () => ({
  captureException: jest.fn(),
}))

// Mock next/link to avoid errors
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children
  }
})

// Mock Spinner to avoid animation issues in tests
jest.mock('@components/general/Spinner', () => () => (
  <div data-testid="spinner">Loading...</div>
))

describe('Account Editing', () => {
  const mockUser = {
    email: 'test@example.com',
    id: 'user_123',
  }

  const mockProfile = {
    id: 'user_123',
    username: 'testuser',
    fullName: 'Test User',
    description: 'A test bio',
    highestOnlineRating: 1200,
    highestOTBRating: 1000,
    puzzleRating: 1500,
    difficulty: 1,
    public: false,
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    stripeCustomerId: null,
    subscriptionStatus: null,
    subscriptionId: null,
    lastLogin: new Date(),
    experience: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastTrained: new Date(),
    isAdmin: false,
    isPremium: false,
    lastIncrement: new Date(),
    hasPremium: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useKindeBrowserClient as jest.Mock).mockReturnValue({
      user: mockUser,
    })
    global.fetch = jest.fn()
  })

  it('allows a user to view their current profile details', () => {
    render(<AccountForm profile={mockProfile} />)

    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser')
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Test User')
    expect(screen.getByLabelText(/puzzle rating/i)).toHaveValue(1500)
  })

  it('prevents saving when required information is missing', async () => {
    render(<AccountForm profile={mockProfile} />)

    const usernameInput = screen.getByLabelText(/username/i)
    const saveButton = screen.getByRole('button', { name: /save/i })

    await userEvent.clear(usernameInput)
    await userEvent.click(saveButton)

    expect(
      screen.getByText(/username must be at least 5 characters/i),
    ).toBeInTheDocument()
  })

  it('validates that puzzle ratings are within acceptable bounds', async () => {
    render(<AccountForm profile={mockProfile} />)

    const ratingInput = screen.getByLabelText(/puzzle rating/i)

    await userEvent.clear(ratingInput)
    fireEvent.change(ratingInput, { target: { value: '100' } })

    await waitFor(() => expect(ratingInput).toHaveValue(100))

    fireEvent.submit(screen.getByTestId('account-form'))

    await waitFor(() => {
      expect(
        screen.getByText(/puzzle rating must be at least 500/i),
      ).toBeInTheDocument()
    })
  })

  it('successfully updates the profile when valid data is entered', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Profile Updated' }),
    })

    render(<AccountForm profile={mockProfile} />)

    const usernameInput = screen.getByLabelText(/username/i)
    const saveButton = screen.getByRole('button', { name: /save/i })

    await userEvent.clear(usernameInput)
    await userEvent.type(usernameInput, 'newusername')
    await userEvent.click(saveButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/profile',
        expect.objectContaining({
          method: 'PUT',
          body: expect.stringContaining('"username":"newusername"'),
        }),
      )
    })

    expect(screen.getByText(/saved!/i)).toBeInTheDocument()
  })

  it('informs the user when the update fails due to server error', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Something went wrong' }),
    })

    render(<AccountForm profile={mockProfile} />)

    const saveButton = screen.getByRole('button', { name: /save/i })
    await userEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
