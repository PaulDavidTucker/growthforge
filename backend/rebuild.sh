!#/bin/bash/

echo "Beginning in: ${PWD}"

cd ../frontend

echo "Moved to: ${PWD}"

echo "Rebuilding..."

npm run build
