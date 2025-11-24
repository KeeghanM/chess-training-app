import Container from '@components/_elements/container'

type BigTextProps = {
  color?: 'accent' | 'dark'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export default function BigText({ color, size, children }: BigTextProps) {
  const colourString = {
    accent: 'bg-primary',
    dark: 'bg-bg-light',
  }

  return (
    <div
      className={
        'flex w-full items-center justify-center py-12 md:py-16 ' +
        colourString[color ?? 'dark']
      }
    >
      <Container>
        <p
          className={
            'text-center font-bold leading-tight! text-white' +
            (size === 'small'
              ? ' text-xl md:text-2xl'
              : size === 'medium'
                ? ' text-xl md:text-3xl'
                : ' text-xl md:text-3xl lg:text-4xl')
          }
        >
          {children}
        </p>
      </Container>
    </div>
  )
}
