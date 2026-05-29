"use client";

import React from "react";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";

export default function ChallengesPage() {

    const router = useRouter();
    const user = useUserInfo();
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
                            onClick={() => router.push("/dashboard")}
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

            {/* Main Layout Grid */}
            <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Barra lateral: Lista de comunidades a las que se ha unido el usuario */}
                <aside className="hidden lg:block lg:col-span-3 space-y-8">
                    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-ambient">
                        <h3 className="font-headline font-semibold text-sm text-on-surface mb-6 font-headline">
                            Mi primer reto de consciencia
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-primary-container/30 text-primary flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                                    <span className="material-symbols-outlined">local_bar</span>
                                </div>
                                <div>
                                    <p className="font-medium text-xs text-on-surface">Superar el alcoholismo</p>
                                    <p className="text-[10px] text-on-surface-variant">Miembro activo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                                    <span className="material-symbols-outlined">smoking_rooms</span>
                                </div>
                                <div>
                                    <p className="font-medium text-xs text-on-surface">Dejar de fumar</p>
                                    <p className="text-[10px] text-on-surface-variant">Miembro activo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <div>
                                    <p className="font-medium text-xs text-on-surface">Manejo de ansiedad</p>
                                    <p className="text-[10px] text-on-surface-variant">Miembro activo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                                    <span className="material-symbols-outlined">restaurant</span>
                                </div>
                                <div>
                                    <p className="font-medium text-xs text-on-surface">Alimentación saludable</p>
                                    <p className="text-[10px] text-on-surface-variant">Miembro activo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                                    <span className="material-symbols-outlined">explore</span>
                                </div>
                                <div>
                                    <p className="font-medium text-xs text-on-surface">Otros hábitos</p>
                                    <p className="text-[10px] text-on-surface-variant">Miembro activo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Panel: Dashboard & Challenge */}
                <main className="lg:col-span-9 space-y-12">
                    {/* Timeline de Mi primer reto de consciencia (Renderizado en el card superior exactamente como en la imagen) */}
                    <section className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-ambient relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-[60px] opacity-40 -mr-20 -mt-20"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-container-highest before:to-transparent">

                                {/* Milestone 1 (Completed) */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-on-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            check
                                        </span>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-lg shadow-sm border border-outline-variant/10">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-on-surface text-sm">Día 1-2</div>
                                            <div className="text-[10px] text-primary bg-primary-container px-2 py-0.5 rounded-full font-headline">23/5/2026</div>
                                        </div>
                                        <div className="text-on-surface-variant text-xs line-through">Identificar los obstáculos.</div>
                                    </div>
                                </div>

                                {/* Milestone 2 (Completed) */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-on-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            check
                                        </span>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-lg shadow-sm border border-outline-variant/10">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-on-surface text-sm">Día 3-5</div>
                                            <div className="text-[10px] text-primary bg-primary-container px-2 py-0.5 rounded-full font-headline">23/5/2026</div>
                                        </div>
                                        <div className="text-on-surface-variant text-xs line-through">Implementar primera técnica.</div>
                                    </div>
                                </div>

                                {/* Milestone 3 (Current) */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-primary text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <span className="material-symbols-outlined text-sm">radio_button_unchecked</span>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-primary-container/20 p-4 rounded-lg shadow-sm border border-primary/20">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-primary text-sm">Día 6-7</div>
                                        </div>
                                        <div className="text-primary-dim text-xs font-medium">Evaluar el progreso semanal.</div>
                                        <div className="mt-2 flex justify-end">
                                            <button className="text-[10px] bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-dim transition-colors font-headline font-semibold">
                                                Completar Reto
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* Sección del Reto Actual (Estilo Bento Grid) */}
                    <section>
                        <h2 className="font-headline font-bold text-2xl text-on-surface mb-8">Reto Actual</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Challenge Status Card */}
                            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-headline font-semibold text-xl text-primary">De 3 cajetillas a 1 cajetilla</h3>
                                        <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-wide">
                                            En Progreso
                                        </span>
                                    </div>
                                    <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
                                        Reducción gradual y consciente del consumo diario. Enfócate en identificar los momentos de mayor ansiedad.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-on-surface-variant font-medium">
                                        <span>Progreso Semanal</span>
                                        <span>67%</span>
                                    </div>
                                    <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                                        <div className="h-full progress-gradient w-[67%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Línea de tiempo de hitos semanales */}
                            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient">
                                <h4 className="font-headline font-semibold text-lg text-on-surface mb-6 font-headline">Hitos de esta semana</h4>
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-container-highest before:to-transparent">
                                    {/* Milestone 1 (Completed) */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-on-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                check
                                            </span>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-lg shadow-sm border border-outline-variant/10">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-on-surface text-sm">Día 1-2</div>
                                            </div>
                                            <div className="text-on-surface-variant text-xs">Mantener máximo 2 cajetillas.</div>
                                        </div>
                                    </div>

                                    {/* Milestone 2 (Current) */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-primary text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <span className="material-symbols-outlined text-sm">radio_button_unchecked</span>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-primary-container/20 p-4 rounded-lg shadow-sm border border-primary/20">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-primary text-sm">Día 3-5</div>
                                            </div>
                                            <div className="text-primary-dim text-xs font-medium">Bajar a 1.5 cajetillas. (Hoy)</div>
                                        </div>
                                    </div>

                                    {/* Milestone 3 (Future) */}
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-highest text-outline shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <span className="material-symbols-outlined text-sm">lock</span>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] opacity-60">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-on-surface-variant text-sm">Día 6-7</div>
                                            </div>
                                            <div className="text-on-surface-variant text-xs">Meta: 1 cajetilla diaria.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
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
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors spring-stiffness-100 duration-500 rounded-lg p-2"
                    href="principal.html"
                >
                    <span className="material-symbols-outlined mb-1">home</span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Inicio</span>
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors spring-stiffness-100 duration-500 rounded-lg p-2"
                    href="principal.html#comunidades"
                >
                    <span className="material-symbols-outlined mb-1">group</span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Grupos</span>
                </a>
                <a
                    className="flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 rounded-full px-5 py-2 transition-colors spring-stiffness-100 duration-500"
                    href="profile.html"
                >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                        military_tech
                    </span>
                    <span className="font-plus-jakarta text-[10px] font-semibold">Retos</span>
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors spring-stiffness-100 duration-500 rounded-lg p-2"
                    href="seccion.html"
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
