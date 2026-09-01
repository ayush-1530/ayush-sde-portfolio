#test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Ayush Negi Portfolio Backend is running!"}

def test_contact_form_missing_fields():
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "test@example.com"
        # Missing message
    })
    assert response.status_code == 422

def test_contact_form_success():
    # Helper to mock SMTP would be ideal here, but for now we test the endpoint mechanics
    # Since we don't have real creds, our code just logs and returns success if creds are missing
    # or if we mock the env vars.
    # For this simple test, we rely on the logic that returns 200.
    
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello World"
    })
    assert response.status_code == 200
    assert response.json() == {"message": "Email sent successfully!"}
