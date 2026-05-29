/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";

export default function TableroExperienciasPage() {
    const router = useRouter();
    const user = useUserInfo();

    return (
        <div className="antialiased min-h-screen flex flex-col relative overflow-x-hidden bg-[#f7f9fc] text-[#2d3338] font-body">
            <style dangerouslySetInnerHTML={{
                __html: `
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .material-symbols-outlined.fill {
            font-variation-settings: 'FILL' 1;
        }

        /* Support Blobs */
        .blob-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
        }

        .blob-1 {
            position: absolute;
            top: -10%;
            right: -5%;
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, rgba(147, 241, 255, 0.4) 0%, rgba(247, 249, 252, 0) 70%);
            border-radius: 50%;
        }

        .blob-2 {
            position: absolute;
            bottom: -20%;
            left: -10%;
            width: 60vw;
            height: 60vw;
            background: radial-gradient(circle, rgba(208, 180, 255, 0.3) 0%, rgba(247, 249, 252, 0) 70%);
            border-radius: 50%;
        }
      `}} />

            {/* Ambient Background Blobs */}
            <div className="blob-bg">
                <div className="blob-1"></div>
                <div className="blob-2"></div>
            </div>

            {/* Barra de navegación superior (Escritorio) */}
            <nav className="fixed top-0 w-full z-50 glass no-line transition-all duration-200">
                <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto shadow-[0px_20px_40px_rgba(45,51,56,0.06)]">
                    <div className="text-2xl font-bold tracking-tight text-primary font-headline hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out" onClick={() => router.push("/dashboard")}>Anonimus {" "}❤️‍🩹</div>
                    <div className="hidden md:flex space-x-8">
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out"
                            onClick={() => router.push("/dashboard")}
                        >
                            Comunidades
                        </a>
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out nav-retos"
                            onClick={() => router.push("/challenges")}
                        >
                            Retos
                        </a>
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out"
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

            {/* Main Canvas */}
            <main className="flex-grow pt-24 pb-32 md:pt-32 px-6 max-w-5xl mx-auto w-full relative z-10 flex flex-col gap-12">
                {/* Encabezado del Muro: Título y descripción principal */}
                <header className="text-center space-y-4 max-w-2xl mx-auto">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-tight">
                        Voces Anónimas, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Apoyo Real.
                        </span>
                    </h1>
                    <p className="text-on-surface-variant text-lg">Un espacio seguro para leer y compartir. Solo tú sabes quién eres.</p>
                </header>

                {/* Filters & Composer (Bento-ish layout) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Area de publicación (Composer): Donde el usuario escribe su experiencia */}
                    <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-dim">face</span>
                            </div>
                            <div className="flex-grow space-y-4">
                                <textarea
                                    className="w-full bg-transparent border-none focus:ring-0 resize-none text-lg text-on-surface placeholder:text-on-surface-variant/50 p-0 outline-none"
                                    placeholder="Comparte tu experiencia. Tu anonimato es nuestra prioridad..."
                                    rows={3}
                                ></textarea>
                                <div className="flex justify-between items-center pt-4">
                                    <div className="flex gap-2">
                                        <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
                                            <span className="material-symbols-outlined">mood</span>
                                        </button>
                                        <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low">
                                            <span className="material-symbols-outlined">label</span>
                                        </button>
                                    </div>
                                    <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-2.5 rounded-full font-medium shadow-[0px_10px_20px_rgba(45,51,56,0.06)] hover:scale-105 transition-transform duration-300">
                                        Publicar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filtros de navegación lateral: Recientes, Inspirador, Salas */}
                    <div className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4 shadow-[0px_20px_40px_rgba(45,51,56,0.06)]">
                        <h3 className="font-headline font-semibold text-on-surface">Explorar</h3>
                        <nav className="flex flex-col gap-2">
                            <button className="flex items-center justify-between w-full p-3 rounded-lg bg-surface-container-lowest text-primary shadow-sm hover:scale-105 transition-transform">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">schedule</span>
                                    Recientes
                                </span>
                            </button>
                            <button className="flex items-center justify-between w-full p-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">favorite</span>
                                    Inspirador
                                </span>
                            </button>
                            <button className="flex items-center justify-between w-full p-3 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">category</span>
                                    Por Sala
                                </span>
                            </button>
                        </nav>
                    </div>
                </section>

                {/* Muro de publicaciones (Feed): Lista de historias compartidas */}
                <section className="space-y-8">
                    {/* Post 1 */}
                    <article className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] hover:shadow-[0px_30px_50px_rgba(45,51,56,0.08)] transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                                C
                            </div>
                            <div>
                                <p className="font-headline font-semibold text-on-surface">Caminante #4829</p>
                                <p className="text-xs text-on-surface-variant">
                                    Hace 2 horas en <span className="text-primary">Ansiedad</span>
                                </p>
                            </div>
                        </div>
                        <p className="text-on-surface leading-relaxed mb-6 text-lg">
                            Hoy logré salir de casa después de tres días sin energía. Solo fui a la tienda de la esquina, pero para mí
                            es un gran paso. A veces las pequeñas victorias son las que más cuestan.
                        </p>
                        <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/15">
                            <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-surface-container-low">
                                <span className="material-symbols-outlined text-xl">favorite</span>
                                <span className="text-sm font-medium">Me siento identificado</span>
                            </button>
                            <button className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors px-3 py-1.5 rounded-full hover:bg-surface-container-low">
                                <span className="material-symbols-outlined text-xl">healing</span>
                                <span className="text-sm font-medium">Esto me ayudó</span>
                            </button>
                        </div>
                    </article>

                    {/* Post 2 (Slightly varied visual treatment for rhythm) */}
                    <article className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-sm">
                                C
                            </div>
                            <div>
                                <p className="font-headline font-semibold text-on-surface">Caminante #9102</p>
                                <p className="text-xs text-on-surface-variant">
                                    Hace 5 horas en <span className="text-primary">Duelo</span>
                                </p>
                            </div>
                        </div>
                        <p className="text-on-surface leading-relaxed mb-6 text-lg relative z-10">
                            Escribir una carta que nunca enviaré me ha quitado un peso enorme de encima. Gracias a quien lo sugirió en
                            este foro la semana pasada. Realmente funciona.
                        </p>
                        <div className="flex items-center gap-4 pt-4 relative z-10 border-t border-outline-variant/15">
                            <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-surface-container">
                                <span className="material-symbols-outlined text-xl">favorite</span>
                            </button>
                            <button className="flex items-center gap-2 text-secondary px-3 py-1.5 rounded-full bg-secondary-container/50">
                                <span className="material-symbols-outlined text-xl fill">healing</span>
                                <span className="text-sm font-medium">Esto me ayudó</span>
                            </button>
                        </div>
                    </article>
                </section>
            </main>

            {/* Navegación móvil inferior */}
            <nav className="md:hidden fixed bottom-0 w-full rounded-t-[3rem] z-50 bg-white/80 backdrop-blur-lg shadow-[0px_-10px_30px_rgba(0,0,0,0.04)] flex justify-around items-center px-6 pb-6 pt-3 font-plus-jakarta text-[10px] font-semibold">
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 rounded-full px-4 py-2 transition-colors"
                    href="principal.html"
                >
                    <span className="material-symbols-outlined mb-1">home</span>
                    Inicio
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 rounded-full px-4 py-2 transition-colors"
                    href="principal.html#comunidades"
                >
                    <span className="material-symbols-outlined mb-1">group</span>
                    Grupos
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 rounded-full px-4 py-2 transition-colors nav-retos"
                    href="login.html"
                >
                    <span className="material-symbols-outlined mb-1">military_tech</span>
                    Retos
                </a>
                <a
                    className="flex flex-col items-center justify-center bg-primary-container/30 text-primary rounded-full px-5 py-2"
                    href="seccion.html"
                >
                    <span className="material-symbols-outlined mb-1 fill">forum</span>
                    Muro
                </a>
            </nav>

            {/* Pie de página institucional */}
            <footer className="hidden md:block w-full py-12 px-8 bg-surface-container-low text-sm font-be-vietnam text-on-surface-variant">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="text-lg font-bold text-on-surface">Anonimus</div>
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
                    <div className="text-right">© 2024 Anonimus. Tu anonimato es nuestra prioridad.</div>
                </div>
            </footer>
        </div>
    );
}
