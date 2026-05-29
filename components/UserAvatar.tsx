"use client";

import { useState } from "react";
import { avatarFromSeed, isStableAvatarUrl } from "@/lib/avatar";

interface UserAvatarProps {
  alias?: string | null;
  avatarUrl?: string | null;
  className?: string;
}

export default function UserAvatar({ alias, avatarUrl, className = "w-10 h-10" }: UserAvatarProps) {
  const initial = (alias?.trim()?.[0] ?? "?").toUpperCase();

  // Solo confiamos en la URL guardada si es un avatar estable (DiceBear).
  // Para cualquier otra (las temporales que caducan) o null, derivamos uno
  // estable a partir del alias.
  const src = isStableAvatarUrl(avatarUrl) ? (avatarUrl as string) : avatarFromSeed(alias ?? "anon");

  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${className} rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0`}
        aria-label={alias ?? "Anónimo"}
      >
        {initial}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alias ?? "Avatar"}
      src={src}
      onError={() => setFailed(true)}
      className={`${className} rounded-full object-cover bg-surface-container shrink-0`}
    />
  );
}
