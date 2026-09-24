import os
import smtplib
from unittest.mock import patch, MagicMock, call

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("SMTP_HOST", "smtp.resend.com")
os.environ.setdefault("SMTP_PORT", "465")
os.environ.setdefault("SMTP_USERNAME", "resend")
os.environ.setdefault("SMTP_PASSWORD", "test_api_key")
os.environ.setdefault("SMTP_FROM_EMAIL", "test@example.com")
os.environ.setdefault("SMTP_TO_EMAIL", "ayushnegiuk@gmail.com")

from main import app
from services.email_service import get_smtp_config, send_contact_email

client = TestClient(app)


# ── Health Check ──────────────────────────────────────────────

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Ayush's Portfolio Backend is running!"}


# ── Successful Submission ─────────────────────────────────────

@patch("main.send_contact_email")
def test_contact_form_success(mock_send):
    response = client.post("/contact", json={
        "name": "Ritik",
        "email": "ritik@gmail.com",
        "message": "Hello, I would like to collaborate."
    })
    assert response.status_code == 200
    assert response.json() == {"message": "Message sent successfully!"}
    mock_send.assert_called_once_with("Ritik", "ritik@gmail.com", "Hello, I would like to collaborate.")


# ── Invalid Email ─────────────────────────────────────────────

@patch("main.send_contact_email")
def test_contact_form_invalid_email(mock_send):
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "not-an-email",
        "message": "Some message"
    })
    assert response.status_code == 422
    mock_send.assert_not_called()


@patch("main.send_contact_email")
def test_contact_form_empty_email(mock_send):
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "",
        "message": "Some message"
    })
    assert response.status_code == 422
    mock_send.assert_not_called()


# ── Missing/Invalid Message ──────────────────────────────────

@patch("main.send_contact_email")
def test_contact_form_missing_message(mock_send):
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "test@example.com"
    })
    assert response.status_code == 422
    mock_send.assert_not_called()


@patch("main.send_contact_email")
def test_contact_form_empty_message(mock_send):
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "message": ""
    })
    assert response.status_code == 422
    mock_send.assert_not_called()


@patch("main.send_contact_email")
def test_contact_form_missing_name(mock_send):
    response = client.post("/contact", json={
        "email": "test@example.com",
        "message": "Hello"
    })
    assert response.status_code == 422
    mock_send.assert_not_called()


# ── SMTP Failure ─────────────────────────────────────────────

@patch("main.send_contact_email", side_effect=ConnectionError("SMTP failed"))
def test_smtp_failure_returns_safe_response(mock_send):
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello there"
    })
    assert response.status_code == 200
    assert response.json() == {"message": "Message sent successfully!"}
    body = response.json()
    assert "smtp" not in str(body).lower()
    assert "api_key" not in str(body).lower()
    assert "password" not in str(body).lower()


# ── SMTP SSL Connection Sequence ─────────────────────────────

@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_ssl_connection_sequence(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.sendmail.return_value = {}
    mock_smtp_cls.return_value = mock_server

    send_contact_email("Ritik", "ritik@gmail.com", "Test message")

    mock_smtp_cls.assert_called_once_with("smtp.resend.com", 465, timeout=15)
    mock_server.login.assert_called_once_with("resend", "test_api_key")
    mock_server.sendmail.assert_called_once()
    mock_server.quit.assert_called_once()


@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_recipient_and_sender(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.sendmail.return_value = {}
    mock_smtp_cls.return_value = mock_server

    send_contact_email("Ritik", "ritik@gmail.com", "Test message")

    args = mock_server.sendmail.call_args
    assert args[0][0] == "test@example.com"
    assert args[0][1] == "ayushnegiuk@gmail.com"


@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_reply_to_header(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.sendmail.return_value = {}
    mock_smtp_cls.return_value = mock_server

    send_contact_email("Ritik", "ritik@gmail.com", "Test message")

    raw_email = mock_server.sendmail.call_args[0][2]
    assert "Reply-To: ritik@gmail.com" in raw_email


@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_subject_contains_visitor_name(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.sendmail.return_value = {}
    mock_smtp_cls.return_value = mock_server

    send_contact_email("Ritik", "ritik@gmail.com", "Test message")

    raw_email = mock_server.sendmail.call_args[0][2]
    assert "New Portfolio Contact from Ritik" in raw_email


@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_message_content_included(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.sendmail.return_value = {}
    mock_smtp_cls.return_value = mock_server

    send_contact_email("Ritik", "ritik@gmail.com", "Collaboration inquiry")

    raw_email = mock_server.sendmail.call_args[0][2]
    assert "Collaboration inquiry" in raw_email
    assert "ritik@gmail.com" in raw_email
    assert "Ritik" in raw_email


# ── SMTP Authentication Error ────────────────────────────────

@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_auth_error(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.login.side_effect = smtplib.SMTPAuthenticationError(535, b"Auth failed")
    mock_smtp_cls.return_value = mock_server

    with pytest.raises(ConnectionError, match="Failed to send email"):
        send_contact_email("Ritik", "ritik@gmail.com", "Test")


# ── SMTP Connection Error ────────────────────────────────────

@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_connection_error(mock_smtp_cls):
    mock_smtp_cls.side_effect = OSError("Connection refused")

    with pytest.raises(ConnectionError, match="Failed to send email"):
        send_contact_email("Ritik", "ritik@gmail.com", "Test")


# ── SMTP Server Quit Called in Finally ───────────────────────

@patch("services.email_service.smtplib.SMTP_SSL")
def test_smtp_quit_always_called(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.login.side_effect = smtplib.SMTPAuthenticationError(535, b"Auth failed")
    mock_smtp_cls.return_value = mock_server

    with pytest.raises(ConnectionError):
        send_contact_email("Ritik", "ritik@gmail.com", "Test")

    mock_server.quit.assert_called_once()


# ── HTML Email Escaping ──────────────────────────────────────

@patch("services.email_service.smtplib.SMTP_SSL")
def test_html_email_escapes_user_input(mock_smtp_cls):
    mock_server = MagicMock()
    mock_server.sendmail.return_value = {}
    mock_smtp_cls.return_value = mock_server

    send_contact_email("<script>alert('xss')</script>", "test@test.com", "Hello & goodbye")

    raw_email = mock_server.sendmail.call_args[0][2]
    assert "<script>" not in raw_email
    assert "&lt;script&gt;" in raw_email
    assert "Hello &amp; goodbye" in raw_email


# ── Configuration Loading ─────────────────────────────────────

def test_config_loading():
    config = get_smtp_config()
    assert config["host"] == "smtp.resend.com"
    assert config["port"] == 465
    assert config["username"] == "resend"
    assert config["password"] == "test_api_key"
    assert config["from_email"] == "test@example.com"
    assert config["to_email"] == "ayushnegiuk@gmail.com"


def test_config_missing_env(monkeypatch):
    monkeypatch.delenv("SMTP_HOST", raising=False)
    monkeypatch.delenv("SMTP_USERNAME", raising=False)
    monkeypatch.delenv("SMTP_PASSWORD", raising=False)
    monkeypatch.delenv("SMTP_FROM_EMAIL", raising=False)
    monkeypatch.delenv("SMTP_TO_EMAIL", raising=False)

    with pytest.raises(ValueError, match="Missing SMTP config"):
        get_smtp_config()
