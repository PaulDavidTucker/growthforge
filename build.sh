#!/usr/bin/env bash
# Exit on error
set -o errexit

# --- Poetry / Pipenv / Venv ---
# If you are using a virtual environment manager, uncomment the relevant lines
# poetry install
# pipenv install --system --deploy

# --- Install Dependencies ---
echo "--> Installing backend dependencies..."
pip install -r backend/requirements.txt

echo "--> Installing frontend dependencies..."
# Use npm ci for faster, more reliable builds in CI/CD environments
npm --prefix frontend ci --legacy-peer-deps

# --- Build Frontend ---
echo "--> Building frontend..."
npm --prefix frontend run build

# --- Prepare Backend ---
echo "--> Collecting static files..."
# This will collect static files from all Django apps AND your React build folder
python backend/manage.py collectstatic --no-input

echo "--> Running database migrations..."
python backend/manage.py migrate
