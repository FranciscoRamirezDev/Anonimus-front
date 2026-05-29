"use client";

import { useRouter } from "next/navigation";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";

export default function CommunitiesPage() {
    const router = useRouter();
    const user = useUserInfo();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
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
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-surface-container transition-colors duration-300 ease-out"
                            title="Cerrar sesión"
                        >
                            <span className="material-symbols-outlined text-on-surface-variant hover:text-error">logout</span>
                        </button>
                        <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300 ease-out">
                            <span className="font-headline text-sm font-semibold text-primary">{user?.alias ?? "Mi Alias"}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-[6rem]">
                {/* Hero Section */}
                <section className="relative rounded-[3rem] overflow-hidden bg-surface-container-lowest shadow-[0px_20px_40px_rgba(45,51,56,0.06)] p-8 md:p-16 flex flex-col items-center gap-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-container/30 via-secondary-container/20 to-surface opacity-80 pointer-events-none"></div>
                    <div className="relative z-10 flex-1 space-y-8 text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight reveal font-headline">
                            Únete a Comunidades
                        </h1>
                        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto font-body leading-relaxed reveal delay-100">
                            Conecta con personas que comparten tus intereses y experiencias. Crece juntos en comunidades vibrantes y seguras donde tu anonimato es respetado.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4 reveal delay-200 justify-center">
                            <button className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-8 py-4 rounded-full font-headline font-semibold shadow-[0px_10px_20px_rgba(112,73,179,0.2)] hover:scale-[1.02] hover:shadow-[0px_15px_30px_rgba(112,73,179,0.4)] transition-all duration-300 ease-out">
                                Explorar Comunidades
                            </button>
                            <button className="bg-transparent text-on-surface border border-outline-variant/30 px-8 py-4 rounded-full font-headline font-semibold hover:bg-surface-container-low transition-colors duration-300 ease-out">
                                Mis Comunidades
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Communities Grid */}
                <section className="space-y-12">
                    <div className="text-center max-w-3xl mx-auto space-y-4 reveal">
                        <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">Comunidades Destacadas</h2>
                        <p className="text-on-surface-variant text-lg">
                            Explora grupos dedicados a diferentes objetivos y apóyate en quienes comparten tu meta.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: "local_bar", name: "Superar el alcoholismo", desc: "Un espacio para compartir estrategias, celebrar días limpios y encontrar aliento en momentos difíciles.", members: 1240 },
                            { icon: "smoking_rooms", name: "Dejar de fumar", desc: "Recursos, tips y apoyo moral para superar la dependencia al tabaco día a día.", members: 3500 },
                            { icon: "psychology", name: "Manejo de ansiedad", desc: "Herramientas de relajación, experiencias compartidas y contención emocional segura.", members: 5120 },
                            { icon: "restaurant", name: "Alimentación saludable", desc: "Motivación, recetas e historias de éxito para transformar tu relación con la comida.", members: 2890 },
                            { icon: "spa", name: "Bienestar mental", desc: "Espacio dedicado al cuidado integral de tu salud mental y emocional.", members: 4200 },
                            { icon: "fitness_center", name: "Vida activa", desc: "Comunidad de apoyo para mantener un estilo de vida saludable y activo.", members: 3100 }
                        ].map((community, i) => (
                            <div key={i} className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] hover:bg-surface-container-lowest/80 hover:-translate-y-2 transition-all duration-300 group flex flex-col reveal" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                                <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">{community.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-on-surface mb-2">{community.name}</h3>
                                <p className="text-on-surface-variant mb-6 grow">
                                    {community.desc}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-on-surface-variant font-medium">
                                        <span className="material-symbols-outlined text-base mr-2">group</span>
                                        <span>{community.members.toLocaleString()} miembros</span>
                                    </div>
                                    <button className="text-primary font-medium hover:text-primary-dim flex items-center text-sm">
                                        Unirse
                                        <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* My Communities */}
                <section className="space-y-8 reveal" style={{ transitionDelay: "300ms" }}>
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">Mis Comunidades</h2>
                        <p className="text-on-surface-variant text-lg">
                            Aquí están los grupos a los que perteneces. Participa, comparte y crece con tu comunidad.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-surface-container-lowest rounded-[2rem] p-6 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] hover:bg-surface-container-lowest/80 hover:-translate-y-2 transition-all duration-300 cursor-pointer reveal" style={{ transitionDelay: `${(i + 1) * 100}ms` }}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-on-surface">Mi Comunidad {i}</h4>
                                        <p className="text-xs text-on-surface-variant mt-1">Miembro desde hace 2 meses</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">check_circle</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                                        <span className="material-symbols-outlined text-base">group</span>
                                        <span>{30 + i * 15} participantes activos</span>
                                    </div>
                                    <button className="text-primary font-medium hover:text-primary-dim text-sm">
                                        Ver más
                                    </button>
                                </div>
                            </div>
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
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            Privacidad
                        </a>
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            Términos
                        </a>
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            Seguridad
                        </a>
                        <a className="font-be-vietnam text-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            Ayuda
                        </a>
                    </div>
                </div>
            </footer>

            {/* Barra de navegación inferior optimizada para dispositivos móviles */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-6 pt-3 bg-surface-container-lowest/90 backdrop-blur-lg rounded-t-[3rem] z-50 shadow-[0px_-10px_30px_rgba(0,0,0,0.04)] no-line">
                <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full px-5 py-2 transition-colors duration-500 cursor-pointer" onClick={() => router.push("/dashboard")}>
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
                        home
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Inicio</span>
                </a>
                <a className="flex flex-col items-center justify-center bg-primary-container/30 text-primary rounded-full px-5 py-2 hover:bg-primary-container/50 transition-colors duration-500 cursor-pointer">
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                        group
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Comunidades</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full px-5 py-2 transition-colors duration-500 cursor-pointer" onClick={() => router.push("/challenges")}>
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
                        military_tech
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Retos</span>
                </a>
                <a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full px-5 py-2 transition-colors duration-500 cursor-pointer" onClick={() => router.push("/experiences")}>
                    <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
                        forum
                    </span>
                    <span className="font-headline text-[10px] font-semibold">Muro</span>
                </a>
            </nav>

            {/* Modal de confirmación de logout */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4">
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
                                className="flex-1 px-6 py-3 rounded-full bg-error text-on-error hover:bg-error/90 transition-colors duration-300 font-headline font-semibold shadow-[0px_10px_20px_rgba(184,73,73,0.2)] hover:scale-[1.02]"
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