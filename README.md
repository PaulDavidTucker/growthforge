### AGENCY

Landing page and sales funnel for an agency yet to be named

## Build and run

We are deployed on render as a single web service to save hosting costs.

run ./build.sh first

Then:

gunicorn --chdir backend -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:10000 growthsource.asgi:application
