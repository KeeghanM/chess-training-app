import Link from 'next/link'

type LinkProps = {
  href: string
  children: React.ReactNode
}
export default function StyledLink({ href, children }: LinkProps) {
  return (
    <Link
      href={href}
      className="font-bold text-black underline hover:no-underline"
    >
      {children}
    </Link>
  )
}
