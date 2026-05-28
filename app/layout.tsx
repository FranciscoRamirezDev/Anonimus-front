import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caminos de Apoyo - Registro",
  description: "Un espacio seguro para sanar, compartir y crecer juntos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased light"
    >
      <head>
        <link rel="icon" type="image/png" href="favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
