"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAsync } from "@/hooks/useAsync";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getCommunity } from "@/services/communities";
import { getPostsByCommunity, createPost } from "@/services/posts";
import { listReactions, createReaction } from "@/services/reactions";
import { listComments, createComment } from "@/services/comments";
import { buildUserMap } from "@/services/users";
import { communityIcon } from "@/lib/communityDecor";
import UserAvatar from "@/components/UserAvatar";
import type { TipoReaccion, Usuario } from "@/types/models";

function authorOf(map: Map<number, Usuario> | undefined, id: number) {
  const u = map?.get(id);
  return { alias: u?.alias ?? `Usuario #${id}`, avatar_url: u?.avatar_url ?? null };
}

export default function CommunityDetailPage() {
  const params = useParams<{ id: string }>();
  const communityId = Number(params.id);
  const router = useRouter();
  const me = useUserInfo();

  const { data, loading, error, reload } = useAsync(async () => {
    const [community, posts, users, reactions, comments] = await Promise.all([
      getCommunity(communityId),
      getPostsByCommunity(communityId),
      buildUserMap(),
      listReactions(),
      listComments(),
    ]);
    return { community, posts, users, reactions, comments };
  }, [communityId]);

  // Estado de UI
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [openComments, setOpenComments] = useState<Set<number>>(new Set());
  const [commentDraft, setCommentDraft] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePublish = async () => {
    const contenido = newPost.trim();
    if (!contenido) return;
    setPosting(true);
    setFeedback(null);
    try {
      await createPost({ id_comunidad: communityId, contenido });
      setNewPost("");
      reload();
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "No se pudo publicar.");
    } finally {
      setPosting(false);
    }
  };

  const handleReact = async (id_publicacion: number, tipo: TipoReaccion) => {
    setBusy(true);
    setFeedback(null);
    try {
      await createReaction({ id_publicacion, tipo_reaccion: tipo });
      reload();
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "No se pudo reaccionar.");
    } finally {
      setBusy(false);
    }
  };

  const handleComment = async (id_publicacion: number) => {
    const texto = (commentDraft[id_publicacion] ?? "").trim();
    if (!texto) return;
    setBusy(true);
    setFeedback(null);
    try {
      await createComment({ id_publicacion, texto });
      setCommentDraft((d) => ({ ...d, [id_publicacion]: "" }));
      reload();
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "No se pudo comentar.");
    } finally {
      setBusy(false);
    }
  };

  const toggleComments = (id: number) =>
    setOpenComments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="antialiased min-h-screen relative overflow-x-hidden bg-[var(--color-surface)] text-[var(--color-on-surface)] font-body">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-[0px_20px_40px_rgba(45,51,56,0.06)]">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-5xl mx-auto">
          <button
            onClick={() => router.push("/communities")}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-headline text-sm font-medium"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Comunidades
          </button>
          <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm">
            <UserAvatar alias={me?.alias} avatarUrl={me?.avatar_url} className="w-7 h-7" />
            <span className="font-headline text-sm font-semibold text-primary">{me?.alias ?? "Mi Alias"}</span>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-6 max-w-3xl mx-auto w-full flex flex-col gap-8">
        {loading && <p className="text-center text-on-surface-variant">Cargando comunidad…</p>}
        {error && <p className="text-center text-error">{error}</p>}

        {!loading && !error && data && (
          <>
            {/* Encabezado de la comunidad */}
            <header className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl">{communityIcon(data.community.categoria)}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-on-surface font-headline">{data.community.nombre}</h1>
                <p className="text-on-surface-variant capitalize">{data.community.categoria}</p>
              </div>
            </header>

            {/* Composer */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_20px_40px_rgba(45,51,56,0.06)]">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
                placeholder="Comparte algo con la comunidad. Tu anonimato es nuestra prioridad…"
                className="w-full bg-transparent border-none focus:ring-0 resize-none text-lg text-on-surface placeholder:text-on-surface-variant/50 p-0 outline-none"
              />
              <div className="flex justify-end pt-4">
                <button
                  onClick={handlePublish}
                  disabled={posting || !newPost.trim()}
                  className="bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-2.5 rounded-full font-medium shadow-sm hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {posting ? "Publicando…" : "Publicar"}
                </button>
              </div>
            </section>

            {feedback && <p className="text-sm text-error text-center">{feedback}</p>}

            {/* Publicaciones */}
            {data.posts.length === 0 ? (
              <p className="text-center text-on-surface-variant">
                Aún no hay publicaciones. ¡Sé la primera persona en compartir!
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                {data.posts.map((post) => {
                  const author = authorOf(data.users, post.id_usuario);
                  const reactions = data.reactions.filter((r) => r.id_publicacion === post.id_publicacion);
                  const loveCount = reactions.filter((r) => r.tipo_reaccion === "love").length;
                  const likeCount = reactions.filter((r) => r.tipo_reaccion === "like").length;
                  const comments = data.comments.filter((c) => c.id_publicacion === post.id_publicacion);
                  const isOpen = openComments.has(post.id_publicacion);

                  return (
                    <article
                      key={post.id_publicacion}
                      className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0px_20px_40px_rgba(45,51,56,0.06)]"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <UserAvatar alias={author.alias} avatarUrl={author.avatar_url} />
                        <div>
                          <p className="font-headline font-semibold text-on-surface">{author.alias}</p>
                          <p className="text-xs text-on-surface-variant">
                            {new Date(post.fecha_pub).toLocaleString("es-MX")}
                          </p>
                        </div>
                      </div>

                      <p className="text-on-surface leading-relaxed mb-6 whitespace-pre-wrap">{post.contenido}</p>

                      <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/15">
                        <button
                          onClick={() => handleReact(post.id_publicacion, "love")}
                          disabled={busy}
                          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-xl">favorite</span>
                          <span className="text-sm font-medium">Me identifico{loveCount ? ` · ${loveCount}` : ""}</span>
                        </button>
                        <button
                          onClick={() => handleReact(post.id_publicacion, "like")}
                          disabled={busy}
                          className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                          <span className="text-sm font-medium">Esto me ayudó{likeCount ? ` · ${likeCount}` : ""}</span>
                        </button>
                        <button
                          onClick={() => toggleComments(post.id_publicacion)}
                          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors ml-auto"
                        >
                          <span className="material-symbols-outlined text-xl">chat_bubble</span>
                          <span className="text-sm font-medium">{comments.length}</span>
                        </button>
                      </div>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-outline-variant/15 space-y-4">
                          {comments.length === 0 && (
                            <p className="text-sm text-on-surface-variant">Sin comentarios todavía.</p>
                          )}
                          {comments.map((c) => {
                            const ca = authorOf(data.users, c.id_usuario);
                            return (
                              <div key={c.id_comentario} className="flex items-start gap-3">
                                <UserAvatar alias={ca.alias} avatarUrl={ca.avatar_url} className="w-8 h-8" />
                                <div className="bg-surface-container-low rounded-xl px-4 py-2 flex-grow">
                                  <p className="text-xs font-semibold text-on-surface">{ca.alias}</p>
                                  <p className="text-sm text-on-surface-variant whitespace-pre-wrap">{c.texto}</p>
                                </div>
                              </div>
                            );
                          })}
                          <div className="flex items-center gap-2">
                            <input
                              value={commentDraft[post.id_publicacion] ?? ""}
                              onChange={(e) =>
                                setCommentDraft((d) => ({ ...d, [post.id_publicacion]: e.target.value }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleComment(post.id_publicacion);
                              }}
                              placeholder="Escribe un comentario…"
                              className="flex-grow bg-surface-container-low rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            <button
                              onClick={() => handleComment(post.id_publicacion)}
                              disabled={busy || !(commentDraft[post.id_publicacion] ?? "").trim()}
                              className="text-primary hover:text-primary-dim disabled:opacity-40 p-2"
                            >
                              <span className="material-symbols-outlined">send</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
