import * as CheckboxPrimiteve from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
export interface CheckboxProps extends CheckboxPrimiteve.CheckboxProps {}
export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimiteve.Root
      className="w-6 h-6  border-blue border-2 rounded-full"
      {...props}
    >
      <CheckboxPrimiteve.Indicator asChild>
        <Check
          weight="bold"
          className="h-6 w-6  -ml-0.5 -mt-0.5 text-gray-100 bg-blue-dark border-2  border-blue-dark rounded-full"
        />
      </CheckboxPrimiteve.Indicator>
    </CheckboxPrimiteve.Root>
  )
}
