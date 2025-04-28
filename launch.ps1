# DevCentral Launch Script for Windows
# This script launches both the frontend and backend services

# Function to display colored text
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Yellow "Starting DevCentral services..."

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start the backend Django server
Write-ColorOutput Green "Starting Django backend server..."
Set-Location -Path "$scriptPath\DevCentral"

# Activate the virtual environment
if (Test-Path ".venv\Scripts\activate.ps1") {
    & .venv\Scripts\activate.ps1
} else {
    Write-ColorOutput Yellow "Virtual environment not found. Creating a new one..."
    python -m venv .venv
    & .venv\Scripts\activate.ps1
    pip install -r requirements.txt
}

# Start Django server in a new PowerShell window
$backendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {Set-Location '$scriptPath\DevCentral'; & .venv\Scripts\activate.ps1; python manage.py runserver 8000}" -PassThru

# Start the frontend React application
Write-ColorOutput Green "Starting React frontend..."
Set-Location -Path "$scriptPath\frontend"

# Check if node_modules exists, if not, install dependencies
if (-not (Test-Path "node_modules")) {
    Write-ColorOutput Yellow "Installing frontend dependencies..."
    npm install
}

# Start the frontend development server in a new PowerShell window
$frontendJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "& {Set-Location '$scriptPath\frontend'; npm run dev}" -PassThru

Write-ColorOutput Green "Both services are running!"
Write-ColorOutput Yellow "Backend server: http://localhost:8000"
Write-ColorOutput Yellow "Frontend server: http://localhost:5173"
Write-ColorOutput Yellow "Close the terminal windows to stop the services"

# Wait for user to press a key before exiting
Write-Host "Press any key to exit this launcher (services will continue running)..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")