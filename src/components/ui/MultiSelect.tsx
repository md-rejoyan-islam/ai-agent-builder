import { useState, useRef, useEffect } from 'react'

interface MultiSelectOption {
  value: string
  label: string
  category?: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
  placeholder?: string
  label?: string
  id?: string
  maxCount?: number
}

const MultiSelect = ({
  options,
  selected,
  onAdd,
  onRemove,
  placeholder = 'Select options...',
  label,
  id,
  maxCount = 3,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Focus search on open
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus()
    }
  }, [open])

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase()) ||
    (opt.category && opt.category.toLowerCase().includes(search.toLowerCase()))
  )

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onRemove(value)
    } else {
      onAdd(value)
    }
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    selected.forEach(v => onRemove(v))
  }

  const selectedItems = selected
    .map(v => options.find(o => o.value === v))
    .filter(Boolean) as MultiSelectOption[]

  const visibleBadges = selectedItems.slice(0, maxCount)
  const extraCount = selectedItems.length - maxCount

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
        onClick={() => setOpen(prev => !prev)}
        className={`group flex w-full min-h-[42px] items-center rounded-lg border bg-surface-800/50 px-2 py-1.5 text-sm transition-all duration-150 hover:bg-surface-800/80 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 ${
          open ? 'border-primary-500/50 ring-2 ring-primary-500/30' : 'border-surface-700/60'
        }`}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {selectedItems.length === 0 ? (
            <span className="text-surface-500 px-1">{placeholder}</span>
          ) : (
            <>
              {visibleBadges.map(item => (
                <span
                  key={item.value}
                  className="inline-flex items-center gap-1 rounded-md border border-surface-600/50 bg-surface-700/60 px-2 py-0.5 text-xs font-medium text-surface-200 transition-colors hover:bg-surface-700"
                >
                  {item.label}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); onRemove(item.value) }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onRemove(item.value) } }}
                    className="ml-0.5 rounded-sm text-surface-400 hover:text-surface-100 hover:bg-surface-600/60 p-0.5 transition-colors"
                    aria-label={`Remove ${item.label}`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </span>
                </span>
              ))}
              {extraCount > 0 && (
                <span className="inline-flex items-center rounded-md border border-surface-600/40 bg-surface-700/40 px-2 py-0.5 text-xs font-medium text-surface-400">
                  +{extraCount} more
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-1 pl-2">
          {/* Clear all */}
          {selectedItems.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={clearAll}
              onKeyDown={(e) => { if (e.key === 'Enter') clearAll(e as unknown as React.MouseEvent) }}
              className="rounded-sm p-1 text-surface-500 hover:text-surface-200 hover:bg-surface-700/60 transition-colors"
              aria-label="Clear all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </span>
          )}

          {/* Separator */}
          <span className="h-5 w-px bg-surface-700/60" />

          {/* Chevron */}
          <span className="p-1">
            <svg
              className={`w-4 h-4 text-surface-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-lg border border-surface-700/60 bg-surface-900 shadow-xl shadow-black/30 overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 border-b border-surface-800 px-3 py-2">
            <svg className="w-4 h-4 text-surface-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search options..."
              className="flex-1 bg-transparent text-sm text-surface-200 placeholder-surface-600 outline-none"
            />
          </div>

          {/* Options list */}
          <div className="max-h-52 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <p className="py-6 text-center text-sm text-surface-500">No results found</p>
            ) : (
              filteredOptions.map(opt => {
                const isChecked = selected.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleOption(opt.value)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                      isChecked
                        ? 'bg-primary-500/8 text-surface-100'
                        : 'text-surface-300 hover:bg-surface-800 hover:text-surface-100'
                    }`}
                  >
                    {/* Checkbox */}
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                      isChecked
                        ? 'bg-primary-500 border-primary-500'
                        : 'border-surface-600 bg-surface-800/60'
                    }`}>
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      )}
                    </span>

                    <span className="flex-1 text-left">{opt.label}</span>

                    {opt.category && (
                      <span className="text-xs text-surface-600">{opt.category}</span>
                    )}
                  </button>
                )
              })
            )}
          </div>

          {/* Footer with count */}
          {selected.length > 0 && (
            <div className="border-t border-surface-800 px-3 py-2 text-xs text-surface-500">
              {selected.length} selected
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MultiSelect
