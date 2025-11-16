'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

export default function MemberSearch() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/members/search?username=${encodeURIComponent(username.trim())}`,
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'An error occurred')
        setLoading(false)
        return
      }

      // Incase we're already on the page
      setLoading(false)
      // Redirect to the page with the highlight parameter
      router.push(
        `/members/page/${data.page}?highlight=${encodeURIComponent(data.username)}`,
      )
    } catch {
      setError('Failed to search. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError(null)
            }}
            placeholder="Search for your username..."
            className="flex-1 px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </div>
  )
}
