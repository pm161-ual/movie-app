# 🎬 Movie App — Ionic + OMDb API

> 🇪🇸 Español | [🇬🇧 English](#-movie-app--ionic--omdb-api-1)

---

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
# 1. Clonar el repositorio
git clone https://github.com/pm161-ual/movie-app.git
cd movie-app

# 2. Instalar las dependencias
npm install

# 3. Configurar el API key en src/environments/environment.ts
# apiKeyOMDb: 'TU_API_KEY'

# 4. Ejecutar la aplicación
ionic serve
```

---

## ⚙️ Configuración

Crear tu propia API key gratuita en [omdbapi.com](https://www.omdbapi.com/apikey.aspx) y añádela en `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiKeyOMDb: 'YOUR_API_KEY_HERE'
};
```

> ⚠️ Nunca subir el API key real al repositorio.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # Interfaces TypeScript (Movie, OMDbSuccessResponse)
│   │   └── services/        # Servicios con lógica de negocio y estado
│   ├── home/                # Página principal de búsqueda
│   └── movie-detail/        # Página de detalles de la película
├── environments/            # Variables de entorno
└── main.ts                  # Bootstrap con provideHttpClient()
```

---

## 📚 Conceptos aplicados

- Arquitectura **core** para separar lógica de negocio de la UI
- Servicios Angular como **Single Source of Truth** con Signals
- Inyección de dependencias moderna con `inject()`
- Tipado estricto con **interfaces TypeScript**
- Variables de entorno para gestionar credenciales de forma segura

---

## 📄 Licencia

Proyecto académico desarrollado como práctica del módulo de desarrollo de aplicaciones multiplataforma.

---
---

# 🎬 Movie App — Ionic + OMDb API

> [🇪🇸 Español](#-movie-app--ionic--omdb-api) | 🇬🇧 English

---

Mobile application built with **Ionic Angular** that consumes the OMDb external API to search and explore movie information.

---

## ✨ Features

- 🔍 **Movie search** — Real-time queries to the OMDb API
- 🎥 **Movie detail** — Full view with title, year and poster
- ❤️ **Favorites list** — Save and manage your favourite movies
- 📄 **Results pagination** — Browse through pages of results

---

## 🛠️ Technologies used

- [Ionic 7+](https://ionicframework.com/)
- [Angular 16+](https://angular.io/) — Standalone components
- [OMDb API](https://www.omdbapi.com/) — External movies API
- `HttpClient` — For HTTP requests
- Angular Signals — Modern state management
- TypeScript

---

## 🚀 Installation and setup

### Prerequisites

- Node.js 18+
- Ionic CLI: `npm install -g @ionic/cli`
- A free API key from [OMDb API](https://www.omdbapi.com/apikey.aspx)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/pm161-ual/movie-app.git
cd movie-app

# 2. Install dependencies
npm install

# 3. Set your API key in src/environments/environment.ts
# apiKeyOMDb: 'YOUR_API_KEY'

# 4. Run the application
ionic serve
```

---

## ⚙️ Configuration

Get your free API key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx) and add it to `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiKeyOMDb: 'YOUR_API_KEY_HERE'
};
```

> ⚠️ Never commit the real API key to the repository.

---

## 📁 Project structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces (Movie, OMDbSuccessResponse)
│   │   └── services/        # Business logic and state services
│   ├── home/                # Main search page
│   └── movie-detail/        # Movie detail page
├── environments/            # Environment variables
└── main.ts                  # Bootstrap with provideHttpClient()
```

---

## 📚 Key concepts

- **Core** architecture to separate business logic from UI
- Angular services as **Single Source of Truth** with Signals
- Modern dependency injection with `inject()`
- Strict typing with **TypeScript interfaces**
- Environment variables to manage credentials securely

---

## 📄 License

Academic project developed as part of a cross-platform application development module.
