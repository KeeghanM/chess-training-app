export default function Container({
  children,
  size = 'default',
  className
}: {
  children: React.ReactNode
  size?: 'default' | 'wide' | 'extra-wide'
  className?:string
}) {
  return (
    <div
      className={`relative mx-auto py-2 md:py-4 md:px-2 lg:py-6 ${size == 'default' && 'max-w-[min(calc(100vw-0.5rem),90ch)]'} ${
        size === 'wide' && 'max-w-[min(calc(100vw-0.5rem),120ch)]'
      } ${size === 'extra-wide' && 'max-w-[min(calc(100vw-0.5rem),70vw)]'} ${className}`}
    >
      {children}
    </div>
  )
}
