# Anonimus — Frontend

**Anonimus** (Caminos de Apoyo) es una aplicación web de **apoyo emocional y psicológico anónimo**. Funciona como una red social anónima: las personas se registran con un **perfil anónimo** (alias + avatar), participan en **comunidades** de apoyo, crean **publicaciones**, **reaccionan** y **comentan**, y completan **retos** personales que acompañan su proceso — todo **sin revelar su identidad real**.

Este repositorio contiene el **frontend** (Next.js). El backend es una API REST independiente.

---

## Tech stack

| Área | Tecnología |
|------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI | **React 19**, **TypeScript 5** |
| Estilos | **Tailwind CSS v4** + Material Symbols |
| Pruebas | **Jest** (`next/jest`) + **React Testing Library** |
| Backend | API REST externa (OpenAPI/Swagger) |
| Deploy | Vercel |

---

## Funcionalidades

- **Autenticación anónima**: registro e inicio de sesión con alias + contraseña + avatar. Token **JWT** en cookie; datos del usuario en `localStorage`.
- **Protección de rutas** mediante `proxy.ts` (el "middleware" de Next 16): las rutas privadas redirigen a `/login` si no hay sesión.
- **Comunidades**: explorar comunidades reales del API; "miembros" = usuarios distintos que han publicado; sección "Mis Comunidades" (donde el usuario ha publicado).
- **Detalle de comunidad** (`/communities/[id]`): ver y **crear publicaciones**, **reaccionar** y **comentar**.
- **Retos**: cada usuario recibe **10 retos** al registrarse; marca su **porcentaje de avance** (se persiste en el backend vía `PUT`); roadmap general y por reto.
- **Muro de experiencias**: feed de solo lectura con publicaciones de todos los usuarios.
- **Avatares estables** con [DiceBear](https://dicebear.com) (deterministas por alias, sin caducidad).

---

## Requisitos

- **Node.js 22+**
- npm (el repo usa `package-lock.json`)

---

## Configuración

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea un archivo **`.env`** en la raíz con la URL del backend:
   ```bash
   NEXT_PUBLIC_API_URL="https://example.com/api/v1"
   ```
   > Es una variable `NEXT_PUBLIC_*`, por lo que se incrusta en el bundle en tiempo de build. En despliegue (Vercel) debe definirse en **Environment Variables**.

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm test` | Ejecuta los tests unitarios (Jest) |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Tests con reporte de cobertura |

---

## Estructura del proyecto

```
app/                     # Rutas (App Router)
  page.tsx               # Raíz (la redirección la maneja el proxy)
  login/                 # Registro + inicio de sesión
  dashboard/             # Inicio: comunidades + "Mis Comunidades"
  communities/           # Listado de comunidades
  communities/[id]/      # Detalle: posts, comentarios, reacciones
  challenges/            # Retos (progreso real + roadmap)
  experiences/           # Muro de experiencias (solo lectura)
lib/
  api.ts                 # Wrapper único de fetch (base URL + Bearer + errores)
  auth.ts                # Sesión: getToken / getCurrentUser / saveSession / clearSession
  avatar.ts              # Avatares estables (DiceBear)
  communityDecor.ts      # Icono por categoría + decoración
services/                # Un archivo por recurso del API
  login.ts  register.ts  communities.ts  posts.ts
  comments.ts  reactions.ts  challenges.ts  users.ts
hooks/
  useUserInfo.ts         # Usuario logueado (useSyncExternalStore)
  useAsync.ts            # { data, loading, error, reload }
  useRetoDates.ts        # Fechas de retos completados (localStorage)
components/
  UserAvatar.tsx         # Avatar con fallback estable + inicial
types/
  models.ts              # Modelos de dominio (Comunidad, Publicacion, Reto, ...)
proxy.ts                 # Protección de rutas (Next 16)
__tests__/               # Tests unitarios (Jest + RTL)
```

---

## Arquitectura de datos

- **`lib/api.ts`** centraliza todas las llamadas: arma la URL con `NEXT_PUBLIC_API_URL`, agrega `Authorization: Bearer <token>` y normaliza errores. Helpers: `apiGet / apiPost / apiPut / apiDelete`.
- **`services/`** expone una función por operación del API (p. ej. `listCommunities`, `createPost`, `updateReto`). Como los `GET` de lista del backend **no soportan filtros** (solo `limit`/`offset`), el filtrado por comunidad/publicación/usuario se hace **en el cliente**.
- **`hooks/useAsync`** estandariza los estados de carga/error/recarga en las páginas.
- La autenticación vive en cookie (`token`, legible por el proxy en el servidor) + `localStorage` (`userInfo`).

---

## Pruebas

Tests unitarios con **Jest + React Testing Library** (configurado con `next/jest`). Cubren la capa lógica: `lib/`, `services/`, `hooks/` y `components/` (las páginas de `app/` quedan fuera del scope de cobertura).

```bash
npm run test:coverage
```

Cobertura objetivo ≥ 85% (statements/branches/functions/lines).

---

## CI / CD

- **CI** (`.github/workflows/CI_Pipeline.yaml`): en cada **Pull Request a `develop`** ejecuta `lint → test (coverage) → build`.
- **Deploy**: la integración de **Vercel** despliega automáticamente al hacer merge en `main`. Recuerda definir `NEXT_PUBLIC_API_URL` en las variables de entorno del proyecto en Vercel.

---

## Flujo de ramas

`feature/*` → PR a **`develop`** (corre CI) → merge a **`main`** (despliega).

---

## Notas

- Este proyecto usa **Next.js 16**, que renombró `middleware.ts` a **`proxy.ts`**. Consulta `node_modules/next/dist/docs/` ante dudas de la versión.
- En componentes cliente, los parámetros de ruta dinámica se leen con `useParams()`.
