import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/signin?callbackUrl=/profile')
  }

  return (
    <div className="p-4">
      <h1>Welcome, {session.user.name}</h1>
    </div>
  )
}
