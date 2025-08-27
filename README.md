# Lawn Starter Take Home Project

A full-stack monorepo application built with React Router frontend, Node.js Express backend, and Docker containerization.

## 🏗️ Project Structure

```
lawn-starter-take-home/
├── packages/
│   ├── frontend/          # React Router + Tailwind CSS frontend
│   └── backend/           # Node.js Express backend with caching
├── docker-compose.yml     # Docker orchestration
├── package.json           # Root package.json with workspaces
└── README.md
```

## 🚀 Features

### Frontend

- **React Router v7** - Latest routing solution with file-based routing
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server

### Backend

- **Express.js** - Fast, unopinionated web framework
- **Node-Cache** - In-memory caching for better performance
- **Star Wars API Integration** - Communicates with the Star Wars API
- **Caching Strategy** - Intelligent request caching with TTL
- **Security** - Helmet, CORS, compression middleware
- **TypeScript** - Full type safety

### Infrastructure

- **Docker** - Containerized development and production
- **Monorepo** - Single repository for frontend and backend
- **Workspaces** - NPM workspaces for dependency management

## 🛠️ Prerequisites

- Node.js 18+
- npm 9+
- Docker & Docker Compose

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/giovanicascaes/lawn-starter-take-home.git
   cd lawn-starter-take-home
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## 🚀 Development

### Local Development (Without Docker)

#### Start Backend Only

```bash
npm run dev:backend
```

#### Start Frontend Only

```bash
npm run dev:frontend
```

#### Start Both Services Simultaneously

```bash
npm run dev
```

### Production Build (Without Docker)

#### Build Both Packages

```bash
npm run build
```

#### Build Backend Only

```bash
npm run build:backend
```

#### Build Frontend Only

```bash
npm run build:frontend
```

#### Start Production Services

```bash
npm run start
```

### Local Development (With Docker)

#### Build Development Images

```bash
npm run docker:build:dev
```

#### Start Development Services (with hot reload)

```bash
npm run docker:up:dev
```

#### Stop Development Services

```bash
npm run docker:down
```

### Production Build (With Docker)

#### Build Production Images

```bash
npm run docker:build
```

#### Start Production Services (detached)

```bash
npm run docker:up:prod
```

#### Start Production Services (foreground)

```bash
npm run docker:up
```

#### Stop Production Services

```bash
npm run docker:down
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001

## 📚 API Endpoints

### Health & Status

- `GET /api/health` - Health check with cache statistics and uptime information

### Star Wars Data Endpoints

- `GET /api/people` - Get list of people/characters (supports search query parameter)
- `GET /api/people/:id` - Get specific person/character by ID
- `GET /api/movies` - Get list of movies/films (supports search query parameter)
- `GET /api/movies/:id` - Get specific movie/film by ID with character details

### Cache Management

- `GET /api/cache/stats` - Get cache statistics (hit rates, miss rates, key count)
- `DELETE /api/cache/clear` - Clear cache (optional `pattern` query parameter for selective clearing)

### Analytics & Monitoring

- `GET /api/statistics` - Get top 5 most requested endpoints with request counts and percentages

### Error Handling Demo

- `GET /api/demo/error/:type` - Demo endpoint to showcase error handling for different scenarios:
  - `validation` - 400 Bad Request
  - `not-found` - 404 Not Found
  - `unauthorized` - 401 Unauthorized
  - `forbidden` - 403 Forbidden
  - `conflict` - 409 Conflict
  - `rate-limit` - 429 Too Many Requests
  - `server` - 500 Internal Server Error

### Root Endpoint

- `GET /` - API information and endpoint listing

## 🔧 Configuration

### Backend Environment Variables

| Variable       | Default                 | Description            |
| -------------- | ----------------------- | ---------------------- |
| `PORT`         | `3001`                  | Backend server port    |
| `HOST`         | `0.0.0.0`               | Backend server host    |
| `FRONTEND_URL` | `http://localhost:3000` | Frontend URL for CORS  |
| `SW_API_URL`   | `https://swapi.tech/`   | Star Wars API base URL |

### Cache Configuration

| Setting              | Default | Description                   |
| -------------------- | ------- | ----------------------------- |
| `CACHE_TTL`          | `300`   | Cache time-to-live in seconds |
| `CACHE_CHECK_PERIOD` | `600`   | Cache cleanup check period    |

## 📊 Performance Features

- **Request Caching**: Intelligent caching of Star Wars API responses
- **Compression**: Gzip compression for all responses
- **Security Headers**: Helmet.js for security best practices
- **CORS**: Configurable cross-origin resource sharing
- **Logging**: Morgan HTTP request logging

## 🧪 Development Scripts

### Development & Building

| Script                      | Description                                         |
| --------------------------- | --------------------------------------------------- |
| `npm run dev`               | Start both frontend and backend in development mode |
| `npm run dev:frontend`      | Start only frontend                                 |
| `npm run dev:backend`       | Start only backend                                  |
| `npm run dev:backend:watch` | Start backend with nodemon watch mode               |
| `npm run build`             | Build both frontend and backend                     |
| `npm run build:frontend`    | Build only frontend                                 |
| `npm run build:backend`     | Build only backend                                  |

### Production

| Script                   | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `npm run start`          | Start both frontend and backend in production mode |
| `npm run start:frontend` | Start only frontend in production mode             |
| `npm run start:backend`  | Start only backend in production mode              |

### Docker Operations

| Script                     | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `npm run docker:build`     | Build Docker images for production                          |
| `npm run docker:build:dev` | Build Docker images for development                         |
| `npm run docker:up`        | Start Docker services in foreground                         |
| `npm run docker:up:prod`   | Start Docker services in production mode (detached)         |
| `npm run docker:up:dev`    | Start Docker services in development mode (with hot reload) |
| `npm run docker:down`      | Stop Docker services                                        |

### Code Formatting

| Script                    | Description                                  |
| ------------------------- | -------------------------------------------- |
| `npm run format`          | Format all code with Prettier                |
| `npm run format:check`    | Check code formatting without making changes |
| `npm run format:backend`  | Format backend code only                     |
| `npm run format:frontend` | Format frontend code only                    |
| `npm run format:app`      | Format frontend app code only                |

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 3001 are available
2. **Docker issues**: Restart Docker Desktop and try again
3. **Dependencies**: Run `npm install` in both packages if needed

### Logs

- **Frontend**: Check browser console and terminal
- **Backend**: Check terminal output and Docker logs
- **Docker**: `docker-compose logs [service-name]`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Lawn Starter take-home assignment.

## 🤝 Support

For questions or issues, please refer to the project documentation or create an issue in the repository.
