# Use the official Python base image
FROM python:3.9-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app

COPY . /app

# Install SSL certificates
RUN apt-get update && apt-get install -y ca-certificates

COPY cert.pem /usr/local/share/ca-certificates/cert.pem

RUN update-ca-certificates

# Install the Python dependencies
RUN pip install -r requirements.txt

# Copy the application code to the container
COPY . .

# Expose port 80 for FastAPI
EXPOSE 80

# Run the FastAPI application using uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]