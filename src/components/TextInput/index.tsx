/* eslint-disable prettier/prettier */
import {
  ComponentProps,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

export interface TextInputRootsProps {
  children: ReactNode
  erros?: boolean
}
export interface TextInputIconProps
  extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}
export interface TextInputInputProps
  // eslint-disable-next-line prettier/prettier
  extends InputHTMLAttributes<HTMLInputElement> {

}
interface IInputProps extends ComponentProps<'input'> { }
function TextInputRoot(props: TextInputRootsProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 py-4 px-3 h-14 rounded-lg w-full bg-gray-500',
        'focus-within:ring-1 ring-gray-500',
        {
          'border-2 border-danger': props.erros === true,
        },
      )}
    >
      {props.children}
    </div>
  )
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6 text-gray-300">{children}</Slot>
}

/* function TextInputInput(props: TextInputInputProps) {
  return (
    <input
      className={clsx(
        'bg-transparent flex-1 outline-none text-gray-100 text-sx placeholder:text-gray-300 focus:text-gray-100 ',
      )}
      {...props}
    />
  )
} */
const TextInputInput = forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => (
    <input
      ref={ref}
      className={clsx(
        'bg-transparent flex-1 outline-none text-gray-100 text-sx placeholder:text-gray-300 focus:text-gray-100 ',
      )}
      {...props}
    />
  ),
)
TextInputRoot.displayName = 'TextInput.Root'
TextInputIcon.displayName = 'TextInput.Icon'
TextInputInput.displayName = 'TextInput.Input'
export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
}
