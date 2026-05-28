import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cursosData } from '../data/cursosData'
import { IconBadgePuzzle, IconLock,  IconPlayOutline, IconPlaySolid, IconSearch } from './icons'
import SearchableSelect from './SearchableSelect'

const normalizeText = (texto) =>
    texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

const toTitle = (texto) => `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`

function Cursos() {
    const [searchTerm, setSearchTerm] = useState('')
    const [nivelFiltro, setNivelFiltro] = useState('todos')
    const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

    const cursos = useMemo(
        () =>
            cursosData.map((c) => ({
                ...c,
                progreso: (() => {
                    try {
                        const guardados = localStorage.getItem(`vistos-${c.id}`)
                        if (!guardados) return 0
                        const vistos = JSON.parse(guardados)
                        if (!Array.isArray(vistos)) return 0
                        return Math.round((vistos.length / c.videos.length) * 100)
                    } catch {
                        return 0
                    }
                })(),
            })),
        [],
    )

    const niveles = useMemo(
        () => ['todos', ...new Set(cursos.map((curso) => curso.nivel.toLowerCase()))],
        [cursos],
    )

    const categorias = useMemo(
        () => ['todas', ...new Set(cursos.map((curso) => curso.categoria.toLowerCase()))],
        [cursos],
    )

    const cursosFiltrados = useMemo(() => {
        const termino = normalizeText(searchTerm.trim())

        return cursos.filter((curso) => {
            const coincideTexto =
                termino.length === 0 ||
                normalizeText(curso.nombre).includes(termino) ||
                normalizeText(curso.descripcion).includes(termino) ||
                normalizeText(curso.nivel).includes(termino) ||
                normalizeText(curso.categoria).includes(termino)

            const coincideNivel =
                nivelFiltro === 'todos' || normalizeText(curso.nivel) === nivelFiltro

            const coincideCategoria =
                categoriaFiltro === 'todas' || normalizeText(curso.categoria) === categoriaFiltro

            return coincideTexto && coincideNivel && coincideCategoria
        })
    }, [searchTerm, nivelFiltro, categoriaFiltro, cursos])

    const user = localStorage.getItem('auth-user')

    const nivelesOptions = useMemo(
        () =>
            niveles.map((nivel) => ({
                value: nivel,
                label:
                    nivel === 'todos' ? 'Todos los niveles' : toTitle(nivel),
            })),
        [niveles],
    )

    const categoriasOptions = useMemo(
        () =>
            categorias.map((categoria) => ({
                value: categoria,
                label:
                    categoria === 'todas' ? 'Todas las categorias' : toTitle(categoria),
            })),
        [categorias],
    )

    const getBadge = (curso) => {
        if (curso.progreso > 0) {
            return {
                text: 'En curso',
                className:
                    'from-emerald-500 via-emerald-400 to-emerald-500 border-emerald-300/50 text-emerald-950',
            }
        }

        return {
            text: 'Nuevo',
            className:
                'from-sky-500 via-sky-400 to-sky-500 border-sky-300/50 text-slate-950',
        }
    }

    return (
        <section className='px-1 pt-6 sm:pt-2 text-slate-200 sm:px-2 bg-slate-950/95'>
            <div className='mb-5 sm:mb-8'>
                <h1 className='text-xl font-bold text-slate-100 sm:text-2xl'>
                    Todos los cursos de la <span className='text-sky-400'>Academia</span>
                </h1>
                <p className='text-xs text-slate-400 sm:text-sm'>
                    Bienvenido{user ? ` ${user}` : ''}. Proximamente tendremos mas.
                </p>
            </div>

            <section>
                <h2 className='sr-only'>Cursos disponibles</h2>

                <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
                    <div className='relative w-full sm:w-64'>
                        <IconSearch className='pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
                        <input
                            id='courseSearch'
                            type='text'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Buscar cursos...'
                            className='app-input w-full rounded-lg border py-2 pr-3 pl-9 text-xs text-slate-100 placeholder:text-slate-400 transition-all duration-200 focus:outline-none'
                        />
                    </div>

                    <SearchableSelect
                        id='levelFilter'
                        value={nivelFiltro}
                        onChange={setNivelFiltro}
                        options={nivelesOptions}
                        placeholder='Nivel'
                        ariaLabel='Filtrar por nivel'
                    />

                    <SearchableSelect
                        id='categoryFilter'
                        value={categoriaFiltro}
                        onChange={setCategoriaFiltro}
                        options={categoriasOptions}
                        placeholder='Categoria'
                        ariaLabel='Filtrar por categoria'
                    />

                    <div className='hidden flex-1 sm:block' />

                    <p className='whitespace-nowrap text-xs text-slate-400'>
                        Mostrando{' '}
                        <span className='font-semibold text-slate-100'>
                            {cursosFiltrados.length}
                        </span>{' '}
                        de {cursos.length} cursos
                    </p>
                </div>

                <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {cursosFiltrados.map((curso) => {
                        const badge = getBadge(curso)

                        return (
                            <article
                                key={curso.id}
                                className='group relative h-full overflow-hidden rounded-xl border border-white/15 transition hover:contrast-105 before:absolute before:bottom-0 before:left-1/2 before:-z-10 before:h-full before:w-full before:-translate-x-1/2 before:translate-y-full before:bg-black/35 before:transition before:duration-200 hover:before:translate-y-3/4 focus-within:ring-2 focus-within:ring-sky-400/20'
                            >
                                <Link to={`/dashboard/cursos/${curso.id}`} className='relative isolate flex aspect-video h-full flex-col p-2'>
                                    <div className='absolute inset-0 z-0 bg-linear-to-br from-[#0b2447] via-[#10386a] to-[#021934]' />
                                    {curso.imagen ? (
                                        <img
                                            src={curso.imagen}
                                            alt={`Curso de ${curso.nombre}`}
                                            className='absolute inset-0 z-0 h-full w-full object-cover transform-gpu'
                                            loading='lazy'
                                            decoding='async'
                                        />
                                    ) : null}

                                    <div className='absolute inset-x-0 bottom-0 z-10 h-2/3 bg-linear-to-t from-black/65 to-transparent' />

                                    <div className='absolute top-2 right-2 z-20 inline-flex flex-wrap items-center gap-2 opacity-100 transition'>
                                        <span
                                            className={`relative isolate inline-flex items-center gap-1 overflow-hidden rounded-lg border bg-linear-to-br px-2.5 py-1 text-xs font-medium whitespace-nowrap shadow-[0_2px_8px_rgba(59,130,246,0.35),0_0_0_1px_--theme(--color-white/10%)] backdrop-blur-sm ${badge.className}`}
                                        >
                                            <IconBadgePuzzle className='relative z-10 h-3 w-3 flex-none' />
                                            <span className='relative z-10 font-bold'>{badge.text}</span>
                                        </span>
                                    </div>

                                    <div className='relative z-20 flex flex-1 flex-col gap-2 opacity-0 transition duration-300 group-hover:opacity-100' />

                                    <div className='relative z-20 mt-8 flex translate-y-1 flex-wrap items-end justify-between opacity-0 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
                                        <h3 className='mt-auto mb-2 ml-1 max-w-[28ch] text-balance text-sm leading-snug font-medium text-white'>
                                            {curso.nombre}
                                        </h3>

                                        <div className='flex w-full flex-wrap items-center justify-between'>
                                            <div className='flex items-center gap-4 text-sm text-slate-300'>
                                                <p className='flex items-center gap-1'>
                                                    <span className='flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/5 p-1'>
                                                        <IconPlayOutline className='ml-0.5 h-auto w-1.5 text-slate-300' />
                                                    </span>
                                                    Duracion: <span>{curso.duracion}</span>
                                                </p>
                                            </div>

                                            <span className='group relative isolate inline-flex h-8 w-auto items-center justify-center overflow-hidden rounded-lg border border-white px-3 text-center text-xs font-semibold text-white transition-all duration-300 hover:bg-white/5'>
                                                <span className='flex items-center gap-1.5'>
                                                    <IconPlaySolid className='h-4 w-auto' />
                                                    {curso.progreso > 0 ? 'Continuar' : 'Ir al curso'}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        )
                    })}

                    <article className='group relative h-full overflow-hidden rounded-2xl border border-white/10 opacity-80 transition hover:contrast-105 pointer-events-none blur-[0.6px]'>
                        <div className='relative isolate flex aspect-video h-full flex-col p-3 text-center'>
                            <div className='absolute inset-0 z-0 bg-linear-to-br from-slate-900 via-slate-950 to-black' />
                            <img
                                src='/img/seguridad.webp'
                                alt='Curso en desarrollo'
                                className='absolute inset-0 z-0 h-full w-full object-cover opacity-70 blur-sm'
                                loading='lazy'
                                decoding='async'
                            />
                            <div className='absolute inset-x-0 bottom-0 z-10 h-2/3 bg-linear-to-t from-black/70 to-transparent' />

                            <p className='absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-2 text-xs font-semibold text-slate-100 backdrop-blur-sm'>
                                <IconLock className='h-4 w-4' />
                                Nuevos cursos próximamente
                            </p>
                        </div>
                    </article>

                    {cursosFiltrados.length === 0 && (
                        <article className='app-surface-soft app-border col-span-full rounded-2xl border border-dashed p-6 text-center'>
                            <h3 className='text-sm font-semibold text-slate-200'>No encontramos cursos</h3>
                            <p className='mt-1 text-xs text-slate-400'>
                                Prueba con otro termino o limpia los filtros.
                            </p>
                        </article>
                    )}
                </div>
            </section>
        </section>
    )
}

export default Cursos