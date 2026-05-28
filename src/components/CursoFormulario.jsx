import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cursosData } from '../data/cursosData'

function CursoFormulario() {
    const { id } = useParams()
    const navigate = useNavigate()
    const curso = cursosData.find((c) => c.id === id)
    const vistos = useMemo(() => {
        const guardados = localStorage.getItem(`vistos-${id}`)
        const ids = guardados ? JSON.parse(guardados) : []
        return new Set(ids)
    }, [id])
    const preguntas = useMemo(() => curso?.preguntas || [], [curso])
    const [respuestas, setRespuestas] = useState({})
    const [resultado, setResultado] = useState(null)
    const videos = curso?.videos || []
    const cursoCompleto = videos.length > 0 && videos.every((video) => vistos.has(video.id))

    useEffect(() => {
        if (!resultado?.aprobado) return
        const timer = setTimeout(() => {
            navigate(`/dashboard/cursos/${curso.id}`)
        }, 2000)
        return () => clearTimeout(timer)
    }, [resultado, navigate, curso])

    if (!curso) {
        return (
            <section className='py-16 text-center text-slate-300'>
                <p className='text-lg font-semibold'>Curso no encontrado.</p>
                <Link
                    to='/dashboard/cursos'
                    className='mt-4 inline-block text-sm font-semibold text-sky-300 hover:underline'
                >
                    Volver a cursos
                </Link>
            </section>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!cursoCompleto) return
        const total = preguntas.length
        const correctas = preguntas.reduce((acc, pregunta) => {
            const valor = respuestas[pregunta.pregunta]
            if (Number(valor) === pregunta.correcta) return acc + 1
            return acc
        }, 0)
        const aprobado = total > 0 && correctas === total
        setResultado({ total, correctas, aprobado })
    }

    const handleRetry = () => {
        setRespuestas({})
        setResultado(null)
    }

    return (
        <section className='min-h-screen bg-transparent text-slate-100'>
            <div className='mx-auto grid max-w-screen-2xl gap-6'>
                <nav className='text-slate-400 flex flex-wrap gap-2 px-2 lg:px-0'>
                    <Link to='/dashboard/cursos' className='transition-colors hover:underline'>
                        Inicio
                    </Link>
                    <span aria-hidden='true'>/</span>
                    <Link
                        to={`/dashboard/cursos/${curso.id}`}
                        className='transition-colors hover:underline'
                    >
                        {curso.nombre}
                    </Link>
                    <span aria-hidden='true'>/</span>
                    <span className='text-sky-300'>Formulario</span>
                </nav>

                <section className='rounded-2xl bg-slate-900/60 border border-white/10 p-4 sm:p-6 mx-2 lg:mx-0'>
                    <div className='flex flex-wrap items-start justify-between gap-4'>
                        <div>
                            <h1 className='text-2xl sm:text-3xl font-bold text-balance'>
                                Evaluacion de {curso.nombre}
                            </h1>
                            <p className='mt-2 text-sm text-slate-400'>
                                Responde las preguntas para registrar tu aprendizaje.
                            </p>
                        </div>
                        <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200'>
                            {curso.categoria} · {curso.nivel}
                        </span>
                    </div>

                    {!cursoCompleto ? (
                        <div className='mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-200'>
                            Debes completar todos los videos del curso para habilitar la evaluacion.
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className='mt-6 grid gap-5'>
                        <div className='grid gap-4'>
                            {preguntas.length === 0 ? (
                                <div className='rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300'>
                                    Este curso no tiene preguntas registradas.
                                </div>
                            ) : (
                                preguntas.map((pregunta, index) => (
                                    <fieldset
                                        key={pregunta.pregunta}
                                        className='rounded-2xl border border-white/10 bg-slate-900/60 p-4'
                                        disabled={!cursoCompleto}
                                    >
                                        <legend className='text-sm font-semibold text-slate-100'>
                                            {index + 1}. {pregunta.pregunta}
                                        </legend>
                                        <div className='mt-3 grid gap-2'>
                                            {pregunta.opciones.map((opcion, opcionIdx) => (
                                                <label
                                                    key={`${pregunta.pregunta}-${opcion}`}
                                                    className='flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800/60'
                                                >
                                                    <input
                                                        type='radio'
                                                        name={pregunta.pregunta}
                                                        value={opcionIdx}
                                                        checked={String(respuestas[pregunta.pregunta]) === String(opcionIdx)}
                                                        onChange={(event) =>
                                                            setRespuestas((prev) => ({
                                                                ...prev,
                                                                [pregunta.pregunta]: event.target.value,
                                                            }))
                                                        }
                                                        className='mt-1 h-4 w-4 accent-sky-400'
                                                    />
                                                    <span>{opcion}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                ))
                            )}
                        </div>

                        {resultado ? (
                            <div
                                className={`rounded-2xl border px-4 py-3 text-sm ${resultado.aprobado
                                    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                                    : 'border-rose-400/30 bg-rose-500/10 text-rose-200'
                                    }`}
                            >
                                {resultado.aprobado
                                    ? 'Aprobado con exito. Cerrando evaluacion...'
                                    : 'Desaprobado. Vuelve a intentarlo y revisa el curso.'}
                                <div className='mt-2 text-xs text-slate-300'>
                                    Resultado: {resultado.correctas} de {resultado.total} correctas.
                                </div>
                            </div>
                        ) : null}

                        <div className='flex flex-wrap gap-3'>
                            <button
                                type='submit'
                                disabled={!cursoCompleto || preguntas.length === 0}
                                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${!cursoCompleto || preguntas.length === 0
                                    ? 'border-white/10 bg-white/5 text-slate-500 cursor-not-allowed'
                                    : 'border-sky-400/30 bg-sky-500/15 text-sky-200 hover:bg-sky-500/25'
                                    }`}
                            >
                                Enviar respuestas
                            </button>
                            {resultado && !resultado.aprobado ? (
                                <button
                                    type='button'
                                    onClick={handleRetry}
                                    className='rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5'
                                >
                                    Intentar de nuevo
                                </button>
                            ) : null}
                            <Link
                                to={`/dashboard/cursos/${curso.id}`}
                                className='rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/5'
                            >
                                Volver al curso
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    )
}

export default CursoFormulario
