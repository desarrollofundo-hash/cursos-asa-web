import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CronometroCurso = ({ minutos = 10, id }) => {
  const tiempoInicial = minutos * 60;

  const [tiempoRestante, setTiempoRestante] = useState(tiempoInicial);
  const [iniciado, setIniciado] = useState(false);

  // Reiniciar cuando el componente se monta
  useEffect(() => {
    setTiempoRestante(tiempoInicial);
    setIniciado(false);
  }, [id, tiempoInicial]);

  useEffect(() => {
    if (!iniciado) return;

    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, [iniciado]);

  const mins = Math.floor(tiempoRestante / 60);
  const secs = tiempoRestante % 60;

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {!iniciado ? (
        <button
          onClick={() => setIniciado(true)}
          className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/25 cursor-pointer"
        >
          ▶ Empezar curso
        </button>
      ) : tiempoRestante === 0 ? (
        <Link
          to={`/dashboard/cursos/${id}/formulario`}
          className="rounded-xl border border-sky-400/30 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/25"
        >
          Ir a la evaluación del curso
        </Link>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300">
          <p>
            Después de terminar el tiempo, pase a resolver el cuestionario para
            obtener tu certificado.
          </p>

          <span className="mt-2 block text-lg font-bold text-sky-300">
            ⏳ {String(mins).padStart(2, "0")}:
            {String(secs).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
};

export default CronometroCurso;