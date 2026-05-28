import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cursosData } from "../data/cursosData";
import Cuestionario from "./Cuestionario";
import CronometroCurso from "./CronometroCurso";

const FlipBookPDF = lazy(() => import("./FlipBookPDF"));

function CursoLeccion() {
  const { id, leccionId = "0" } = useParams();
  const navigate = useNavigate();
  const curso = cursosData.find((c) => c.id === id);
  const videos = curso?.videos || [];
  const indiceLeccion = Number.parseInt(leccionId, 10);
  const indiceInicial = Number.isNaN(indiceLeccion)
    ? 0
    : Math.min(Math.max(indiceLeccion, 0), Math.max(videos.length - 1, 0));

  const [videoActual, setVideoActual] = useState(indiceInicial);
  const videoTopRef = useRef(null);
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [seccionAbierta, setSeccionAbierta] = useState(0);

  const [vistos, setVistos] = useState(() => {
    const guardados = localStorage.getItem(`vistos-${id}`);
    return guardados ? new Set(JSON.parse(guardados)) : new Set();
  });

  const cursoCompleto =
    videos.length > 0 && videos.every((v) => vistos.has(v.id));

  const video = videos[videoActual] || {
    id: 0,
    titulo: "Contenido no disponible",
    duracion: "0:00",
  };
  const videoSrc = curso?.pdf || "/pdf/documento.pdf";

  const totalSegundos = videos.reduce((acc, v) => {
    const [mm, ss] = (v.duracion || "0:00").split(":").map(Number);
    if (Number.isNaN(mm) || Number.isNaN(ss)) return acc;
    return acc + mm * 60 + ss;
  }, 0);

  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.round((totalSegundos % 3600) / 60);
  const duracionTotal = horas > 0 ? `${horas}h ${minutos}m` : `${minutos}m`;

  const chunks = [];
  const chunkSize = Math.max(1, Math.ceil(videos.length / 3));
  for (let i = 0; i < videos.length; i += chunkSize) {
    chunks.push(videos.slice(i, i + chunkSize));
  }

  const capitulos = chunks.map((videosChunk, idx) => ({
    id: `capitulo-${idx + 1}`,
    nombre: `Capitulo ${idx + 1}`,
    titulo:
      idx === 0
        ? "Primeros pasos"
        : idx === 1
          ? "Desarrollo"
          : "Cierre y evaluacion",
    videos: videosChunk,
  }));

  const seccionActual = capitulos.find((capitulo) =>
    capitulo.videos.some((v) => v.id === video.id),
  );

  const obtenerResumenLeccion = (tituloLeccion, nombreCurso) => {
    const texto = (tituloLeccion || "").toLowerCase();

    if (
      texto.includes("bienvenida") ||
      texto.includes("introducción") ||
      texto.includes("objetivo")
    ) {
      return "Presenta el contexto inicial, objetivos de aprendizaje y recomendaciones para avanzar en el curso.";
    }
    if (
      texto.includes("reglamento") ||
      texto.includes("normativa") ||
      texto.includes("permiso")
    ) {
      return "Explica las reglas clave, criterios de cumplimiento y controles que debes aplicar durante la actividad.";
    }
    if (
      texto.includes("inspección") ||
      texto.includes("uso") ||
      texto.includes("epp")
    ) {
      return "Describe la preparación previa, la verificación de condiciones y el uso correcto de los elementos de seguridad.";
    }
    if (
      texto.includes("emergencia") ||
      texto.includes("rescate") ||
      texto.includes("evacuación")
    ) {
      return "Detalla el protocolo de respuesta, roles del equipo y acciones para actuar de forma segura ante incidentes.";
    }

    return `Leccion enfocada en ${tituloLeccion.toLowerCase()} dentro del curso ${nombreCurso.toLowerCase()}, con aplicacion practica en el trabajo diario.`;
  };

  const resumenLeccion = obtenerResumenLeccion(
    video.titulo,
    curso?.nombre || "curso",
  );

  const obtenerPuntosLeccion = (tituloLeccion, cursoActual) => {
    return [
      `Tema clave: ${tituloLeccion}.`,
      `Enfoque del curso: ${cursoActual.categoria} (${cursoActual.nivel}).`,
      `Aplicacion practica para ${cursoActual.nombre.toLowerCase()}.`,
      `Objetivo de la leccion: comprender y ejecutar ${tituloLeccion.toLowerCase()} con criterios de seguridad.`,
      `Buenas practicas recomendadas: seguir procedimientos, validar condiciones y reportar desviaciones.`,
      `Competencia desarrollada: toma de decisiones preventivas durante la operacion.`,
      `Relacion con el curso: esta leccion aporta al cumplimiento de los estandares de ${cursoActual.categoria.toLowerCase()}.`,
      `Resultado esperado: aplicar lo aprendido en escenarios reales del entorno laboral.`,
    ];
  };

  const puntosLeccionActual = obtenerPuntosLeccion(
    video.titulo,
    curso || { categoria: "General", nivel: "Basico", nombre: "Curso" },
  );
  const objetivosLeccion = [
    `Comprender ${video.titulo.toLowerCase()} en el contexto de ${(curso?.nombre || "curso").toLowerCase()}.`,
    `Aplicar controles de ${(curso?.categoria || "seguridad").toLowerCase()} con enfoque ${(curso?.nivel || "basico").toLowerCase()}.`,
    "Identificar buenas practicas para ejecutar la actividad de forma segura.",
    "Preparar la siguiente leccion con una base operativa clara.",
  ];

  const flujoLeccion = [
    "Revisar el contexto y los riesgos principales de la actividad.",
    "Aplicar el procedimiento recomendado paso a paso.",
    "Validar criterios de seguridad y cumplimiento.",
    "Cerrar con un checklist practico para ejecucion en campo.",
  ];

  /*     const marcarVisto = (videoId) => {
        setVistos((prev) => {
            const nuevo = new Set(prev)
            nuevo.add(videoId)
            localStorage.setItem(`vistos-${id}`, JSON.stringify([...nuevo]))
            return nuevo
        })
    } */

  useEffect(() => {
    if (!videoTopRef.current) return;

    const target = videoTopRef.current;
    const scrollContainer = target.closest(".overflow-y-auto");
    const headerOffset = 90;

    if (scrollContainer) {
      const targetTop =
        target.getBoundingClientRect().top -
        scrollContainer.getBoundingClientRect().top;
      scrollContainer.scrollTo({
        top: Math.max(0, scrollContainer.scrollTop + targetTop - headerOffset),
        behavior: "auto",
      });
      return;
    }

    const absoluteTop = window.scrollY + target.getBoundingClientRect().top;
    window.scrollTo({
      top: Math.max(0, absoluteTop - headerOffset),
      behavior: "auto",
    });
  }, [indiceInicial, id]);

  if (!curso) {
    return (
      <section className="py-16 text-center text-slate-300">
        <p className="text-lg font-semibold">Curso no encontrado.</p>
        <Link
          to="/dashboard/cursos"
          className="mt-4 inline-block text-sm font-semibold text-sky-300 hover:underline"
        >
          Volver a cursos
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-transparent text-slate-100">
      <div className="mx-auto grid max-w-screen-2xl gap-6 lg:grid-cols-[1fr_332px]">
        <nav
          ref={videoTopRef}
          className="scroll-mt-24 text-slate-400 col-[1/2] lg:col-[1/3] row-[1/2] flex flex-wrap gap-2 px-2 lg:px-0 mb-0!"
        >
          <Link
            to="/dashboard/cursos"
            className="transition-colors hover:underline"
          >
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sky-300 text-ellipsis overflow-hidden w-[20ch] md:w-auto whitespace-nowrap">
            {curso.nombre}
          </span>
        </nav>
        {/*   <div className='bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between border-b border-white/5'>
                            <div className='flex items-center gap-3'>
                                <svg className='w-5 h-5 text-sky-400' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z' />
                                </svg>
                                <div>
                                    <h3 className='text-sm font-semibold text-slate-100'>{video.titulo}</h3>
                                    <p className='text-xs text-slate-400'>Documento PDF</p>
                                </div>
                            </div>
                            <a
                                href={videoSrc}
                                download
                                className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-semibold transition'
                            >
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                                </svg>
                                Descargar
                            </a>
                        </div> */}
        <div className="relative col-[1/2] row-[2/3]">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <svg className="animate-spin h-8 w-8 text-sky-400 mb-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-sm font-semibold">Cargando visor de PDF...</p>
              </div>
            }>
              <FlipBookPDF key={videoSrc} pdfUrl={videoSrc} />
            </Suspense>
          </div>

          {/* <div className="mt-4 flex items-center gap-3 px-2 sm:px-0">
            <img
              src={curso.imagen || "/img/seguridad.webp"}
              className="w-12 h-12 rounded-xl object-cover border border-white/10"
              alt="Academia ASA"
              width="48"
              height="48"
            />
            <div>
              <p className="text-slate-300 text-sm">Presentado por</p>
              <p className="text-slate-100 font-semibold">Academia ASA</p>
            </div>
          </div> */}
        </div>

       <section className="col-[1/2] lg:col-[2/3] row-[4/5] lg:row-[2/6] rounded-2xl bg-slate-900/60 border border-white/10 p-4 sm:p-5 mx-2 lg:mx-0 h-fit">
          <h2 className="text-lg md:text-xl font-bold">Contenido del curso:</h2>
          <div className="mt-3 flex items-center gap-2 text-slate-400 text-sm flex-wrap">
          {/*   <span>{capitulos.length} secciones</span>
            <span aria-hidden="true">•</span>
            <span>{curso.videos.length} clases</span>
            <span aria-hidden="true">•</span>
            <span>{duracionTotal} de duracion total</span> */}
                      <span className="text-slate-300 text-sm">Después de leer todos los PDF's puedes pasar a resolver el cuestionario para obtener tu certificado.</span>
          </div>

      {/*     <ul className="mt-4 flex flex-col gap-y-4">
            {capitulos.map((capitulo, capIdx) => (
              <li
                key={capitulo.id}
                className="rounded-2xl bg-slate-900/60 border border-white/10"
              >
                <div className="transition-[grid-template-rows] grid">
                  <button
                    type="button"
                    onClick={() => {
                      setSeccionAbierta((prev) =>
                        prev === capIdx ? -1 : capIdx,
                      );
                    }}
                    className="p-4 cursor-pointer relative select-none flex items-center justify-between w-full"
                    aria-expanded={seccionAbierta === capIdx}
                  >
                    <div className="flex gap-2.5 grow text-left">
                      <div>
                        <h3 className="text-sm text-sky-300">
                          {capitulo.nombre}
                        </h3>
                        <p className="text-slate-100">{capitulo.titulo}</p>
                      </div>
                    </div>
                    <svg
                      width="29"
                      height="30"
                      viewBox="0 0 29 30"
                      fill="none"
                      className={`transition-transform ${seccionAbierta === capIdx ? "rotate-90" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.875 22.25L18.125 15L10.875 7.75"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {seccionAbierta === capIdx && (
                    <div className="bg-slate-900/60 overflow-hidden rounded-xl mx-3 mb-3">
                      <ul className="py-2">
                        {capitulo.videos.map((v) => {
                          const indexReal = curso.videos.findIndex(
                            (vid) => vid.id === v.id,
                          );
                          const completado = vistos.has(v.id);
                          const activo = indexReal === videoActual;
                          const desbloqueado = true;

                          return (
                            <li key={v.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  if (desbloqueado) {
                                    setVideoActual(indexReal);
                                    setMostrarQuiz(false);
                                    navigate(
                                      `/dashboard/cursos/${id}/leccion/${indexReal}`,
                                    );
                                  }
                                }}
                                disabled={!desbloqueado}
                                className={`text-sm relative overflow-hidden px-4 py-2 transition w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 text-left ${
                                  !desbloqueado
                                    ? "opacity-55 cursor-not-allowed"
                                    : activo
                                      ? "bg-sky-400/15 text-sky-200"
                                      : "hover:bg-slate-800 text-slate-100"
                                }`}
                              >
                                <p className="grow text-balance flex items-center gap-2">
                                  <span className="text-xs">
                                    {completado ? "✓" : indexReal + 1}
                                  </span>
                                  {v.titulo}
                                </p>
                                <span className="text-sky-300 block min-w-13 text-right">
                                  {v.duracion}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul> */}

          <div className="mt-5 flex flex-wrap gap-3">
            {cursoCompleto ? (
              <Link
                to={`/dashboard/cursos/${id}/formulario`}
                className="rounded-xl border border-sky-400/30 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/25"
              >
                Ir a la evaluacion del curso
              </Link>
            ) : (
              <>
                <CronometroCurso minutos={15} id={id} />
                <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-400">
                  Despues de terminar el tiempo ,pase a resolver el cuestionario para obter tu certificado
                </span>
              </>
            )}
          </div>
        </section> 

        <div className="col-[1/2] row-[3/4] px-2 lg:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance">
            {curso.nombre}
          </h1>
          <section className="mt-6 rounded-2xl  bg-slate-900/60 p-4 sm:p-5">
            <div className="grid gap-6">
              <h2 className="text-2xl md:text-3xl font-bold text-pretty">
                {videoActual + 1}. {video.titulo}
              </h2>

              <section className="flex gap-3 mb-1">
                <img
                  src={curso.imagen || "/img/seguridad.webp"}
                  className="w-10 h-10 rounded-2xl object-cover"
                  alt="Avatar del instructor"
                  width="60"
                  height="60"
                />
                <div>
                  <h4 className="text-sky-300">Academia ASA</h4>
                  <p className="text-slate-400 text-sm">Instructor del curso</p>
                </div>
              </section>

              <div className="max-w-211.5 text-slate-300 space-y-5">
                <div>
                  <h3 className="text-slate-100 font-bold text-lg mb-2">
                    Introduccion
                  </h3>
                  <p>
                    {resumenLeccion} En esta leccion trabajas una duracion
                    estimada de {video.duracion}.
                    {curso.videos[videoActual + 1]
                      ? ` Luego continuas con: ${curso.videos[videoActual + 1].titulo}.`
                      : " Esta es la ultima leccion del curso."}
                  </p>
                </div>

                <div>
                  <h3 className="text-slate-100 font-bold text-lg mb-2">
                    Objetivos de la leccion
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {objetivosLeccion.map((objetivo) => (
                      <li key={`objetivo-${objetivo}`}>{objetivo}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-slate-100 font-bold text-lg mb-2">
                    Seccion actual:
                  </h3>
                  {/* <p>
                    {seccionActual
                      ? `${seccionActual.nombre}: ${seccionActual.titulo}`
                      : "Seccion activa"}
                  </p> */}
                </div>

                <div>
                  <h3 className="text-slate-100 font-bold text-lg mb-2">
                    Flujo recomendado
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1">
                    {flujoLeccion.map((paso) => (
                      <li key={`paso-${paso}`}>{paso}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-slate-100 font-bold text-lg mb-2">
                    Puntos clave
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {puntosLeccionActual.map((punto) => (
                      <li key={`punto-${punto}`}>{punto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {mostrarQuiz && (
          <div className="col-[1/2] lg:col-[1/3] row-[6/7] px-2 lg:px-0">
            <section className="rounded-2xl border border-white/15 bg-slate-900/60 p-5 shadow-sm backdrop-blur-md sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Cuestionario final
                  </h3>
                  <p className="text-xs text-slate-400">
                    Las preguntas se presentan en orden aleatorio
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMostrarQuiz(false)}
                  className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800/70"
                >
                  Volver a videos
                </button>
              </div>
              <Cuestionario
                preguntas={curso.preguntas}
                onVolver={() => setMostrarQuiz(false)}
              />
            </section>
          </div>
        )}
      </div>
    </section>
  );
}

export default CursoLeccion;
