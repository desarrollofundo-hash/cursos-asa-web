// Iconos reutilizables del proyecto

export function LogoASA({ className = 'h-8 w-auto' }) {
    return (
        <svg
            version='1.2'
            preserveAspectRatio='xMidYMid'
            viewBox='0 0 228 198'
            className={className}
            width='228'
            height='198'
            aria-label='ASA Logo'
        >
            <g>
                <path fill='#199afc' d='M73.2 126.4c-15 15-15 39.3 0 54.3L19 126.4C4 111.5 4 87.2 19 72.2L73.2 18c15-15 39.2-15 54.2 0s15 39.2 0 54.2z' />
                <path fill='#1d5682' d='m73.2 126.4 27.1-27.1 27.1 27.1c15 15 15 39.3 0 54.3-15 14.9-39.2 14.9-54.2 0-15-15-15-39.3 0-54.3z' />
                <g>
                    <path fill='#199afc' d='M185.5 84.3c8.3-8.2 8.3-21.7 0-29.9l30 29.9c8.2 8.3 8.2 21.7 0 30l-30 30c-8.3 8.3-21.7 8.3-30 0s-8.3-21.7 0-30z' />
                    <path fill='#1d5682' d='m185.5 84.3-15 15-15-15c-8.3-8.2-8.3-21.7 0-29.9 8.3-8.3 21.7-8.3 30 0 8.3 8.2 8.3 21.7 0 29.9z' />
                </g>
            </g>
        </svg>
    )
}

export function IconVideo({ size = 20 }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z' />
            <path d='M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z' />
        </svg>
    )
}

export function IconCodeBraces({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <g clipPath='url(#clip_retos)'>
                <path d='M15 12H15.01' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M12 12H12.01' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M9 12H9.01' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M6 19C5.47 19 4.96 18.79 4.59 18.41C4.21 18.04 4 17.53 4 17V13L3 12L4 11V7C4 6.47 4.21 5.96 4.59 5.59C4.96 5.21 5.47 5 6 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M18 19C18.53 19 19.04 18.79 19.41 18.41C19.79 18.04 20 17.53 20 17V13L21 12L20 11V7C20 6.47 19.79 5.96 19.41 5.59C19.04 5.21 18.53 5 18 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </g>
            <defs>
                <clipPath id='clip_retos'>
                    <rect width='24' height='24' fill='currentColor' />
                </clipPath>
            </defs>
        </svg>
    )
}

export function IconBook({ size = 20 }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
            <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
        </svg>
    )
}

export function IconBug({ size = 20 }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M9 9v-1a3 3 0 0 1 6 0v1' />
            <path d='M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3' />
            <path d='M3 13l4 0' />
            <path d='M17 13l4 0' />
            <path d='M12 20l0 -6' />
            <path d='M4 19l3.35 -2' />
            <path d='M20 19l-3.35 -2' />
            <path d='M4 7l3.75 2.4' />
            <path d='M20 7l-3.75 2.4' />
        </svg>
    )
}

export function IconBell({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
            <path d='M9 17v1a3 3 0 0 0 6 0v-1' />
        </svg>
    )
}

export function IconUser({ size = 16 }) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
            <circle cx='12' cy='7' r='4' />
        </svg>
    )
}

export function IconSearch({ size = 16, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            aria-hidden='true'
            className={className}
        >
            <path
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export function IconBadgePuzzle({ size = 12, className = '' }) {
    return (
        <svg
            fill='currentColor'
            viewBox='0 0 20 20'
            width={size}
            height={size}
            className={className}
            aria-hidden='true'
        >
            <path d='M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z' />
        </svg>
    )
}

export function IconPlayOutline({ size = 15, className = '' }) {
    return (
        <svg
            width={size}
            height={Math.round((size * 18) / 15)}
            viewBox='0 0 15 18'
            fill='none'
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
        >
            <path
                d='M1 1V17L14 9L1 1Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export function IconPlaySolid({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={Math.round((size * 21) / 20)}
            viewBox='0 0 20 21'
            fill='none'
            className={className}
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
        >
            <path d='M5 3.83333V17.1667C4.99996 17.3149 5.03948 17.4605 5.11448 17.5884C5.18949 17.7164 5.29726 17.8219 5.42669 17.8943C5.55611 17.9666 5.70249 18.0031 5.85074 18.0001C5.99898 17.997 6.14371 17.9544 6.27 17.8767L17.1033 11.21C17.2247 11.1354 17.3249 11.031 17.3944 10.9067C17.4639 10.7824 17.5004 10.6424 17.5004 10.5C17.5004 10.3576 17.4639 10.2176 17.3944 10.0933C17.3249 9.96897 17.2247 9.86456 17.1033 9.79L6.27 3.12333C6.14371 3.04564 5.99898 3.00304 5.85074 2.99995C5.70249 2.99685 5.55611 3.03336 5.42669 3.10572C5.29726 3.17807 5.18949 3.28365 5.11448 3.41155C5.03948 3.53946 4.99996 3.68506 5 3.83333Z' fill='currentColor' />
        </svg>
    )
}

export function IconChevronRight({ size = 29, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 29 30'
            fill='none'
            className={className}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M10.875 22.25L18.125 15L10.875 7.75'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

export function IconShield({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
        </svg>
    )
}

export function IconLockBadge({ size = 14, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <path d='M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z' />
            <path d='M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z' />
        </svg>
    )
}

export function IconLock({ size = 18, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <path d='M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z' />
            <path d='M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0' />
            <path d='M8 11v-4a4 4 0 1 1 8 0v4' />
        </svg>
    )
}

export function IconChecklist({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <path d='M9 11l3 3L22 4' />
            <path d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' />
        </svg>
    )
}

export function IconAlertCircle({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <circle cx='12' cy='12' r='10' />
            <line x1='12' y1='8' x2='12' y2='12' />
            <line x1='12' y1='16' x2='12.01' y2='16' />
        </svg>
    )
}

export function IconCheckCircle({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <path d='M22 11.08V12a10 10 0 11-5.93-9.14' />
            <polyline points='22 4 12 14.01 9 11.01' />
        </svg>
    )
}

export function IconLogout({ size = 16, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={className}
            aria-hidden='true'
        >
            <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
            <polyline points='16 17 21 12 16 7' />
            <line x1='21' y1='12' x2='9' y2='12' />
        </svg>
    )
}
