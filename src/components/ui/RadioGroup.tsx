import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
  value: string
  label: string
  description?: string
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  error?: string
  className?: string
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, options, value, onChange, error, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)}>
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-3">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="mt-1 h-4 w-4 text-primary-500 border-neutral-300 focus:ring-primary-500 focus:ring-2"
            />
            <div className="flex-1">
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm font-medium text-neutral-700 cursor-pointer"
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-xs text-neutral-500 mt-1">{option.description}</p>
              )}
            </div>
          </div>
        ))}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export { RadioGroup }
