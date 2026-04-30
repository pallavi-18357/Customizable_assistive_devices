@echo off
echo Installing requirements...
pip install -r requirements.txt

echo Generating 3D models...
python generate_models.py

echo Done!
pause 