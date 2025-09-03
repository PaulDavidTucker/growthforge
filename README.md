### AGENCY

Landing page and sales funnel for an agency yet to be named

## Build and run

We are deployed on render as a single web service to save hosting costs.

run ./build.sh first

Then:

DJANGO_SETTINGS_MODULE=growthsource.settings gunicorn --chdir backend -k uvicorn.workers.UvicornWorker growthsource.asgi:application
