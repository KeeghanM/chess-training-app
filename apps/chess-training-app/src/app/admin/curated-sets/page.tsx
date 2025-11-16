import { redirect } from 'next/navigation'
import CuratedSetsBrowser from '@components/admin/curatedSets/CuratedSetsBrowser'
import { prisma } from '~/server/db'
import { getUserServer } from '~/utils/getUserServer'

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
