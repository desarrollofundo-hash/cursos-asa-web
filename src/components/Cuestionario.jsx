import { useState } from 'react'

function Cuestionario({ preguntas, onVolver }) {
    const [shuffled] = useState(() => [...preguntas].sort(() => Math.random() - 0.5))
    const [indice, setIndice] = useState(0)
    const [respuestas, setRespuestas] = useState({})
    const [seleccionada, setSeleccionada] = useState(null)
    const [finalizado, setFinalizado] = useState(false)

    const total = shuffled.length
    const preguntaActual = shuffled[indice]

    const correctas = Object.entries(respuestas).filter(
        ([i, r]) => shuffled[Number(i)].correcta === r,
    ).length

    const confirmar = () => {
        if (seleccionada === null) return
        const nuevasRespuestas = { ...respuestas, [indice]: seleccionada }
        setRespuestas(nuevasRespuestas)
        if (indice + 1 >= total) {
            setFinalizado(true)
        } else {
            setIndice((i) => i + 1)
            setSeleccionada(null)
        }
    }

    const reintentar = () => {
        setIndice(0)
        setRespuestas({})
        setFinalizado(false)
        setSeleccionada(null)
    }

    if (finalizado) {
        const pct = Math.round((correctas / total) * 100)
        const aprobado = pct >= 70
        return (
            <div className='py-6 text-center'>
                    <div
                        className={`mx-auto mb-4 grid h-24 w-24 place-content-center rounded-full text-3xl font-bold ${aprobado ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}
                    >
                        {pct}%
                    </div>
                    <p className='text-lg font-bold text-slate-900'>
                        {correctas} de {total} respuestas correctas
                    </p>
                    {aprobado ? (
                        <p className='mt-2 font-semibold text-emerald-600'>
                            ¡Felicitaciones, aprobaste el cuestionario!
                        </p>
                    ) : (
                        <p className='mt-2 font-semibold text-rose-500'>
                            No alcanzaste el 70%. ¡Sigue practicando!
                        </p>
                    )}
                    <div className='mt-4 space-y-2'>
                        {shuffled.map((p, i) => {
                            const respuestaUsuario = respuestas[i]
                            const esCorrecta = respuestaUsuario === p.correcta
                            return (
                                <div
                                    key={i}
                                    className={`rounded-xl border px-4 py-3 text-lef+t text-sm ${esCorrecta ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}
                                >
                                    <p className='font-semibold text-slate-800'>{p.pregunta}</p>
                                    <p className={`mt-1 text-xs ${esCorrecta ? 'text-emerald-700' : 'text-rose-600'}`}>
                                        {esCorrecta ? '✓ Correcto' : `✗ Tu respuesta: ${p.opciones[respuestaUsuario]} — Correcta: ${p.opciones[p.correcta]}`}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='mt-6 flex justify-center gap-3'>
                        <button
                            type='button'
                            onClick={reintentar}
                            className='rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50'
                        >
                            Reintentar
                        </button>
                        <button
                            type='button'
                            onClick={onVolver}
                            className='rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700'
                        >
                            Volver a videos
                        </button>
                    </div>
            </div>
        )
    }

    const progresoPct = Math.round((indice / total) * 100)

    return (
        <div>
            <div className='mb-2 flex items-center justify-between text-xs text-slate-500'>
                <span>
                    Pregunta {indice + 1} de {total}
                </span>
                <span>{progresoPct}% completado</span>
            </div>
            <div className='mb-5 h-1.5 w-full rounded-full bg-slate-100'>
                <div
                    className='h-1.5 rounded-full bg-cyan-500 transition-all'
                    style={{ width: `${progresoPct}%` }}
                />
            </div>

            <p className='mb-5 text-base font-semibold text-slate-900'>{preguntaActual.pregunta}</p>

            <div className='space-y-3'>
                {preguntaActual.opciones.map((opcion, i) => (
                    <button
                        key={i}
                        type='button'
                        onClick={() => setSeleccionada(i)}
                        className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${seleccionada === i
                            ? 'border-cyan-400 bg-cyan-50 text-cyan-800 ring-1 ring-cyan-300'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                    >
                        <span className={`mr-3 inline-grid h-5 w-5 place-content-center rounded-full text-xs font-bold ${seleccionada === i ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {String.fromCharCode(65 + i)}
                        </span>
                        {opcion}
                    </button>
                ))}
            </div>

            <button
                type='button'
                onClick={confirmar}
                disabled={seleccionada === null}
                className='mt-6 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40'
            >
                {indice + 1 >= total ? 'Finalizar cuestionario' : 'Siguiente pregunta →'}
            </button>
        </div>
    )
}

export default Cuestionario
