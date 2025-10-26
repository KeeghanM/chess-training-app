'use client'

interface ButtonProps {
  onClick?: () => void
  variant?:
    | 'default'
    | 'primary'
    | 'accent'
    | 'dark'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'ghost'
    | 'link'
  disabled?: boolean
  children: React.ReactNode
  id?: string
  className?: string
  shadow?: 'sm' | 'lg' | 'xl' | 'inset-sm' | 'inset-lg' | 'inset-xl'
  type?: 'button' | 'submit'
}
/**
 * Renders a styled button element with configurable visual variant and behavior.
 *
 * @param id - Optional id attribute for the button.
 * @param variant - Visual style variant to apply (default, primary, accent, dark, tertiary, danger, warning, success, info, ghost, link).
 * @param disabled - When true, disables interaction and applies disabled styling.
 * @param className - Additional CSS classes to merge with the component's default classes.
 * @param onClick - Optional click event handler.
 * @param children - Content to render inside the button.
 * @param type - Button type attribute ('button' or 'submit').
 * @returns The rendered button element.
 */
export default function Button({
  id,
  variant = 'default',
  disabled,
  className,
  onClick,
  children,
  type = 'button',
}: ButtonProps) {
  const styles = {
    default: 'bg-card-light border-card border-1 hover:bg-card-dark text-black',
    primary: 'bg-primary hover:bg-primary-dark text-white ',
    accent: 'bg-accent hover:bg-accent-dark text-white',
    dark: 'bg-card-dark hover:bg-card-dark/50 text-black',
    tertiary: 'bg-none text-bg-light hover:bg-primary/20',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-400 text-black',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    info: 'bg-blue-600 hover:bg-blue-500 text-white',
    ghost: 'bg-none border-none !p-0 shadow-none',
    link: 'bg-none border-none flex-none !p-0 hover:underline',
  }

  return (
    <button
      type={type}
      className={`cursor-pointer flex-1 w-fit min-w-fit flex items-center justify-center gap-2 text-sm rounded-full py-2 px-4 shadow ${styles[variant]} ${disabled ? ' cursor-not-allowed opacity-50 pointer-events-none' : ''} ${className}`}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  )
}