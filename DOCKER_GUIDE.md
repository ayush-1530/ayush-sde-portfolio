# Docker Run Guide

This guide provides instructions on how to run both the frontend and backend servers using Docker and Docker Compose.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

## Running with Docker Compose (Recommended)

The easiest way to run both services together using Docker Compose.

```bash
# Build and start both services in the background
docker-compose up --build -d

# View logs for both services
docker-compose logs -f

# Stop and remove containers
docker-compose down
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

---

## Running with Individual Docker Commands

If you prefer to run the containers individually, follow these steps:

### 1. Create a Docker Network
```bash
docker network create devops-net
```

### 2. Run Backend
```bash
cd backend
docker build -t ayush-portfolio-backend .
docker run -d --name backend --network devops-net -p 8000:8000 ayush-portfolio-backend
```

### 3. Run Frontend
```bash
cd frontend
docker build -t ayush-portfolio-frontend .
docker run -d --name frontend --network devops-net -p 5173:80 ayush-portfolio-frontend
```
