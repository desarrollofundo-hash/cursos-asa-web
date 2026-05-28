import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cursosData } from '../data/cursosData'
import { IconPlaySolid, IconChevronRight, IconShield, IconChecklist, IconAlertCircle, IconCheckCircle } from './icons.jsx'

function CursoDetalle() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [claseAbierta, setClaseAbierta] = useState(-1)
    const curso = cursosData.find((c) => c.id === id)
    const aprendizajes = [
        `Comprender los fundamentos de ${curso?.nombre?.toLowerCase() || 'este curso'}.`,
        'Aplicar buenas practicas en escenarios reales de trabajo.',
        'Tomar decisiones seguras siguiendo procedimientos claros.',
        'Evaluar riesgos y responder ante situaciones criticas.',
    ]

    const totalSegundos = (curso?.videos || []).reduce((acc, v) => {
        const [mm, ss] = (v.duracion || '0:00').split(':').map(Number)
        if (Number.isNaN(mm) || Number.isNaN(ss)) return acc
        return acc + mm * 60 + ss
    }, 0)

    const horas = Math.floor(totalSegundos / 3600)
    const minutos = Math.round((totalSegundos % 3600) / 60)
    const duracionTotal = horas > 0 ? `${horas}h ${minutos}m` : `${minutos}m`
    const capitulos = Math.max(1, Math.ceil((curso?.videos?.length || 1) / 3))

    const capitulosData = useMemo(() => {
        const videos = curso?.videos || []
        const chunks = []
        const chunkSize = Math.max(1, Math.ceil(videos.length / 3))

        for (let i = 0; i < videos.length; i += chunkSize) {
            chunks.push(videos.slice(i, i + chunkSize))
        }

        return chunks.map((videosChunk, idx) => ({
            id: `capitulo-${idx + 1}`,
            nombre: `Capitulo ${idx + 1}`,
            titulo: idx === 0 ? 'Primeros pasos' : idx === 1 ? 'Desarrollo' : 'Cierre y evaluacion',
            videos: videosChunk,
        }))
    }, [curso?.videos])

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

    const iniciarCurso = () => {
        navigate(`/dashboard/cursos/${curso.id}/leccion/0`)
    }

    return (
        <section className='min-h-screen bg-transparent text-slate-100'>
            <div className='mx-auto grid max-w-screen-2xl gap-6 lg:grid-cols-[1fr_332px]'>
                <nav className='text-slate-400 col-[1/2] lg:col-[1/3] row-[1/2] flex flex-wrap gap-2 px-2 lg:px-0 mb-0!'>
                    <Link to='/dashboard/cursos' className='transition-colors hover:underline'>
                        Inicio
                    </Link>
                    <span aria-hidden='true'>/</span>
                    <span className='text-sky-300 text-ellipsis overflow-hidden w-[20ch] md:w-auto whitespace-nowrap'>
                        {curso.nombre}
                    </span>
                </nav>

                <div className='relative sm:border sm:border-white/10 md:rounded-[30px] col-[1/2] row-[2/3]'>
                    <img
                        src={curso.imagen || '/img/seguridad.webp'}
                        className='aspect-video md:rounded-[30px] w-full object-cover'
                        alt={`Portada del curso ${curso.nombre}`}
                        width='1920'
                        height='1080'
                        loading='eager'
                        decoding='async'
                        fetchPriority='high'
                    />

                    <button
                        type='button'
                        onClick={iniciarCurso}
                        className='absolute md:right-5 md:bottom-5 right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 md:translate-x-0 md:translate-y-0 rounded-[10px] bg-slate-900/85 border border-white/20 py-2 px-4 flex items-center gap-1.5 hover:scale-110 transition-transform cursor-pointer'
                    >
                        <IconPlaySolid size={20} />
                        Empezar curso
                    </button>

                    <div className='absolute left-5 bottom-5 z-10 sm:left-8 sm:bottom-8'>
                        <p className='text-slate-300 text-sm sm:text-base mt-1'>
                            Un curso de <span className='text-slate-100'>Academia ASA</span>
                        </p>
                    </div>
                </div>

                <div className='col-[1/2] row-[3/4] px-2 lg:px-0'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-balance'>
                        {curso.nombre}
                    </h1>
                    <div className='mt-6'>
                        <p className='text-slate-300 max-w-[80ch]'>
                            {curso.descripcion}
                        </p>
                    </div>
                </div>

                <section className='col-[1/2] lg:col-[2/3] row-[4/5] lg:row-[2/3] h-fit bg-slate-900/60 border border-white/10 rounded-3xl p-5 flex flex-col gap-4 mx-2 lg:mx-0'>
                    <h3 className='text-lg md:text-xl font-bold'>El curso incluye:</h3>
                    <ul className='flex flex-col text-slate-300 text-base'>
                        <li className='flex justify-between items-center px-2 py-1'>
                            <p>Duración:</p>
                            <span>{duracionTotal}</span>
                        </li>
                       {/*  <li className='flex justify-between items-center px-2 py-1'>
                            <p>Lenguaje:</p>
                            <span>Espanol</span>
                        </li> */}
                        <li className='flex justify-between items-center px-2 py-1'>
                            <p>Nivel:</p>
                            <span>{curso.nivel}</span>
                        </li>
                        <li className='flex justify-between items-center px-2 py-1'>
                            <p>PDF'S:</p>
                            <span>Descargables</span>
                        </li>
                    </ul>

                    <button
                        type='button'
                        onClick={iniciarCurso}
                        className='py-2.5 px-4 justify-center rounded-[10px] font-bold border flex items-center gap-x-2.5 hover:scale-105 transition-all duration-300 bg-sky-400 hover:bg-sky-300 text-slate-950 border-sky-300 text-sm cursor-pointer'
                    >
                        <IconPlaySolid size={20} />
                        Empezar curso
                    </button>
                </section>

                <div className='col-[1/2] lg:col-[1/3] row-[5/5] px-2 lg:px-0'>
                    <div>
                        <h2 className='text-lg md:text-xl font-bold'>Stack:</h2>
                        <ul className='flex flex-wrap gap-3 mt-2.5'>
                            <li className='bg-slate-900/60 px-4 py-2 rounded border border-white/10 flex items-center gap-2'>
                                <IconShield size={18} />
                                Seguridad
                            </li>
                            <li className='bg-slate-900/60 px-4 py-2 rounded border border-white/10 flex items-center gap-2'>
                                <IconChecklist size={18} />
                                Procedimientos
                            </li>
                            <li className='bg-slate-900/60 px-4 py-2 rounded border border-white/10 flex items-center gap-2'>
                                <IconAlertCircle size={18} />
                                Prevencion
                            </li>
                            <li className='bg-slate-900/60 px-4 py-2 rounded border border-white/10 flex items-center gap-2'>
                                <IconCheckCircle size={18} />
                                Cumplimiento
                            </li>
                        </ul>
                    </div>

                    <div className='mt-6'>
                        <h2 className='text-lg md:text-xl font-bold'>Lo que aprenderas:</h2>
                        <ul className='mt-4 flex flex-wrap gap-4'>
                            {aprendizajes.map((item) => (
                                <li
                                    key={item}
                                    className='bg-slate-900/60 px-4 py-2 rounded border border-white/10 max-w-[48ch]'
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

             {/*        <div className='mt-6 flex flex-col gap-2.5 max-w-4xl cursor-pointer'>
                        <h2 className='text-lg md:text-xl font-bold'>Contenido del curso</h2>
                        <div className='flex items-center gap-2 text-slate-400 text-sm flex-wrap'>
                            <span>{capitulos} secciones</span>
                            <span aria-hidden='true'>•</span>
                            <span>{curso.videos.length} clases</span>
                            <span aria-hidden='true'>•</span>
                            <span>{duracionTotal} de duracion total</span>
                        </div>

                        <ul id='accordion-section-classes-list' className='flex flex-col gap-y-4'>
                            {capitulosData.map((capitulo, capIdx) => (
                                <li key={capitulo.id} className='rounded-2xl bg-slate-900/60 border border-white/10'>
                                    <div className='grid transition-[grid-template-rows]'>
                                        <button
                                            id={`${capitulo.id}-button`}
                                            type='button'
                                            aria-expanded={claseAbierta === capIdx}
                                            aria-controls={capitulo.id}
                                            className='p-4 cursor-pointer relative select-none flex'
                                            onClick={() => {
                                                setClaseAbierta((prev) => (prev === capIdx ? -1 : capIdx))
                                            }}
                                        >
                                            <IconChevronRight
                                                className={`relative self-center transition-transform order-2 ${claseAbierta === capIdx ? 'rotate-90' : ''}`}
                                            />

                                            <div className='flex gap-2.5 grow'>
                                                <div>
                                                    <h3 className='text-sm text-left text-sky-300'>{capitulo.nombre}</h3>
                                                    <p className='text-slate-100'>{capitulo.titulo}</p>
                                                </div>
                                            </div>
                                        </button>

                                        {claseAbierta === capIdx && (
                                            <div
                                                id={capitulo.id}
                                                role='region'
                                                aria-labelledby={`${capitulo.id}-button`}
                                                className='bg-slate-900/60 overflow-hidden rounded-xl mx-3 mb-3'
                                            >
                                                <ul className='py-2'>
                                                    {capitulo.videos.map((v) => {
                                                        const indexReal = curso.videos.findIndex((vid) => vid.id === v.id)
                                                        return (
                                                            <li key={v.id}>
                                                                <button
                                                                    type='button'
                                                                    className='text-sm relative overflow-hidden px-4 py-2 hover:bg-slate-800 transition w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 text-slate-100 text-left cursor-pointer'
                                                                    onClick={() => navigate(`/dashboard/cursos/${curso.id}/leccion/${indexReal}`)}
                                                                >
                                                                    <p className='grow text-balance flex items-center gap-1'>{v.titulo}</p>
                                                                    <span className='text-sky-300 block min-w-13 text-right'>{v.duracion}</span>
                                                                </button>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default CursoDetalle
