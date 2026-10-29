
# LinkBoard

Es una App para guardar enlaces con etiquetas, votarlos y comentarlos.

## Herramientas
Backend REST 
- Node, Express y Prisma

Frontend (dos versiones)
- Vanilla JS 
- React (Vite).

## Estructura


backend/       API REST

VanillaJs/     Frontend (Versión simlple)

react/      Frontend React

## Contexto
La consigna planteaba un escenario ficticio: ser el "Director de Enlaces del Internet" y construir una aplicación para organizar enlaces y exigía construirla dos veces: primero en Vanilla JS puro y después en React.

Por eso el repositorio incluye una versión en Vanilla JS y otra en React, que consumen el mismo backend.

La consigna también tenia ciertas restricciones que afectan el diseño:

- Backend RESTful compartido por ambas versiones del frontend.
- Frontend SPA: una sola página, sin renderizado en servidor al navegar entre vistas.
- React con componentes reutilizables y bien organizados.
- Dos vistas integradas: lista de enlaces con filtro por etiquetas, y detalle de cada enlace con comentarios y votos.
- Funcionalidades obligatorias: guardar enlaces con etiquetas, comentar y votar.

## Requisitos

- Node.js 20.19+ o 22.12+ (probado con v24.21.0)
- base de datos: PostgreSQL 16 (probado con esta versión)

## Instalación y ejecución

### Backend

- http://localhost:3000

```bash
cd backend
npm install
```
copiar el conetido de .env.example a .env y completar DATABASE_URL y el puerto

```bash
npx prisma migrate dev   
npm run dev        
```

### Frontend (react)

- http://localhost:5173

```bash
cd react
npm install
npm run dev              
```

El backend debe estar corriendo antes de abrir el frontend.

## Resumen de endpoints de la API

| Método | Ruta | Hace |
|---|---|---|
| GET | /api/enlaces | Lista de enlaces con sus tags |
| POST | /api/enlaces | Crea un enlace (title, url, description?, tags?) |
| GET | /api/enlaces/:id/detalle | Enlace con tags y comentarios |
| PATCH | /api/enlaces/:id/voto | Suma o resta un voto (vote: 1 o -1) |
| POST | /api/enlaces/:id/comentarios | Agrega un comentario (author, text) |

## Cómo desplegar

Esta app no esta desplegada, pero si guisiera hacerlo
1. **Base de datos (Neon, PostgreSQL):** crear un proyecto en Neon y copiar la URL de conexión.
   Con esa URL en DATABASE_URL, ejecutar una vez:
   `npx prisma migrate deploy`
2. **Backend:** publicar en un servicio por ejemplo Render o Railway, definir DATABASE_URL y puerto como variables de entorno
2. **Base de datos**: puede desplegarla en Neon  y luego de tener la url de conexion debe ejecutar `npx prisma migrate deploy` 
3. **Frontend:** definir `API_URL` con la URL pública del backend, ejecutar `npm run build` y publicar la carpeta en un hosting como por ejemplo Netlify o Github Pages.

## Decisiones y limitaciones

- SPA: el cambio entre lista y detalle se hace con estado de React, sin recargar. El botón "atrás" del navegador no vuelve de detalle a lista.
- Los votos "ya votados" se recuerdan por navegador (localStorage), no por usuario.