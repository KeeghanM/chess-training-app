'use client'

interface ButtonProps {
  onClick?: () => void
  variant?:
    | 'default'
    | 'primary'
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
  shadow?: 'sm' | 'lg' | 'xl' | 'inset-sm' | 'inset-lg' | 'inset-xl'
}
export default function Button({
  id,
  variant = 'default',
  disabled,
  className,
  onClick,
  children,
}: ButtonProps) {
  const styles = {
    default: 'bg-card-light border-card border-1 hover:bg-card-dark',
    primary: 'bg-primary hover:bg-primary-dark text-white ',
    accent: 'bg-accent hover:bg-accent-dark text-white ',
    tertiary: 'bg-none underline text-gray-700 hover:text-purple-700  ',
    danger: 'bg-red-500 hover:bg-red-600 text-white ',
    warning: 'bg-yellow-500 hover:bg-yellow-400 text-black ',
    success: 'bg-green-500 hover:bg-green-600 text-white ',
    info: 'bg-blue-600 hover:bg-blue-500 text-white ',
  }

  return (
    <button
      id={id}
      className={`cursor-pointer flex-1 w-fit flex items-center justify-center gap-2 text-sm rounded-lg py-2 px-4 ${styles[variant]} ${disabled ? ' cursor-not-allowed opacity-50 pointer-events-none' : ''} ${className}`}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
