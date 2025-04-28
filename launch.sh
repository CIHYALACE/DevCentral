#!/bin/bash

# DevCentral Launch Script for Linux
# This script launches both the frontend and backend services

# Colors for terminal output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

echo -e "${YELLOW}Starting DevCentral services...${NC}"

# Start the backend Django server
echo -e "${GREEN}Starting Django backend server...${NC}"
cd "$(dirname "$0")/DevCentral" || exit

# Activate the virtual environment
if [ -d ".venv" ]; then
    source .venv/bin/activate
else
    echo -e "${YELLOW}Virtual environment not found. Creating a new one...${NC}"
    python -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
fi

# Start Django server in the background
python manage.py runserver 8000 &
BACKEND_PID=$!

# Start the frontend React application
echo -e "${GREEN}Starting React frontend...${NC}"
cd "$(dirname "$0")/frontend" || exit

# Check if node_modules exists, if not, install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

# Start the frontend development server
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}Both services are running!${NC}"
echo -e "${YELLOW}Backend server: http://localhost:8000${NC}"
echo -e "${YELLOW}Frontend server: http://localhost:5173${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both services${NC}"

# Function to handle script termination
cleanup() {
    echo -e "\n${YELLOW}Shutting down services...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}Services stopped.${NC}"
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Keep the script running
wait