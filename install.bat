@echo off
echo Installing AI Business Assistant...
echo.
echo Step 1: Installing Backend Dependencies
cd backend
call npm install
cd ..
echo.
echo Step 2: Installing Frontend Dependencies
cd frontend
call npm install
cd ..
echo.
echo Installation Complete!
echo.
echo Next steps:
echo.
echo 1. Update backend\.env with your OpenAI API key
echo    OPENAI_API_KEY=your_api_key_here
echo.
echo 2. To start the backend (in one terminal):
echo    cd backend
echo    npm start
echo.
echo 3. To start the frontend (in another terminal):
echo    cd frontend
echo    npm start
echo.
pause
