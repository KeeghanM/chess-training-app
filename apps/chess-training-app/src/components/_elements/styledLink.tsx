import Link from 'next/link'

interface LinkProps {
  href: string
  children: React.ReactNode
}
export default function StyledLink(props: LinkProps) {
  return (
    <Link
      href={props.href}
      className="font-bold text-black underline hover:no-underline"
    >
      {props.children}
    </Link>
  )
}
