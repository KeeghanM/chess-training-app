'use client'

interface ButtonProps {
  onClick?: () => void
  variant:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
  disabled?: boolean
  children: React.ReactNode
  id?: string
  className?: string
}
export default function Button(props: ButtonProps) {
  const styles = {
    primary:
      'bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-6 shadow',
    secondary:
      'bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 shadow',
    accent:
      'bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-6 shadow',
    tertiary:
      'bg-none underline text-gray-700 hover:text-purple-700 font-bold py-2 px-6 ',
    danger: 'bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-6 shadow',
    warning:
      'bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 shadow',
    success:
      'bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-6 shadow',
    info: 'bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 shadow',
  }

  return (
    <button
      id={props.id}
      className={
        'flex min-w-[145px] items-center justify-center gap-2 text-sm ' +
        styles[props.variant] +
        (props.disabled
          ? ' cursor-not-allowed opacity-50 pointer-events-none'
          : '') +
        (props.className ? ' ' + props.className : '')
      }
      onClick={props.onClick ? props.onClick : undefined}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
