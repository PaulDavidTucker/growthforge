### AGENCY

Landing page and sales funnel for an agency yet to be named

## Build and run

We are deployed on render as a single web service to save hosting costs.

run ./build.sh first

Then from the root dir run:

daphne --chdir backend -p 8000 growthsource.asgi:application

## Cloud deployment

Run command:

daphne --chdir backend -b 0.0.0.0 -p 10000 --access-log - --proxy-headers growthsource.asgi:application
