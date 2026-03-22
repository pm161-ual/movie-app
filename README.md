# 🎬 Movie App — Ionic + OMDb API

Aplicación móvil desarrollada con **Ionic Angular** que consume la API externa de OMDb para buscar y explorar información sobre películas.

---

## ✨ Funcionalidades

- 🔍 **Búsqueda de películas** — Consulta en tiempo real a la API de OMDb
- 🎥 **Detalle de película** — Vista completa con título, año y póster
- ❤️ **Lista de favoritos** — Guarda y gestiona tus películas favoritas
- 📄 **Paginación de resultados** — Navega entre páginas de resultados

---

## 🛠️ Tecnologías utilizadas

- [Ionic 7+](https://ionicframework.com/)
- [Angular 16+](https://angular.io/) — Standalone components
- [OMDb API](https://www.omdbapi.com/) — API externa de películas
- `HttpClient` — Para las peticiones HTTP
- Angular Signals — Gestión de estado moderna
- TypeScript

---

## 🚀 Instalación y ejecución

### Prerrequisitos

- Node.js 18+
- Ionic CLI: `npm install -g @ionic/cli`
- Una API key gratuita de [OMDb API](https://www.omdbapi.com/apikey.aspx)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/pm161-ual/movie-app.git
cd movie-app

# 2. Instala las dependencias
npm install

# 3. Configura tu API key en src/environments/environment.ts
# apiKeyOMDb: 'TU_API_KEY'

# 4. Ejecuta la aplicación
ionic serve
```

---

## ⚙️ Configuración

Crea tu propia API key gratuita en [omdbapi.com](https://www.omdbapi.com/apikey.aspx) y añádela en `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiKeyOMDb: 'YOUR_API_KEY_HERE'
};
```

> ⚠️ Nunca subas tu API key real al repositorio.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Interfaces TypeScript (OMDbMovie, OMDbSearchApiResponse)
│   │   └── services/        # Servicios con lógica de negocio y estado
│   └── features/
│       └── home/            # Página principal de búsqueda
├── environments/            # Variables de entorno
└── main.ts                  # Bootstrap con provideHttpClient()
```

---

## 📚 Conceptos aplicados

- Arquitectura **core/features** para separar lógica de negocio de la UI
- Servicios Angular como **Single Source of Truth** con Signals
- Inyección de dependencias moderna con `inject()`
- Tipado estricto con **interfaces TypeScript**
- Variables de entorno para gestionar credenciales de forma segura

---

## 📄 Licencia

Proyecto académico desarrollado como práctica del módulo de desarrollo de aplicaciones multiplataforma.
