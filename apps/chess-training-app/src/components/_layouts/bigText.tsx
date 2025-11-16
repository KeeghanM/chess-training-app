import Container from '@components/_elements/container'

interface BigTextProps {
  color?: 'accent' | 'dark'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export default function BigText(props: BigTextProps) {
  const colourString = {
    accent: 'bg-primary',
    dark: 'bg-bg-light',
  }

  return (
    <div
      className={
        'flex w-full items-center justify-center py-12 md:py-16 ' +
        colourString[props.color ?? 'dark']
      }
    >
      <Container>
        <p
          className={
            'text-center font-bold !leading-tight text-white' +
            (props.size === 'small'
              ? ' text-xl md:text-2xl'
              : props.size === 'medium'
                ? ' text-xl md:text-3xl'
                : ' text-xl md:text-3xl lg:text-4xl')
          }
        >
          {props.children}
        </p>
      </Container>
    </div>
  )
}
