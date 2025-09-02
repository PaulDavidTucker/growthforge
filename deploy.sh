#!/usr/bin/env bash
# exit on error
set -o errexit

# --- Backend Setup ---
echo "--- Installing backend dependencies ---"
pip install -r backend/requirements.txt

echo "--- Running backend migrations ---"
python backend/manage.py migrate

echo "--- Collecting static files ---"
python backend/manage.py collectstatic --no-input

# --- Frontend Setup ---
echo "--- Installing frontend dependencies ---"
# Use npm ci for faster, more reliable installs in CI/CD environments
npm --prefix frontend ci

echo "--- Building frontend ---"
npm --prefix frontend run build

# --- Create Superuser ---
# This script will be created in the next step
echo "--- Creating superuser (if not exists) ---"
python backend/manage.py create_superuser_from_env
