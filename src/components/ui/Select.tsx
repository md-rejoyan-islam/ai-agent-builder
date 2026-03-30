import { useState, useRef, useEffect } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  id?: string
}

const Select = ({ options, value, onChange, placeholder = 'Select...', label, id }: SelectProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-surface-200 mb-2">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        onClick={() => setOpen(prev => !prev)}
        className="group flex w-full items-center justify-between rounded-lg border border-surface-700/60 bg-surface-800/50 px-3 py-2.5 text-sm transition-all duration-150 hover:bg-surface-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50"
      >
        <span className={selected ? 'text-surface-100' : 'text-surface-500'}>
          {selected ? selected.label : placeholder}
        </span>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-surface-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div 
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1.5 w-full rounded-lg border border-surface-700/60 bg-surface-900 shadow-xl shadow-black/30 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
        >
          <div className="max-h-56 overflow-y-auto py-1">
            {/* Empty / reset option */}
            <button
              type="button"
              onClick={() => { onChange(''); setOpen(false) }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
                !value ? 'bg-primary-500/10 text-primary-300' : 'text-surface-400 hover:bg-surface-800 hover:text-surface-200'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                {!value && (
                  <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </span>
              <span className="italic">{placeholder}</span>
            </button>

            {options.map(opt => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
                    isSelected
                      ? 'bg-primary-500/10 text-primary-300'
                      : 'text-surface-200 hover:bg-surface-800 hover:text-surface-100'
                  }`}
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Select
