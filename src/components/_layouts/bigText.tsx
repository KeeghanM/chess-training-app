interface BigTextProps {
  color: 'primary' | 'secondary' | 'accent'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export default function BigText(props: BigTextProps) {
  const colourString = {
    primary: 'bg-purple-700',
    secondary: 'bg-gray-700',
    accent: 'bg-orange-500',
  }
  return (
    <div
      className={
        'flex w-full items-center justify-center ' + colourString[props.color]
      }
    >
      <p
        className={
          'px-4 py-6 text-center font-bold !leading-none text-white md:px-6 md:py-12' +
          (props.size === 'small'
            ? ' text-xl md:text-3xl'
            : props.size === 'medium'
              ? ' text-2xl md:text-4xl'
              : ' text-3xl md:text-5xl lg:px-12')
        }
      >
        {props.children}
      </p>
    </div>
  )
}
