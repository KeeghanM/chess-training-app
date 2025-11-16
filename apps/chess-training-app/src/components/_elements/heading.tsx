/**
 * Render a heading element at the specified level with preset styling.
 *
 * @param children - Content to be rendered inside the heading element
 * @param as - Heading level to render; accepted values are 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
 * @param className - Optional additional CSS classes to append to the predefined styles
 * @param id - Optional id attribute applied to the rendered heading element
 * @returns The corresponding heading JSX element (`h1`–`h4`) with merged classes and optional `id`, or `undefined` if `as` is not handled
 */
export default function Heading({
  children,
  as,
  className,
  id,
}: {
  children: React.ReactNode
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  id?: string
}) {
  switch (as) {
    case 'h1':
      return (
        <h1
          id={id}
          className={`text-4xl font-bold md:text-6xl flex items-center gap-1 flex-wrap ${className}`}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 id={id} className={`text-2xl md:text-3xl ${className}`}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 id={id} className={`text-xl font-bold md:text-2xl ${className}`}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h4 id={id} className={`text-xl font-bold  md:text-lg ${className}`}>
          {children}
        </h4>
      )
  }
}
