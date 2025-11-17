import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="text-sm text-gray-400 mb-6">
        Sorry, we couldn’t locate that page.
      </p>
      <Link href="/" className="text-primary hover:underline">
        Go back home
      </Link>
    </div>
  )
}
