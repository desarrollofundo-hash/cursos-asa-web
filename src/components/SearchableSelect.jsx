import { useEffect, useMemo, useRef, useState } from 'react'

const normalizeText = (texto) =>
    texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

function SearchableSelect({
    id,
    value,
    onChange,
    options,
    placeholder,
    ariaLabel,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const wrapperRef = useRef(null)
    const searchRef = useRef(null)

    const selectedOption = options.find((option) => option.value === value)
    const filteredOptions = useMemo(() => {
        const normalizedQuery = normalizeText(query.trim())
        if (!normalizedQuery) return options

        return options.filter((option) =>
            normalizeText(option.label).includes(normalizedQuery),
        )
    }, [options, query])

    useEffect(() => {
        if (!isOpen) return

        const handleClickOutside = (event) => {
            if (!wrapperRef.current?.contains(event.target)) {
                setIsOpen(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('click', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && searchRef.current) {
            searchRef.current.focus()
        }
    }, [isOpen])

    const handleToggle = () => {
        setIsOpen((prev) => !prev)
        if (!isOpen) {
            setQuery('')
        }
    }

    const handleSelect = (optionValue) => {
        onChange(optionValue)
        setIsOpen(false)
        setQuery('')
    }

    return (
        <div ref={wrapperRef} className='relative w-full sm:w-auto'>
            <button
                type='button'
                id={`select-${id}`}
                className='app-input flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs text-slate-100 transition-all hover:border-slate-500 focus:outline-none sm:w-auto'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-label={ariaLabel}
                onClick={handleToggle}
            >
                <span className='flex min-w-0 items-center gap-2 text-slate-100'>
                    <span className='truncate'>
                        {selectedOption?.label || placeholder}
                    </span>
                </span>
                <svg
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    viewBox='0 0 24 24'
                    fill='none'
                    aria-hidden='true'
                >
                    <path
                        d='M6 9l6 6 6-6'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
            </button>

            {isOpen ? (
                <div
                    id={`select-menu-${id}`}
                    role='listbox'
                    className='absolute z-50 mt-1 w-full min-w-[14rem] rounded-lg border border-white/10 bg-slate-950/95 shadow-xl backdrop-blur-sm sm:w-auto'
                >
                    <div className='border-b border-white/10 p-1.5'>
                        <input
                            ref={searchRef}
                            type='text'
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            onClick={(event) => event.stopPropagation()}
                            placeholder='Buscar...'
                            className='app-input w-full rounded-md border px-2.5 py-1.5 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none'
                        />
                    </div>
                    <div className='hide-scrollbar max-h-56 overflow-y-auto py-1'>
                        {filteredOptions.map((option) => {
                            const isSelected = option.value === value

                            return (
                                <button
                                    key={option.value}
                                    type='button'
                                    role='option'
                                    aria-selected={isSelected}
                                    className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors ${isSelected
                                            ? 'text-slate-100'
                                            : 'text-slate-400'
                                        } hover:bg-white/5`}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        handleSelect(option.value)
                                    }}
                                >
                                    <span
                                        className={`flex h-4 w-4 items-center justify-center rounded-sm border border-white/10 ${isSelected
                                                ? 'bg-sky-400/20 text-sky-300'
                                                : 'text-transparent'
                                            }`}
                                    >
                                        <svg
                                            className='h-3 w-3'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            aria-hidden='true'
                                        >
                                            <path
                                                d='M5 13l4 4L19 7'
                                                stroke='currentColor'
                                                strokeWidth='2.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </span>
                                    <span className='truncate'>{option.label}</span>
                                </button>
                            )
                        })}
                        {filteredOptions.length === 0 ? (
                            <div className='px-3 py-2 text-xs text-slate-400'>
                                No hay resultados
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default SearchableSelect
