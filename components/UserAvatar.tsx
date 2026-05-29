// Avatar de usuario con fallback a la inicial del alias cuando avatar_url es null.

interface UserAvatarProps {
  alias?: string | null;
  avatarUrl?: string | null;
  className?: string;
}

export default function UserAvatar({ alias, avatarUrl, className = "w-10 h-10" }: UserAvatarProps) {
  const initial = (alias?.trim()?.[0] ?? "?").toUpperCase();

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alias ?? "Avatar"}
        src={avatarUrl}
        className={`${className} rounded-full object-cover shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0`}
      aria-label={alias ?? "Anónimo"}
    >
      {initial}
    </div>
  );
}
