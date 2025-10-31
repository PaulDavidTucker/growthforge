#!/usr/bin/env bash
set -o errexit

# --- Install Dependencies ---
echo "--> Installing backend dependencies..."
pip install -r backend/requirements.txt

echo "--> Installing frontend dependencies..."
npm --prefix frontend ci --legacy-peer-deps

# --- Generate Sitemap ---
echo "--> Generating sitemap..."
python backend/create_sitemap.py

# --- Build Frontend ---
echo "--> Building frontend..."
npm --prefix frontend run build

# --- Prepare Backend ---
echo "--> Collecting static files..."
python backend/manage.py collectstatic --no-input

echo "--> Running database migrations..."
python backend/manage.py migrate
