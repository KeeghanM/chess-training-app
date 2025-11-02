export default function Container({
  children,
  size = 'default',
  className,
}: {
  children: React.ReactNode
  size?: 'default' | 'wide' | 'extra-wide' | 'full'
  className?: string
}) {
  return (
    <div
      className={`relative mx-auto p-2 md:p-4 lg:p-6 ${size == 'default' && 'max-w-[min(calc(100vw-0.5rem),90ch)]'} ${
        size === 'wide' && 'max-w-[min(calc(100vw-0.5rem),120ch)]'
      } ${size === 'extra-wide' && 'lg:max-w-[min(calc(100vw-0.5rem),70vw)]'} ${className} ${size === 'full' && 'lg:max-w-[calc(100vw-0.5rem)]'}`}
    >
      {children}
    </div>
  )
}
