/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useAsync } from "@/hooks/useAsync";
import { listPosts } from "@/services/posts";
import { listCommunities } from "@/services/communities";
import { listReactions } from "@/services/reactions";
import { buildUserMap } from "@/services/users";
import UserAvatar from "@/components/UserAvatar";

export default function TableroExperienciasPage() {
    const router = useRouter();
    const user = useUserInfo();
    const { data, loading, error } = useAsync(async () => {
        const [posts, users, communities, reactions] = await Promise.all([
            listPosts(),
            buildUserMap(),
            listCommunities(),
            listReactions(),
        ]);
        const communityName = new Map(communities.map((c) => [c.id_comunidad, c.nombre]));
        const shuffled = [...posts].sort(() => Math.random() - 0.5);
        return { posts: shuffled, users, communityName, reactions };
    }, []);

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

                            <UserAvatar alias={user?.alias} avatarUrl={user?.avatar_url} className="w-7 h-7" />
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
                    {/* El muro es de solo lectura: publicar se hace dentro de una comunidad */}
                    <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] relative overflow-hidden group flex items-center gap-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 relative z-10">
                            <span className="material-symbols-outlined text-primary-dim">forum</span>
                        </div>
                        <div className="flex-grow relative z-10">
                            <p className="text-on-surface font-medium">¿Quieres compartir tu experiencia?</p>
                            <p className="text-on-surface-variant text-sm">Las publicaciones se crean dentro de una comunidad.</p>
                        </div>
                        <button
                            onClick={() => router.push("/communities")}
                            className="relative z-10 bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-2.5 rounded-full font-medium shadow-[0px_10px_20px_rgba(45,51,56,0.06)] hover:scale-105 transition-transform duration-300 shrink-0"
                        >
                            Ir a comunidades
                        </button>
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

                {/* Muro de publicaciones (Feed): publicaciones reales de los usuarios */}
                <section className="space-y-8">
                    {loading && <p className="text-center text-on-surface-variant">Cargando experiencias…</p>}
                    {error && <p className="text-center text-error">{error}</p>}
                    {!loading && !error && data?.posts.length === 0 && (
                        <p className="text-center text-on-surface-variant">
                            Aún no hay publicaciones. Entra a una comunidad y comparte la primera.
                        </p>
                    )}
                    {data?.posts.map((post) => {
                        const author = data.users.get(post.id_usuario);
                        const alias = author?.alias ?? `Usuario #${post.id_usuario}`;
                        const sala = data.communityName.get(post.id_comunidad) ?? "una comunidad";
                        const reactions = data.reactions.filter((r) => r.id_publicacion === post.id_publicacion);
                        const loveCount = reactions.filter((r) => r.tipo_reaccion === "love").length;
                        const likeCount = reactions.filter((r) => r.tipo_reaccion === "like").length;
                        return (
                            <article
                                key={post.id_publicacion}
                                className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(45,51,56,0.06)] hover:shadow-[0px_30px_50px_rgba(45,51,56,0.08)] transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <UserAvatar alias={alias} avatarUrl={author?.avatar_url} />
                                    <div>
                                        <p className="font-headline font-semibold text-on-surface">{alias}</p>
                                        <p className="text-xs text-on-surface-variant">
                                            {new Date(post.fecha_pub).toLocaleString("es-MX")} en{" "}
                                            <span className="text-primary">{sala}</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-on-surface leading-relaxed mb-6 text-lg whitespace-pre-wrap">{post.contenido}</p>
                                <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/15 text-on-surface-variant">
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xl">favorite</span>
                                        <span className="text-sm font-medium">{loveCount}</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                                        <span className="text-sm font-medium">{likeCount}</span>
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </main>

            {/* Navegación móvil inferior */}
            <nav className="md:hidden fixed bottom-0 w-full rounded-t-[3rem] z-50 bg-white/80 backdrop-blur-lg shadow-[0px_-10px_30px_rgba(0,0,0,0.04)] flex justify-around items-center px-6 pb-6 pt-3 font-plus-jakarta text-[10px] font-semibold">
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 rounded-full px-4 py-2 transition-colors cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                >
                    <span className="material-symbols-outlined mb-1">home</span>
                    Inicio
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 rounded-full px-4 py-2 transition-colors cursor-pointer"
                    onClick={() => router.push("/communities")}
                >
                    <span className="material-symbols-outlined mb-1">group</span>
                    Grupos
                </a>
                <a
                    className="flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 rounded-full px-4 py-2 transition-colors nav-retos cursor-pointer"
                    onClick={() => router.push("/challenges")}
                >
                    <span className="material-symbols-outlined mb-1">military_tech</span>
                    Retos
                </a>
                <a
                    className="flex flex-col items-center justify-center bg-primary-container/30 text-primary rounded-full px-5 py-2 cursor-pointer"
                    onClick={() => router.push("/experiences")}
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
