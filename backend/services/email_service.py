import smtplib
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from html import escape

logger = logging.getLogger(__name__)


def get_smtp_config():
    config = {
        "host": os.getenv("SMTP_HOST"),
        "port": int(os.getenv("SMTP_PORT", "465")),
        "username": os.getenv("SMTP_USERNAME"),
        "password": os.getenv("SMTP_PASSWORD"),
        "from_email": os.getenv("SMTP_FROM_EMAIL"),
        "to_email": os.getenv("SMTP_TO_EMAIL"),
    }
    missing = [k for k, v in config.items() if not v]
    if missing:
        raise ValueError(f"Missing SMTP config: {', '.join(missing)}")
    return config


def build_html_email(name: str, email: str, message: str, from_email: str, to_email: str) -> MIMEMultipart:
    safe_name = escape(name)
    safe_email = escape(email)
    safe_message = escape(message)

    html = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                New Portfolio Contact
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 80px;">Name:</td>
                    <td style="padding: 8px 12px;">{safe_name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email:</td>
                    <td style="padding: 8px 12px;">{safe_email}</td>
                </tr>
            </table>
            <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0;">
                <strong style="color: #555;">Message:</strong>
                <p style="margin-top: 8px; white-space: pre-wrap;">{safe_message}</p>
            </div>
            <p style="font-size: 12px; color: #999; margin-top: 30px;">
                Sent from your Portfolio Website
            </p>
        </div>
    </body>
    </html>
    """

    plain = (
        f"New Portfolio Contact\n"
        f"{'=' * 40}\n\n"
        f"Name: {safe_name}\n"
        f"Email: {safe_email}\n\n"
        f"Message:\n{safe_message}\n\n"
        f"{'=' * 40}\n"
        f"Sent from your Portfolio Website\n"
    )

    msg = MIMEMultipart("alternative")
    msg["From"] = f"Portfolio Contact Form <{from_email}>"
    msg["To"] = to_email
    msg["Reply-To"] = email
    msg["Subject"] = f"New Portfolio Contact from {safe_name}"

    msg.attach(MIMEText(plain, "plain"))
    msg.attach(MIMEText(html, "html"))

    return msg


def send_contact_email(name: str, email: str, message: str) -> None:
    config = get_smtp_config()
    msg = build_html_email(name, email, message, config["from_email"], config["to_email"])

    server = None
    try:
        logger.info(f"Connecting to SMTP server {config['host']}:{config['port']}")

        if config["port"] == 465:
            server = smtplib.SMTP_SSL(config["host"], config["port"], timeout=15)
        else:
            server = smtplib.SMTP(config["host"], config["port"], timeout=15)
            server.ehlo()
            server.starttls()
            server.ehlo()

        server.login(config["username"], config["password"])

        refused = server.sendmail(config["from_email"], config["to_email"], msg.as_string())
        if refused:
            logger.error(f"Email delivery refused: {refused}")
            raise ConnectionError("SMTP server refused the message")

        logger.info(f"Email sent to {config['to_email']} for contact from {name}")
    except (smtplib.SMTPAuthenticationError, smtplib.SMTPException, ConnectionError, OSError) as e:
        logger.error(f"SMTP error: {type(e).__name__}")
        raise ConnectionError("Failed to send email") from e
    finally:
        if server:
            try:
                server.quit()
            except Exception:
                pass
