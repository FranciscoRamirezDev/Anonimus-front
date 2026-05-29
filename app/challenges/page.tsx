"use client";

import React, { useState } from "react";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useAsync } from "@/hooks/useAsync";
import { useRetoDates } from "@/hooks/useRetoDates";
import { getChallengesByUser, updateReto } from "@/services/challenges";

export default function ChallengesPage() {

    const router = useRouter();
    const user = useUserInfo();
    const { data: retos, loading: retosLoading, error: retosError, reload } = useAsync(
        () => (user ? getChallengesByUser(user.id_usuario) : Promise.resolve([])),
        [user?.id_usuario]
    );
    const { dates, markCompleted, clearCompleted } = useRetoDates(user?.id_usuario);

    const [draft, setDraft] = useState<Record<number, number>>({});
    const [savingId, setSavingId] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [highlightId, setHighlightId] = useState<number | null>(null);
    const [roadmapOpen, setRoadmapOpen] = useState(false);

    const retosList = retos ?? [];
    // Barra general = promedio del progreso real de cada reto.
    const overall = retosList.length
        ? Math.round(retosList.reduce((sum, r) => sum + (r.progreso_pct ?? 0), 0) / retosList.length)
        : 0;

    const handleSave = async (idReto: number, pct: number) => {
        const value = Math.max(0, Math.min(100, Math.round(pct)));
        setSavingId(idReto);
        setFeedback(null);
        try {
            await updateReto(idReto, value); // PUT /retos/{id} -> persiste el progreso real
            if (value >= 100) markCompleted(idReto);
            else clearCompleted(idReto);
            setDraft((d) => ({ ...d, [idReto]: value }));
            reload();
        } catch (e) {
            setFeedback(e instanceof Error ? e.message : "No se pudo actualizar el reto.");
        } finally {
            setSavingId(null);
        }
    };

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

    // Desde el roadmap, llevar y resaltar la carta del reto en "Mis Retos".
    const goToReto = (id: number) => {
        setHighlightId(id);
        document.getElementById(`reto-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        window.setTimeout(() => setHighlightId((cur) => (cur === id ? null : cur)), 1600);
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen relative overflow-x-hidden font-body bg-[#f7f9fc]">
            <style dangerouslySetInnerHTML={{
                __html: `
        body, html, [class*="font-body"], .font-body {
            font-family: 'Be Vietnam Pro', sans-serif !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        .font-headline,
        [class*="font-headline"] {
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .glass-panel {
            background-color: rgba(247, 249, 252, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        .progress-gradient {
            background: linear-gradient(90deg, #7049b3, #006974, #7049b3);
            background-size: 200% 200%;
            animation: gradient-move 3s ease infinite;
        }

        @keyframes gradient-move {
            0% {
                background-position: 0% 50%;
            }

            50% {
                background-position: 100% 50%;
            }

            100% {
                background-position: 0% 50%;
            }
        }

        .blob-bg {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: -1;
            opacity: 0.6;
        }

        /* Posicionamiento de los elementos decorativos de fondo */
        .blob-1 {
            top: -10%;
            left: -10%;
            width: 40vw;
            height: 40vw;
            background-color: #d0b4ff;
        }

        .blob-2 {
            bottom: -20%;
            right: -10%;
            width: 50vw;
            height: 50vw;
            background-color: #93f1ff;
        }

        .blob-3 {
            top: 40%;
            left: 30%;
            width: 30vw;
            height: 30vw;
            background-color: #fff176;
            opacity: 0.3;
        }

        /* JSON injected styles */
        .top-nav-bg {
            background-color: rgba(247, 249, 252, 0.7);
            backdrop-filter: blur(24px);
        }

        .shadow-ambient {
            box-shadow: 0px 20px 40px rgba(45, 51, 56, 0.06);
        }

        .bottom-nav-bg {
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(16px);
        }
      `}} />

            {/* Ambient Background Blobs */}
            <div className="blob-bg blob-1"></div>
            <div className="blob-bg blob-2"></div>
            <div className="blob-bg blob-3"></div>

            {/* Barra de navegación superior con efecto de desenfoque (Glass) */}
            <nav className="fixed top-0 w-full z-50 glass no-line transition-all duration-200">
                <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto shadow-[0px_20px_40px_rgba(45,51,56,0.06)]">
                    <div className="text-2xl font-bold tracking-tight text-primary font-headline hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out" onClick={() => router.push("/dashboard")}>Anonimus {" "}❤️‍🩹</div>
                    <div className="hidden md:flex space-x-8">
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out cursor-pointer"
                            onClick={() => router.push("/communities")}
                        >
                            Comunidades
                        </a>
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out cursor-pointer"
                            onClick={() => router.push("/challenges")}
                        >
                            Retos
                        </a>
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out cursor-pointer"
                            onClick={() => router.push("/experiences")}
                        >
                            Muro de Experiencias
                        </a>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300 ease-out">
                            <span className="font-headline text-sm font-semibold text-primary">{user?.alias ?? "Mi Alias"}</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Layout vertical: 1) explicación · 2) progreso general (roadmap acordeón) · 3) Mis Retos */}
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-32 space-y-8">
                {/* 1) Explicación: cómo funcionan los retos (ancho completo) */}
                <aside>
                    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary-container/30 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">flag</span>
                            </div>
                            <h3 className="font-headline font-semibold text-base text-on-surface">¿Cómo funcionan los retos?</h3>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                            Al unirte, recibes una serie de retos personales pensados para acompañar tu proceso,
                            un paso a la vez. Avanza a tu propio ritmo: no hay prisa ni comparación.
                        </p>
                        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-xl shrink-0">tune</span>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    En cada reto indicas tu <span className="font-semibold text-on-surface">porcentaje de avance</span> y lo guardas.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-xl shrink-0">cloud_done</span>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Tu progreso queda <span className="font-semibold text-on-surface">guardado</span> y disponible cada vez que regreses.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-xl shrink-0">check_circle</span>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Al llegar al <span className="font-semibold text-on-surface">100%</span> el reto se marca como completado en tu roadmap.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-xl shrink-0">trending_up</span>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Cada reto cumplido suma a tu <span className="font-semibold text-on-surface">progreso general</span>.
                                </p>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* 2) Progreso general (ancho completo) + roadmap colapsable */}
                <section className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-[60px] opacity-40 -mr-20 -mt-20"></div>
                        <div className="relative z-10 space-y-8">
                            {/* Barra de progreso general (promedio de todos los retos) */}
                            <div>
                                <div className="flex items-end justify-between mb-3">
                                    <div>
                                        <h2 className="font-headline font-bold text-2xl text-on-surface">Tu progreso general</h2>
                                        <p className="text-sm text-on-surface-variant">Promedio de avance de todos tus retos.</p>
                                    </div>
                                    <span className="font-headline font-bold text-3xl text-primary">{overall}%</span>
                                </div>
                                <div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden">
                                    <div
                                        className="h-full progress-gradient rounded-full transition-all duration-700"
                                        style={{ width: `${overall}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Roadmap de los retos (acordeón, inicia cerrado) */}
                            {retosList.length > 0 && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setRoadmapOpen((o) => !o)}
                                        aria-expanded={roadmapOpen}
                                        className="w-full flex items-center justify-between gap-3 py-2 text-on-surface font-headline font-semibold hover:text-primary transition-colors cursor-pointer"
                                    >
                                        <span>Roadmap de tus retos ({retosList.length})</span>
                                        <span className={`material-symbols-outlined transition-transform ${roadmapOpen ? "rotate-180" : ""}`}>
                                            expand_more
                                        </span>
                                    </button>
                                    {roadmapOpen && (
                                    <div className="space-y-4 mt-4">
                                    {retosList.map((reto, i) => {
                                        const isDone = (reto.progreso_pct ?? 0) >= 100;
                                        const completedAt = dates[reto.id_reto];
                                        return (
                                            <button
                                                key={reto.id_reto}
                                                type="button"
                                                onClick={() => goToReto(reto.id_reto)}
                                                className="w-full flex items-center gap-4 text-left group cursor-pointer"
                                                title="Ver este reto en 'Mis Retos'"
                                            >
                                                <div
                                                    className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 shadow ${
                                                        isDone
                                                            ? "bg-primary text-on-primary"
                                                            : "bg-surface-container-lowest border-2 border-surface-container-highest text-on-surface-variant"
                                                    }`}
                                                >
                                                    {isDone ? (
                                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                            check
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm font-bold font-headline">{i + 1}</span>
                                                    )}
                                                </div>
                                                <div
                                                    className={`flex-grow flex items-center justify-between gap-3 p-4 rounded-lg border transition-colors group-hover:border-primary/40 ${
                                                        isDone
                                                            ? "bg-surface border-outline-variant/10"
                                                            : "bg-surface-container-low/40 border-transparent"
                                                    }`}
                                                >
                                                    <span className={`text-sm font-medium ${isDone ? "text-on-surface" : "text-on-surface-variant"}`}>
                                                        {reto.titulo}
                                                    </span>
                                                    {isDone ? (
                                                        <span className="text-[10px] text-primary bg-primary-container px-2 py-0.5 rounded-full font-headline shrink-0">
                                                            {completedAt ? `Completado el ${formatDate(completedAt)}` : "Completado"}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-on-surface-variant shrink-0">{reto.progreso_pct ?? 0}%</span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                    </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>

                {/* 3) Mis Retos a todo el ancho (cartas en 2 columnas) */}
                <section>
                    <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">Mis Retos</h2>
                        <p className="text-sm text-on-surface-variant mb-6">
                            Indica tu porcentaje de avance en cada reto y guárdalo: se actualiza en tu cuenta.
                        </p>

                        {retosLoading && !retos && <p className="text-on-surface-variant">Cargando retos…</p>}
                        {retosError && <p className="text-error">{retosError}</p>}
                        {feedback && <p className="text-error mb-4">{feedback}</p>}
                        {!retosLoading && !retosError && retosList.length === 0 && (
                            <p className="text-on-surface-variant">Aún no tienes retos asignados.</p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {retosList.map((reto) => {
                                const pct = reto.progreso_pct ?? 0;
                                const done = pct >= 100;
                                const value = draft[reto.id_reto] ?? pct;
                                const saving = savingId === reto.id_reto;
                                return (
                                    <div
                                        key={reto.id_reto}
                                        id={`reto-${reto.id_reto}`}
                                        className={`bg-surface-container-lowest rounded-xl p-6 shadow-ambient flex flex-col justify-between gap-6 scroll-mt-28 transition-shadow ${
                                            highlightId === reto.id_reto ? "ring-2 ring-primary" : ""
                                        }`}
                                    >
                                        <div className="flex justify-between items-start gap-3">
                                            <h3 className="font-headline font-semibold text-xl text-primary">{reto.titulo}</h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-wide shrink-0 ${
                                                    done
                                                        ? "bg-primary-container text-on-primary-container"
                                                        : "bg-tertiary-container text-on-tertiary-container"
                                                }`}
                                            >
                                                {done ? "Completado" : "En Progreso"}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-2 text-on-surface-variant font-medium">
                                                <span>Tu progreso</span>
                                                <span>{pct}%</span>
                                            </div>
                                            <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                                                <div
                                                    className="h-full progress-gradient rounded-full transition-all duration-500"
                                                    style={{ width: `${pct}%` }}
                                                ></div>
                                            </div>

                                            {/* Editor de porcentaje */}
                                            <div className="flex flex-wrap items-center gap-3 mt-5">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        value={value}
                                                        onChange={(e) =>
                                                            setDraft((d) => ({
                                                                ...d,
                                                                [reto.id_reto]: Number(e.target.value),
                                                            }))
                                                        }
                                                        className="w-20 bg-surface-container-low rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                                                    />
                                                    <span className="text-sm text-on-surface-variant">%</span>
                                                </div>
                                                <button
                                                    onClick={() => handleSave(reto.id_reto, value)}
                                                    disabled={saving || value === pct}
                                                    className="text-xs bg-primary text-on-primary px-4 py-2 rounded-full hover:bg-primary-dim transition-colors font-headline font-semibold disabled:opacity-40"
                                                >
                                                    {saving ? "Guardando…" : "Guardar avance"}
                                                </button>
                                                {!done && (
                                                    <button
                                                        onClick={() => handleSave(reto.id_reto, 100)}
                                                        disabled={saving}
                                                        className="text-xs bg-surface-container text-on-surface px-4 py-2 rounded-full hover:bg-surface-container-high transition-colors font-headline font-semibold disabled:opacity-40"
                                                    >
                                                        Marcar completado
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
            </div>

            {/* Botón de emergencia flotante (SOS) */}
            <button className="fixed bottom-28 md:bottom-12 right-6 md:right-12 z-50 flex items-center gap-3 bg-error text-on-error px-6 py-4 rounded-full shadow-[0px_10px_30px_rgba(172,49,73,0.3)] hover:scale-105 hover:bg-error-dim transition-all duration-300 group">
                <span className="material-symbols-outlined animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                    sos
                </span>
                <span className="font-headline font-bold text-sm tracking-wide font-headline">Necesito Ayuda Ahora</span>
            </button>

            {/* Navegación móvil inferior */}
            <nav className="md:hidden fixed bottom-0 w-full rounded-t-[3rem] z-50 bottom-nav-bg shadow-[0px_-10px_30px_rgba(0,0,0,0.04)] flex justify-around items-center px-6 pb-6 pt-3">
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors spring-stiffness-100 duration-500 rounded-lg p-2 cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                >
                    <span className="material-symbols-outlined mb-1">home</span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Inicio</span>
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors spring-stiffness-100 duration-500 rounded-lg p-2 cursor-pointer"
                    onClick={() => router.push("/communities")}
                >
                    <span className="material-symbols-outlined mb-1">group</span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Grupos</span>
                </a>
                <a
                    className="flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 rounded-full px-5 py-2 transition-colors spring-stiffness-100 duration-500 cursor-pointer"
                    onClick={() => router.push("/challenges")}
                >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                        military_tech
                    </span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Retos</span>
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors spring-stiffness-100 duration-500 rounded-lg p-2 cursor-pointer"
                    onClick={() => router.push("/experiences")}
                >
                    <span className="material-symbols-outlined mb-1">forum</span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Muro</span>
                </a>
            </nav>

            {/* Pie de página institucional */}
            <footer className="hidden md:block w-full py-12 px-8 bg-surface-container-low text-sm font-be-vietnam text-on-surface-variant font-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="text-lg font-bold text-on-surface font-headline">Caminos de Apoyo</div>
                    <div className="flex gap-6 justify-center md:justify-start">
                        <a className="hover:text-primary transition-colors" href="#">
                            Privacidad
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Términos
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Seguridad
                        </a>
                        <a className="hover:text-primary transition-colors" href="#">
                            Ayuda
                        </a>
                    </div>
                    <div className="text-right">© 2024 Caminos de Apoyo. Tu anonimato es nuestra prioridad.</div>
                </div>
            </footer>
        </div>
    );
}
