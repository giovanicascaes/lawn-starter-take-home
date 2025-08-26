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
   git clone <repository-url>
   cd lawn-starter-take-home
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cp packages/backend/env.example packages/backend/.env
   # Edit .env file with your configuration
   ```

## 🚀 Development

### Option 1: Local Development

1. **Start the backend**

   ```bash
   npm run dev:backend
   ```

2. **Start the frontend** (in a new terminal)

   ```bash
   npm run dev:frontend
   ```

3. **Or start both simultaneously**
   ```bash
   npm run dev
   ```

### Option 2: Docker Development

1. **Production mode (optimized builds)**

   ```bash
   npm run docker:build
   npm run docker:up:prod
   ```

2. **Development mode (with hot reload)**

   ```bash
   npm run docker:build:dev
   npm run docker:up:dev
   ```

3. **Stop services**
   ```bash
   npm run docker:down
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001

## 📚 API Endpoints

### Health & Status

- `GET /api/health` - Health check with cache statistics

### Data Endpoints

- `GET /api/sw-api-data` - Fetch Star Wars API data (cached for 5 minutes)

### Cache Management

- `GET /api/cache/stats` - Get cache statistics
- `DELETE /api/cache/clear` - Clear cache (optional pattern parameter)

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

## 🐳 Docker

### Building Images

```bash
npm run docker:build
```

### Running Services

```bash
npm run docker:up
```

### Stopping Services

```bash
npm run docker:down
```

### Viewing Logs

```bash
docker-compose logs -f [service-name]
```

## 📊 Performance Features

- **Request Caching**: Intelligent caching of Star Wars API responses
- **Compression**: Gzip compression for all responses
- **Security Headers**: Helmet.js for security best practices
- **CORS**: Configurable cross-origin resource sharing
- **Logging**: Morgan HTTP request logging

## 🧪 Development Scripts

| Script                     | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `npm run dev`              | Start both frontend and backend in development mode         |
| `npm run dev:frontend`     | Start only frontend                                         |
| `npm run dev:backend`      | Start only backend                                          |
| `npm run build`            | Build both frontend and backend                             |
| `npm run start`            | Start backend in production mode                            |
| `npm run docker:build`     | Build Docker images for production                          |
| `npm run docker:build:dev` | Build Docker images for development                         |
| `npm run docker:up`        | Start Docker services in foreground                         |
| `npm run docker:up:prod`   | Start Docker services in production mode (detached)         |
| `npm run docker:up:dev`    | Start Docker services in development mode (with hot reload) |
| `npm run docker:down`      | Stop Docker services                                        |

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
