# DsGlam-Beauty

Aplicación web (SPA) de un salón de belleza, desarrollada con **Vue 3**, **Vue Router** y **Pinia**. Permite ver el catálogo de servicios con filtros, consultar el detalle de cada uno, ver la galería de trabajos, leer y escribir opiniones, y enviar solicitudes de cita desde un formulario con validaciones en tiempo real.

 **Sitio en producción:** [https://dsglam-beauty-vue.vercel.app/]


 **Versión anterior (HTML, CSS y JavaScript):** [https://racevedo-coder.github.io/DSGLAM-BEAUTY/]

## Tecnologías

- Vue 3 (Single File Components, Composition API con `<script setup>`)
- Vue Router 4
- Pinia (estado compartido)
- Vite
- Bootstrap 5 (carrusel), Font Awesome y Google Fonts por CDN
- Desplegado en Vercel

## Funcionalidades

- **Inicio:** portada con carrusel, servicios destacados, galería y reseñas de clientas.
- **Catálogo:** 12 servicios con filtro por categoría.
- **Detalle de servicio:** ruta dinámica `/servicio/:id`, con servicios sugeridos.
- **Galería:** fotos con filtro por categoría (se recuerda con `sessionStorage`).
- **Reseñas:** carga con `fetch` y `async/await` desde `data.json`, con loader y manejo de errores (404, 500); las opiniones nuevas se guardan en `localStorage`.
- **Contacto:** formulario con validación en tiempo real, edición y cancelación de solicitudes guardadas en `localStorage`.
- Diseño responsive para PC, tablet y celular.

## Estructura del proyecto

En la carpeta `public` están las imágenes y los dos archivos JSON: `data.json` con las reseñas y `servicios.json` con los 12 servicios. Los dejé ahí porque son archivos que la aplicación pide tal cual al servidor.

Todo el código está dentro de `src`. En `assets` están los dos archivos de estilos: `main.css`, con los estilos generales y los del inicio, y `paginas.css`, que solo se carga en las páginas internas para que no choque con el inicio. En `views` está cada página completa, una por cada ruta, y en `components` las piezas que se reutilizan: el menú, el footer, la tarjeta de servicio, la tarjeta de solicitud, la sección de reseñas y la ventana para escribir una opinión. En `router` se definen las rutas y en `stores` están los dos almacenes de Pinia, uno para los servicios y otro para las solicitudes del formulario de contacto. `App.vue` junta el menú, la vista que corresponda y el footer, y `main.js` arranca la aplicación.

Fuera de `src` quedan el `index.html`, el `package.json` con las dependencias y el `vercel.json`, que hace que las rutas sigan funcionando cuando se recarga la página en Vercel.


## Rutas

| Ruta | Vista |
|---|---|
| `/` | Inicio |
| `/catalogo` | Catálogo |
| `/servicio/:id` | Detalle de un servicio |
| `/galeria` | Galería |
| `/quienes-somos` | ¿Quiénes somos? |
| `/contacto` | Contacto |
| cualquier otra | Página 404 |

## Instalación local

Requiere Node.js 20 o superior.

```bash
git clone [URL DE ESTE REPOSITORIO]
cd dsglam-beauty-vue
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Para generar el paquete de producción:

```bash
npm run build
npm run preview
```

## Despliegue

El proyecto está conectado a Vercel desde este repositorio: cada `git push` a la rama `main` genera un nuevo despliegue automáticamente.

