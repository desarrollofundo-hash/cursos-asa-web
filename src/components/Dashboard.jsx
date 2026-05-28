import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LogoASA, IconVideo, IconCodeBraces, IconBook, IconBug, IconBell, IconUser, IconLogout } from './icons.jsx'

function Dashboard() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = localStorage.getItem('auth-user')
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
        if (!isCoarsePointer) return
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        const resetScroll = () => {
            window.scrollTo(0, 0)
        }
        resetScroll()
        requestAnimationFrame(resetScroll)
        setTimeout(resetScroll, 50)
    }, [location.pathname, location.key])

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-user')
        navigate('/login')
    }

    const navItemBase =
        'flex items-center gap-2 px-4 py-2 rounded-2xl border border-transparent transition-all duration-300 text-slate-200 hover:bg-slate-800/60 hover:border-white/10 min-h-[44px] text-sm font-medium'
    const navItemActive = 'bg-slate-700/55 border-white/15 text-white'
    const navItemInactive = 'opacity-60 cursor-not-allowed'

    return (
        <main className='min-h-dvh bg-slate-950/95'>
            <header className={`fixed top-0 right-0 left-0 z-40 bg-slate-950/95 backdrop-blur-xl transition-colors duration-300 ${menuOpen ? 'md:bg-slate-950/95 md:backdrop-blur-xl' : ''}`}>
                <div className='mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr] items-center gap-x-4 px-4 py-4 md:flex md:gap-x-6 md:px-6'>

                    {/* Logo */}
                    <div className='flex md:grow md:basis-0 justify-start shrink-0'>
                        <NavLink
                            to='/dashboard/cursos'
                            className='ml-1 flex items-center gap-2.5 font-bold shrink-0 group'
                        >
                            <img
                                src='/img/asa.png'
                                alt='ASA Logo'
                                className='h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110'
                            />
                        </NavLink>
                    </div>

                    {/* Nav — colapsa en móvil */}
                    <nav
                        aria-label='Navegación principal'
                        className={[
                            'col-span-full row-[2/3] bg-slate-950/95 transition-[grid-template-rows] md:flex md:justify-center',
                            menuOpen ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]',
                        ].join(' ')}
                    >
                        <ul className='flex flex-col overflow-hidden md:flex-row md:gap-x-1 lg:gap-x-2 md:items-center'>
                            <li className='flex w-full justify-center first:mt-3 md:w-auto md:first:mt-0'>
                                <NavLink
                                    to='/dashboard/cursos'
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `${navItemBase} w-full justify-center md:w-auto ${isActive ? navItemActive : 'hover:bg-slate-800/60'}`
                                    }
                                >
                                    <IconVideo />
                                    Cursos
                                </NavLink>
                            </li>

                            <li className='flex w-full justify-center md:w-auto'>
                                <button type='button' title='Pronto disponible' className={`${navItemBase} ${navItemInactive} w-full justify-center md:w-auto blur-[1.5px]`}>
                                    <IconCodeBraces />
                                    {/*        Retos */}
                                    <span className='rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300'>
                                        Proximamente
                                    </span>
                                </button>
                            </li>

                            <li className='flex w-full justify-center md:w-auto'>
                                <button type='button' title='Pronto disponible' className={`${navItemBase} ${navItemInactive} w-full justify-center md:w-auto blur-[1.5px]`}>
                                    <IconBook />
                                    {/*        Recursos */}
                                    <span className='rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300'>
                                        Proximamente
                                    </span>
                                </button>
                            </li>

                            <li className='flex w-full justify-center mb-3 md:w-auto md:mb-0'>
                                <button type='button' title='Pronto disponible' className={`${navItemBase} ${navItemInactive} w-full justify-center md:w-auto blur-[1.5px]`}>
                                    <IconBug />
                                    {/* Bugs */}
                                    <span className='rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300'>
                                        Proximamente
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Acciones derecha */}
                    <div className='flex md:grow md:basis-0 items-center gap-1 md:gap-2 ml-auto md:ml-0 justify-end'>
                        {/* Notificaciones */}
                        <button
                            type='button'
                            title='Notificaciones'
                            className='relative flex items-center gap-2 rounded-2xl border border-transparent px-3 py-2 text-slate-200 transition-all duration-300 hover:border-white/10 hover:bg-slate-800/60'
                        >
                            <IconBell />
                        </button>

                        {/* Usuario / Perfil */}
                        <div className='relative' ref={profileRef}>
                            <button
                                type='button'
                                onClick={() => setProfileOpen(o => !o)}
                                title='Ver perfil'
                                className='flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-white/10 hover:bg-slate-800/60'
                            >
                                <div className='relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-blue-600'>
                                    <IconUser size={16} />
                                </div>
                                <span className='hidden max-w-28 truncate xl:block whitespace-nowrap text-slate-100'>
                                    {user ?? 'Perfil'}
                                </span>
                            </button>

                            {/* Dropdown */}
                            {profileOpen && (
                                <div className='absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-[0_16px_48px_rgba(2,12,27,0.55)] backdrop-blur-xl'>
                                    {/* Info usuario */}
                                    <div className='flex items-center gap-3 border-b border-white/10 px-4 py-4'>
                                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-blue-600'>
                                            <IconUser size={18} />
                                        </div>
                                        <div className='min-w-0'>
                                            <p className='truncate text-sm font-semibold capitalize text-white'>
                                                {user ?? '—'}
                                            </p>
                                            <p className='truncate text-xs text-slate-400'>ASA Capacitaciones</p>
                                        </div>
                                    </div>

                                    {/* Cerrar sesión */}
                                    <div className='p-2'>
                                        <button
                                            type='button'
                                            onClick={handleLogout}
                                            className='flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 cursor-pointer'
                                        >
                                            <IconLogout />
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Hamburger móvil */}
                        <button
                            type='button'
                            id='header-navbar-toggle'
                            aria-controls='header-navbar'
                            aria-expanded={menuOpen}
                            title={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            onClick={() => setMenuOpen(o => !o)}
                            className='group flex items-center justify-center py-2 md:hidden'
                        >
                            <div className='flex cursor-pointer flex-col gap-1.5 p-2'>
                                <span className={`block h-0.5 w-7 origin-center rounded-full bg-white/80 transition-transform ease-in-out ${menuOpen ? 'translate-y-1.25 rotate-45' : ''}`} />
                                <span className={`block h-0.5 w-7 origin-center rounded-full bg-white/80 transition-transform ease-in-out ${menuOpen ? '-translate-y-1.25 -rotate-45' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <section className='px-2 pt-[calc(5.25rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))] sm:px-4 sm:pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pb-6 lg:px-5'>
                <div className='mx-auto min-h-full w-full max-w-350'>
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Dashboard
