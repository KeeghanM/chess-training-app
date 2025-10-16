'use client'

import { useState } from 'react'

type KindeUser = {
  id: string
  email?: string | null
  given_name?: string | null
  family_name?: string | null
}

export default function UserAdminTool() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function findUser() {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/tools/find-user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const json = await res.json()
      setResult(json.data?.users ?? json)
    } catch (e: any) {
      setMessage(String(e?.message ?? e))
    } finally {
      setLoading(false)
    }
  }

  async function runAction(path: string, body: Record<string, unknown>) {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) setMessage(json.message || 'Error')
      else setMessage(json.message || 'Done')
    } catch (e: any) {
      setMessage(String(e?.message ?? e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="prose">
      <div>
        <label className="block">Search user by email</label>
        <input
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />
        <div className="mt-2">
          <button
            className="btn"
            onClick={findUser}
            disabled={loading || !email}
          >
            Search
          </button>
        </div>
      </div>

      {message && <div className="mt-4">{message}</div>}

      {result && (
        <div className="mt-4">
          <h3>Results</h3>
          <pre className="p-2 bg-slate-100 rounded">
            {JSON.stringify(result, null, 2)}
          </pre>
          {/* Show first user option to run actions */}
          {Array.isArray(result) && result.length > 0 && (
            <UserActions user={result[0] as KindeUser} runAction={runAction} />
          )}
        </div>
      )}
    </div>
  )
}

function UserActions({ user, runAction }: { user: KindeUser; runAction: any }) {
  const userId = user?.id
  const [setId, setSetId] = useState('')
  const [courseId, setCourseId] = useState('')

  return (
    <div className="mt-4">
      <div>User ID: {userId}</div>

      <div className="mt-2">
        <label>Curated set id</label>
        <input
          value={setId}
          onChange={(e) => setSetId(e.target.value)}
          className="border p-1"
        />
        <div className="mt-1 space-x-2">
          <button
            className="btn"
            onClick={() =>
              runAction('/api/admin/tools/add-curated-set', { setId, userId })
            }
            disabled={!setId}
          >
            Add curated set
          </button>
          <button
            className="btn"
            onClick={() =>
              runAction('/api/admin/tools/remove-curated-set', {
                setId,
                userId,
              })
            }
            disabled={!setId}
          >
            Remove curated set
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label>Course id</label>
        <input
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border p-1"
        />
        <div className="mt-1 space-x-2">
          <button
            className="btn"
            onClick={() =>
              runAction('/api/admin/tools/add-course', { courseId, userId })
            }
            disabled={!courseId}
          >
            Add course
          </button>
          <button
            className="btn"
            onClick={() =>
              runAction('/api/admin/tools/remove-course', { courseId, userId })
            }
            disabled={!courseId}
          >
            Remove course
          </button>
        </div>
      </div>
    </div>
  )
}
