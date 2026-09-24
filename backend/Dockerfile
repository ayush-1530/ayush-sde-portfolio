# Use Python 3.11 image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements file relative to repo root
COPY backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code relative to repo root
COPY backend/ .

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
