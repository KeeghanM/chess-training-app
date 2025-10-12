'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import StyledLink from '~/components/_elements/styledLink'
import CalculateXpRank from '~/utils/CalculateXpRank'

// Adjust import path as needed

type Member = {
  id: string
  username: string
  experience: number
  public: boolean
}

type MembersTableProps = {
  members: Member[]
}

export default function MembersTable({ members }: MembersTableProps) {
  const searchParams = useSearchParams()
  const highlight = searchParams.get('highlight')
  const highlightRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    // Scroll to highlighted row after a short delay
    if (highlight && highlightRef.current) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 100)
    }
  }, [highlight])

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-bg-dark text-white text-xl p-2">
          <th className="py-2">Username</th>
          <th className="py-2">Experience</th>
          <th className="py-2">Rank</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => {
          const rank = CalculateXpRank(member.experience)
          const isHighlighted =
            highlight?.toLowerCase() === member.username.toLowerCase()

          return (
            <tr
              ref={isHighlighted ? highlightRef : null}
              className={
                isHighlighted
                  ? 'text-center bg-primary/10 text-white border-x-4 border-x-primary'
                  : 'text-center ' +
                    (index % 2 === 0 ? 'bg-card' : 'bg-card-light')
              }
              key={member.id}
            >
              <td className="py-2">
                {member.public ? (
                  <StyledLink href={`/members/${member.username}`}>
                    {member.username}
                  </StyledLink>
                ) : (
                  member.username
                )}
              </td>
              <td className="py-2">{member.experience.toLocaleString()}</td>
              <td className="py-2">
                <strong>{rank.rank.rank}:</strong> {rank.rank.name}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
