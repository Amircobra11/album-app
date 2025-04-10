# Music Album App

A full-stack application for browsing and playing music albums, built with Django REST Framework and React.

## Features

- Browse albums and artists
- View album details and track listings
- Play music tracks
- RESTful API for albums, artists, and songs

## Technology Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React, React Router, Axios
- **Database**: SQLite (default, can be changed to PostgreSQL)
- **Media Storage**: Local filesystem (can be configured for cloud storage)

## Installation

### Backend Setup

```bash
# Navigate to backend directory
cd album-app/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (for admin access)
python manage.py createsuperuser

# Start development server
python manage.py runserver