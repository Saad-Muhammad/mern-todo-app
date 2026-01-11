# 📝 Todo App - MERN Stack

A production-ready MERN (MongoDB, Express, React, Node.js) stack Todo application with Docker support, CI/CD pipeline, and Kubernetes readiness.

## 🚀 Quick Start (Docker Compose)

The easiest way to run the application is using Docker Compose:

```powershell
docker-compose up --build
```

The application will be available at:
- Frontend: [http://localhost](http://localhost)
- Backend API: [http://localhost:3000](http://localhost:3000)
- MongoDB: `localhost:27017`

## 🛠️ Manual Development Setup (Windows)

### Prerequisites
- Node.js 18+
- MongoDB running locally or a connection string

### Backend Setup
```powershell
cd backend
npm install
$env:MONGODB_URI="mongodb://localhost:27017/todo_app"
npm run dev
```

### Frontend Setup
```powershell
cd frontend
npm install
$env:REACT_APP_API_URL="http://localhost:3000"
npm start
```

## 🐳 Docker Operations

### Building Images
```powershell
docker build -t your-username/todo-backend ./backend
docker build -t your-username/todo-frontend ./frontend
```

### Pushing to DockerHub
```powershell
docker push your-username/todo-backend:latest
docker push your-username/todo-frontend:latest
```

## 🧪 Testing API Endpoints (PowerShell)

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
```

### Get All Todos
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/todos" -Method Get
```

### Create a Todo
```powershell
$body = @{ title = "Learn Kubernetes" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/todos" -Method Post -Body $body -ContentType "application/json"
```

## ✨ Features
- **Full CRUD**: Create, Read, Update (Toggle), and Delete todos.
- **Responsive UI**: Works on desktop and mobile.
- **Health Monitoring**: Built-in health check endpoints for both services.
- **Production Optimized**: Multi-stage Docker builds and Nginx configuration.
- **CI/CD**: Automated image building and manifest updates via GitHub Actions.
- **K8s Ready**: Manifests included for Kubernetes deployment.

## 📚 Tech Stack
- **Frontend**: React 18, CSS3 (Vanilla), Nginx
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB 7.0
- **DevOps**: Docker, Docker Compose, GitHub Actions, Kubernetes

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/todo_app` |
| `PORT` | Backend port | `3000` |
| `REACT_APP_API_URL` | Frontend API endpoint | `http://localhost:3000` |
