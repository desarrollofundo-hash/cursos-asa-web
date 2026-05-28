import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WavyButton from './WavyButton'
import { Boxes } from './Boxes'

import { loginCursos } from '../services/get/getLogin' // 👈 importa tu función

function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const canSubmit = useMemo(
        () => username.trim() !== '' && password.trim() !== '',
        [username, password]
    )

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setLoading(true)

        try {
            // 🔐 Consumir API
            const userData = await loginCursos({
                dni: username.trim(),
                contrasena: password.trim(),
            })

            // 💾 Guardar sesión
            localStorage.setItem('auth-token', 'session-active')
            localStorage.setItem('auth-user', JSON.stringify(userData))

            // 🚀 Redireccionar
            navigate('/dashboard/cursos')

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleFieldFocus = (event) => {
        const target = event.currentTarget

        setTimeout(() => {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }, 60)
    }

    return (
        <main
            className='login-typography login-viewport relative isolate bg-transparent px-4 py-6 sm:px-8 sm:py-10 lg:flex lg:items-center lg:py-0 min-h-screen overflow-hidden'
            style={{ fontFamily: 'var(--font-login)' }}
        >
            <Boxes />

            <div className='app-surface-strong app-border-strong relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-4xl border shadow-[0_20px_70px_rgba(3,7,18,0.55)] backdrop-blur-md lg:grid-cols-[1.1fr_0.9fr] z-10'>
                
                <section className='app-border relative hidden overflow-hidden border-b px-6 py-8 sm:px-10 sm:py-10 lg:block lg:border-r lg:border-b-0'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(14,165,233,0.2),transparent_45%),radial-gradient(circle_at_92%_100%,rgba(56,189,248,0.14),transparent_48%)]' />

                    <div className='relative z-10 animate-fade-up'>
                        <p className='inline-flex rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-sky-100 uppercase'>
                            Plataforma ASA
                        </p>

                        <h1
                            className='mt-4 max-w-lg text-3xl leading-tight font-semibold text-slate-100 sm:text-5xl'
                            style={{ fontFamily: 'var(--font-login)' }}
                        >
                            Capacita a tu equipo con una experiencia inteligente
                        </h1>

                        <p className='mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base'>
                            Centraliza tus cursos, monitorea el avance de cada colaborador y mejora el aprendizaje continuo.
                        </p>
                    </div>
                </section>

                <section className='app-surface px-6 py-8 sm:px-10 sm:py-10'>
                    
                    <div className='animate-fade-up' style={{ animationDelay: '120ms' }}>
                        <p className='mb-3 inline-flex rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.15em] text-sky-100 uppercase'>
                            Inicio de sesión
                        </p>

                        <h2
                            className='text-3xl font-semibold text-slate-100'
                            style={{ fontFamily: 'var(--font-login)' }}
                        >
                            Bienvenido:
                        </h2>

                        <p className='mt-2 text-sm leading-relaxed text-slate-300'>
                            Inicia sesión para acceder a tus cursos
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-7 space-y-4'>

                        {/* DNI */}
                        <div className='animate-fade-up' style={{ animationDelay: '180ms' }}>
                            <label
                                htmlFor='username'
                                className='mb-1.5 block text-sm font-medium text-slate-200 uppercase login-label'
                            >
                                DNI:
                            </label>

                            <input
                                id='username'
                                type='text'
                                placeholder='Ingrese su DNI'
                                autoComplete='username'
                                value={username}
                                onFocus={handleFieldFocus}
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                    setError('')
                                }}
                                className='app-input w-full rounded-2xl border px-4 py-3 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-400'
                                required
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className='animate-fade-up' style={{ animationDelay: '220ms' }}>
                            <label
                                htmlFor='password'
                                className='mb-1.5 block text-sm font-medium text-slate-200 uppercase login-label'
                            >
                                Contraseña:
                            </label>

                            <div className='relative'>
                                <input
                                    id='password'
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    placeholder='******'
                                    autoComplete='current-password'
                                    value={password}
                                    onFocus={handleFieldFocus}
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                        setError('')
                                    }}
                                    className='app-input w-full rounded-2xl border px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-400'
                                    required
                                />

                                <button
                                    type='button'
                                    onClick={() =>
                                        setIsPasswordVisible((current) => !current)
                                    }
                                    className='absolute top-1/2 right-3 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-slate-100'
                                >
                                    {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>

                        {/* ERROR */}
                        {error && (
                            <p className='rounded-xl border border-rose-400/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-200 animate-fade-up'>
                                {error}
                            </p>
                        )}

                        {/* BUTTON */}
                        <WavyButton
                            type='submit'
                            disabled={!canSubmit || loading}
                            className='animate-fade-up cursor-pointer'
                            style={{ animationDelay: '300ms' }}
                        >
                            {loading ? 'Ingresando...' : 'Iniciar sesión'}
                        </WavyButton>

                    </form>
                </section>
            </div>
        </main>
    )
}

export default Login