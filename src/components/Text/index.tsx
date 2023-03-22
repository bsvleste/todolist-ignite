import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

export interface TextProps {
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  asChild?: boolean
  className?: string
  isDone?: boolean
}

export function Text({
  size = 'md',
  children,
  asChild,
  className,
  isDone = false,
}: TextProps) {
  const Comp = asChild ? Slot : 'span'
  return (
    <Comp
      className={clsx(
        'font-sans',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
          'line-through': isDone,
        },
        className,
      )}
    >
      {children}
    </Comp>
  )
}
