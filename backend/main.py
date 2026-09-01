#routes
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("backend.log")
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(stream_handler)

from fastapi import Request
from dotenv import load_dotenv

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
frontend_url = os.getenv("FRONTEND_URL", "")

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
]

if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

def send_email_background(form: ContactForm, sender_email: str, sender_password: str, receiver_email: str):
    try:
        msg = MIMEMultipart()
        msg['From'] = f"Portfolio Contact Form <{sender_email}>"
        msg['To'] = receiver_email
        msg['Reply-To'] = form.email
        msg['Subject'] = f"New Contact: {form.name}"

        body = f"""
New Contact Request
------------------
Name: {form.name}
Email: {form.email}

Message:
{form.message}
------------------
Sent from your Portfolio Website
"""
        msg.attach(MIMEText(body, 'plain'))

        # SMTP Configuration
        smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        smtp_port = int(os.getenv("SMTP_PORT", "465"))
        
        logger.info(f"SMTP Step 1: Starting connection to {smtp_server}:{smtp_port}")
        
        server = None
        if smtp_port == 465:
            logger.info("SMTP Step 2: Using SMTP_SSL")
            server = smtplib.SMTP_SSL(smtp_server, smtp_port, timeout=15)
        else:
            logger.info("SMTP Step 2: Using standard SMTP")
            server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
            logger.info("SMTP Step 3: Sending EHLO")
            server.ehlo()
            logger.info("SMTP Step 4: Starting TLS")
            server.starttls()
            logger.info("SMTP Step 5: Sending EHLO after TLS")
            server.ehlo()
            
        logger.info("SMTP Step 6: Attempting login")
        server.login(sender_email, sender_password)
        
        logger.info(f"SMTP Step 7: Sending mail to {receiver_email}")
        refused = server.sendmail(sender_email, receiver_email, msg.as_string())
        
        if refused:
            logger.error(f"Email delivery refused by SMTP server for: {refused}")
        else:
            logger.info(f"SMTP server accepted the message for {receiver_email}")
            
        server.quit()
        logger.info(f"Background email successfully sent to {receiver_email}")
    except Exception as e:
        logger.error(f"Failed to send background email at step: {str(e)}", exc_info=True)

@app.post("/contact")
async def send_contact_email(form: ContactForm, background_tasks: BackgroundTasks):
    logger.info(f"Received contact form submission from: {form.name}")
    
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")
    receiver_email = os.getenv("RECEIVER_EMAIL", "ayushnegiuk@gmail.com")

    logger.info(f"Attempting to send email via {sender_email} to {receiver_email}")

    if not sender_email or not sender_password:
            logger.error("Email credentials missing in .env file")
            raise HTTPException(status_code=500, detail="Server misconfiguration: Email credentials missing")

    # Queue the email task to run in the background
    background_tasks.add_task(send_email_background, form, sender_email, sender_password, receiver_email)
    
    return {"message": "Message sent successfully!"}

@app.get("/")
async def root():
    return {"message": "Ayush's Portfolio Backend is running!"}
