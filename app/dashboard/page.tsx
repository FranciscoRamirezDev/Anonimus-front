"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useAsync } from "@/hooks/useAsync";
import { listCommunities } from "@/services/communities";
import { communityIcon, decorativeMembers } from "@/lib/communityDecor";

export default function PrincipalPage() {
    const router = useRouter();
    const user = useUserInfo();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { data: communities, loading, error } = useAsync(() => listCommunities(), []);

    const handleLogout = () => {
        // Borrar todas las cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });

        // Borrar localStorage
        localStorage.clear();

        // Borrar sessionStorage
        sessionStorage.clear();

        // Redirigir a login
        router.push("/login");
    };

    useEffect(() => {
        // Script para activar animaciones de revelación usando IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        // Optional: unobserve after animating
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="antialiased min-h-screen relative overflow-x-hidden bg-[var(--color-surface)] text-[var(--color-on-surface)] font-body">
            <style dangerouslySetInnerHTML={{
                __html: `
        /* Animaciones de revelación al hacer scroll */
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        .reveal.delay-100 { transition-delay: 100ms; }
        .reveal.delay-200 { transition-delay: 200ms; }
        .reveal.delay-300 { transition-delay: 300ms; }
        .reveal.delay-400 { transition-delay: 400ms; }

        .no-line {
            border: none !important;
        }

        .glass {
            background: rgba(247, 249, 252, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        .blob-bg-1 {
            background-image: radial-gradient(circle at 20% 30%, var(--color-primary-container) 0%, transparent 60%);
        }

        .blob-bg-2 {
            background-image: radial-gradient(circle at 80% 70%, var(--color-secondary-container) 0%, transparent 60%);
        }
      `}} />

            {/* Ambient Blobs */}
            <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 blob-bg-1 opacity-50"></div>
            <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 blob-bg-2 opacity-50"></div>

            {/* Barra de navegación superior con efecto de desenfoque (Glass) */}
            <nav className="fixed top-0 w-full z-50 glass no-line transition-all duration-200">
                <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto shadow-[0px_20px_40px_rgba(45,51,56,0.06)]">
                    <div className="text-2xl font-bold tracking-tight text-primary font-headline hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-out" onClick={() => router.push("/dashboard")}>Anonimus {" "}❤️‍🩹</div>
                    <div className="hidden md:flex space-x-8">
                        <a
                            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-headline text-sm font-medium hover:scale-105 ease-out"
                            onClick={() => router.push("/communities")}
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
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-surface-container transition-colors duration-300 ease-out"
                            title="Cerrar sesión"
                        >
                            <span className="material-symbols-outlined text-primary/80 hover:text-primary">logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-[6rem]">
                {/* SECCIÓN HERO: Introducción y llamada a la acción principal */}
                <section className="relative rounded-[3rem] overflow-hidden bg-surface-container-lowest shadow-[0px_20px_40px_rgba(45,51,56,0.06)] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-container/30 via-secondary-container/20 to-surface opacity-80 pointer-events-none"></div>
                    <div className="relative z-10 flex-1 space-y-8">
                        <div className="flex gap-4 reveal">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-xs font-semibold text-primary">
                                <span className="material-symbols-outlined text-[1rem]">lock</span> 100% Anónimo
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-xs font-semibold text-secondary">
                                <span className="material-symbols-outlined text-[1rem]">support_agent</span> Apoyo 24/7
                            </span>
                        </div>
                        <h1
                            className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight reveal delay-100 font-headline"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            Tu camino hacia el cambio comienza aquí. <br />
                            <span className="text-primary">Anónimo.</span> <span className="text-secondary">Real.</span> Juntos.
                        </h1>
                        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed reveal delay-200">
                            Un espacio seguro, libre de juicios, donde la empatía es la norma. Conecta con personas que entienden tu
                            proceso y encuentra la fuerza en la comunidad.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 reveal delay-300">
                            <button onClick={() => router.push("/challenges")} className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-4 rounded-full font-headline font-semibold shadow-[0px_10px_20px_rgba(112,73,179,0.2)] hover:scale-[1.02] hover:shadow-[0px_15px_30px_rgba(112,73,179,0.4)] transition-all duration-300 ease-out">
                                Comenzar mi camino
                            </button>
                            <button onClick={() => router.push("/communities")} className="bg-transparent text-on-surface border border-outline-variant/30 px-8 py-4 rounded-full font-headline font-semibold hover:bg-surface-container-low transition-colors duration-300 ease-out">
                                Conocer comunidades
                            </button>
                        </div>
                    </div>
                    <div className="relative z-10 flex-1 w-full h-[400px] rounded-[2rem] overflow-hidden reveal delay-400 group shadow-2xl">
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none mix-blend-overlay"></div>
                        <Image
                            alt="Camino de Recuperación"
                            className="w-full h-full object-cover transform transition-transform duration-[15s] ease-out group-hover:scale-110"
                            src="/fondo2.jpeg"
                            fill
                        />
                    </div>
                </section>

                {/* SECCIÓN DE COMUNIDADES: Cuadrícula de grupos de apoyo disponibles */}
                <section className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-4 reveal">
                        <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">Comunidades de Apoyo</h2>
                        <p className="text-on-surface-variant text-lg">
                            Encuentra tu tribu. Explora grupos dedicados a diferentes objetivos y apóyate en quienes comparten tu meta.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading && (
                            <p className="col-span-full text-center text-on-surface-variant">Cargando comunidades…</p>
                        )}
                        {error && (
                            <p className="col-span-full text-center text-error">{error}</p>
                        )}
                        {!loading && !error && communities?.length === 0 && (
                            <p className="col-span-full text-center text-on-surface-variant">Aún no hay comunidades disponibles.</p>
                        )}
                        {communities?.map((c) => (
                            <button
                                key={c.id_comunidad}
                                onClick={() => router.push(`/communities/${c.id_comunidad}`)}
                                className="text-left bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] hover:bg-surface-container-lowest/80 hover:-translate-y-2 transition-all duration-300 group flex flex-col cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">{communityIcon(c.categoria)}</span>
                                </div>
                                <h3 className="text-xl font-bold text-on-surface mb-2">{c.nombre}</h3>
                                <p className="text-on-surface-variant mb-6 flex-grow capitalize">{c.categoria}</p>
                                <div className="flex items-center text-sm text-on-surface-variant font-medium">
                                    <span className="material-symbols-outlined text-base mr-2">group</span>
                                    <span>{decorativeMembers(c.id_comunidad)} miembros</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </main>

            {/* Pie de página con enlaces legales e institucionales */}
            <footer className="block w-full py-12 px-8 bg-surface-container-low shadow-[0px_-20px_40px_rgba(45,51,56,0.03)] no-line mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div>
                        <div className="text-lg font-bold text-on-surface mb-4">Caminos de Apoyo</div>
                        <p className="text-sm text-on-surface-variant">© 2024 Caminos de Apoyo. Tu anonimato es nuestra prioridad.</p>
                    </div>
                    <div className="md:col-span-2 flex justify-end space-x-8 items-center">
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors" >
                            Privacidad
                        </a>
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors" >
                            Términos
                        </a>
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors" >
                            Seguridad
                        </a>
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors">
                            Ayuda
                        </a>
                    </div>
                </div>
            </footer>

            {/* Barra de navegación inferior optimizada para dispositivos móviles */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-6 pt-3 bg-surface-container-lowest/90 backdrop-blur-lg rounded-t-[3rem] z-50 shadow-[0px_-10px_30px_rgba(0,0,0,0.04)] no-line">
                <a className="flex flex-col items-center justify-center bg-primary-container/30 text-primary rounded-full px-5 py-2 hover:bg-primary-container/50 transition-colors duration-500" >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                        home
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Inicio</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full px-5 py-2 transition-colors duration-500" >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
                        group
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Grupos</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full px-5 py-2 transition-colors duration-500" >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
                        military_tech
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Retos</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full px-5 py-2 transition-colors duration-500" >
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
                        forum
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Muro</span>
                </a>
            </nav>

            {/* Modal de confirmación de logout */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
                    <div className="bg-surface-container-lowest rounded-[2rem] shadow-2xl max-w-md w-full p-8 space-y-6 animate-in fade-in zoom-in-95">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-on-surface font-headline">Cerrar Sesión</h2>
                            <p className="text-on-surface-variant">¿Estás seguro de que deseas cerrar sesión? Se eliminarán tus datos de sesión.</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 px-6 py-3 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-low transition-colors duration-300 font-headline font-semibold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 px-6 py-3 rounded-full bg-primary text-on-primary hover:bg-primary/90 transition-colors duration-300 font-headline font-semibold shadow-[0px_10px_20px_rgba(112,73,179,0.2)] hover:scale-[1.02]"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
