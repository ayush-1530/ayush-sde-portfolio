# Ayush Negi Portfolio Website

A production-ready, fully responsive portfolio website for a Software Developer Engineer, built with React, Tailwind CSS, Framer Motion, and FastAPI.

## Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### Backend
- **FastAPI** (Python 3.11)
- **Uvicorn** (ASGI Server)
- **SMTP** (Email logic)

### DevOps
- **Docker** & **Docker Compose**
- **Nginx** (Frontend serving)

## Setup & Running

### Prerequisites
- Node.js & npm
- Python 3.11+
- Docker & Docker Compose

### Local Development

1. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Access at `http://localhost:5173`

2. **Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   Access at `http://localhost:8000`

   **Note**: You need to configure `.env` in `backend/` with your email credentials for the contact form to work.

### Docker Deployment

Run the entire stack with Docker Compose:

```bash
docker-compose up --build -d
```

- Frontend: `http://localhost:5173` (mapped port)
- Backend: `http://localhost:8000`

## Project Structure

```
├── backend/                # FastAPI Application
│   ├── main.py             # API Endpoints
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Image
│   └── .env                # Environment variables
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── hooks/          # Custom Hooks (useTheme)
│   │   ├── App.tsx         # Main Component
│   │   └── index.css       # Tailwind Imports
│   ├── public/             
│   │   └── resume.pdf      # Resume file (Replace this!)
│   ├── Dockerfile          # Frontend Image (Multi-stage)
│   └── tailwind.config.js  # Tailwind Config
└── docker-compose.yml      # Orchestration
```

## Customization

1. **Resume**: Replace `frontend/public/resume.pdf` with your actual resume.
2. **Projects**: Edit `frontend/src/components/Projects.tsx` with your real projects.
3. **Contact**: Update `backend/.env` with your SMTP details.

# Portfolio
My SDE Portfolio
