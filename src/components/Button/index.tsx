import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonIconProps {
  children: ReactNode
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

function ButtonIcon({ children }: ButtonIconProps) {
  return <Slot className="w-5 h-5">{children}</Slot>
}
function ButtonRoot({
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex  justify-center items-center gap-2 transition-colors disabled:opacity-50 ',
        {
          'w-6 h-6 rounded hover:bg-gray-400 hover:text-danger': size === 'sm',
          'w-24 h-14 bg-blue-dark  hover:bg-blue rounded-lg disabled:bg-blue-dark disabled:cursor-not-allowed':
            size === 'md',
          'w-full h-14 bg-blue-dark  hover:bg-blue rounded-lg disabled:bg-blue-dark disabled:cursor-not-allowed':
            size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

ButtonRoot.displayName = 'ButtonRoot.Root'
ButtonIcon.displayName = 'ButtonRoot.Icon'
export const Button = {
  Root: ButtonRoot,
  Icon: ButtonIcon,
}
