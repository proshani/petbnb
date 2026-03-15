#!/bin/sh
# run.sh

echo "Starting application with standalone setup..."

export PORT=3000
export HOST=0.0.0.0

# Check if migrations need to be applied
echo "Checking and applying database migrations..."
npx prisma migrate deploy

# # run seeder
# echo "Running database seeder..."
# node prisma/dist/seed.js

# Start the application on port 3000
echo "Starting Next.js application on port 3000..."
node server.js
