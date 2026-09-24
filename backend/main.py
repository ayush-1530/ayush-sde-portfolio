#routes
from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from pydantic import BaseModel, EmailStr, Field
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

from dotenv import load_dotenv
from services.email_service import send_contact_email

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("backend.log")
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(stream_handler)

load_dotenv()

app = FastAPI()

# Middleware to log all requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    logger.info(f"Origin: {request.headers.get('origin')}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code}")
    return response

# CORS configuration
frontend_url = os.getenv("FRONTEND_URL", "").rstrip("/")

origins = [
    "https://ayush-sde-portfolio.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
]

if frontend_url and frontend_url not in origins:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)

def _send_email_task(form: ContactForm):
    try:
        send_contact_email(form.name, form.email, form.message)
    except ConnectionError:
        logger.error("Failed to send contact email via SMTP")
    except Exception as e:
        logger.error(f"Unexpected error sending email: {type(e).__name__}")

@app.post("/contact")
async def send_contact_email_endpoint(form: ContactForm, background_tasks: BackgroundTasks):
    logger.info(f"Received contact form submission from: {form.name}")

    background_tasks.add_task(_send_email_task, form)

    return {"message": "Message sent successfully!"}

@app.get("/")
async def root():
    return {"message": "Ayush's Portfolio Backend is running!"}
