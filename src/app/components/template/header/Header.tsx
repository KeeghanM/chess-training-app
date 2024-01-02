import { getUserServer } from '~/app/_util/getUserServer'

import Nav from './Nav'

export default async function Header() {
  const { user, profile } = await getUserServer()

  return <Nav user={user} experience={profile?.experience ?? 0} />
}
