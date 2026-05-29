// Avatares deterministas y estables (DiceBear). No usan token ni caducan:
// el mismo "seed" siempre genera el mismo avatar. Reemplaza las URLs temporales
// (lh3.googleusercontent.com/aida-public/...) que expiraban al guardarse en la BD.

const DICEBEAR = "https://api.dicebear.com/9.x";

export function avatarFromSeed(seed: string, style = "fun-emoji"): string {
  const safeSeed = (seed && seed.trim()) || "anon";
  return `${DICEBEAR}/${style}/svg?seed=${encodeURIComponent(safeSeed)}`;
}

// ¿La URL ya es un avatar estable (DiceBear)? Las demás (p.ej. aida-public) no son confiables.
export function isStableAvatarUrl(url?: string | null): boolean {
  return !!url && url.startsWith(DICEBEAR);
}

// Opciones para elegir avatar al registrarse (URLs estables que se guardan en la BD).
export const AVATAR_OPTIONS: string[] = [
  avatarFromSeed("Luna", "fun-emoji"),
  avatarFromSeed("Milo", "bottts"),
  avatarFromSeed("Sol", "lorelei"),
  avatarFromSeed("Nube", "adventurer"),
  avatarFromSeed("Rio", "personas"),
];
