# Project Architecture & Overview

This document provides a high-level overview of the Software Developer Portfolio project, explaining its structure, technology stack, and how the different components interact.

## 🚀 Overview

The project is a professional Software Developer portfolio website designed to showcase skills in infrastructure automation, CI/CD, and web development. It consists of a modern React frontend and a FastAPI (Python) backend.

## 🏗️ Technology Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/) for fast development and bundling.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth UI transitions and micro-animations.
- **Icons**: [Lucide React](https://lucide.dev/) for a clean, consistent icon set.

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) - A modern, high-performance web framework for Python.
- **Server**: [Uvicorn](https://www.uvicorn.org/) - An ASGI server for running FastAPI.
- **Logic**: Handles contact form submissions and serves as an API layer for potential future dynamic content.

### Infrastructure & DevOps
- **Docker**: Both frontend and backend are containerized for consistent deployment across environments.
- **Docker Compose**: Orchestrates the multi-container setup (Frontend + Backend).

## 📂 Project Structure

├── backend/                # FastAPI Application
│   ├── main.py             # Main entry point and API endpoints
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Multi-stage Docker build
│   └── .env                # Environment variables (SMTP, etc.)
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Header, etc.)
│   │   ├── pages/          # Individual page views (Home, Projects, Contact)
│   │   ├── hooks/          # Custom React hooks (Theming, etc.)
│   │   └── App.tsx         # Main application component
│   ├── tailwind.config.js  # Styling configuration
│   └── Dockerfile          # Frontend containerization
└── docker-compose.yml      # Service orchestration

🔄 How it Works

1.  **Direct Interaction**: The user accesses the **Frontend** (React) via the browser.
2.  **API Requests**: The Frontend communicates with the **Backend** (FastAPI) for dynamic actions, such as sending emails via the contact form.
3.  **Theming**: A custom `useTheme` hook manages the "Cyberpunk/Dark" theme toggle, which is persisted across sessions.
4.  **Deployment**: The entire stack can be launched locally using `npm run dev` / `uvicorn` or deployed as a production-ready stack using `docker-compose up`.

## 🛠️ Port Configuration

- **Frontend**: Typically runs on `localhost:5173`.
- **Backend**: Configured to run on `localhost:8001` (to avoid common conflicts on port 8000).
- **Communication**: The frontend uses a `.env.local` file to point `VITE_API_URL` to the backend.
