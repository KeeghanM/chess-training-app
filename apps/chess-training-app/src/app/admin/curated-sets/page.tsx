import { redirect } from 'next/navigation'

import { prisma } from '@server/db'

import CuratedSetsBrowser from '@components/admin/curatedSets/CuratedSetsBrowser'

import { getUserServer } from '@utils/get-user-server'

export default async function CuratedSetsPage() {
  const { user, isStaff } = await getUserServer()
  if (!user) redirect('/auth/signin')
  if (!isStaff) redirect('/dashboard')

  const sets = await prisma.curatedSet.findMany()

  return (
    <div className="">
      <CuratedSetsBrowser sets={sets} />
    </div>
  )
}
