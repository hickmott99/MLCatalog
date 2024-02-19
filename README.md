# Machine Learning Model Catalog Web Application

## Description
This web application provides a platform for viewing, adding, and managing machine learning (ML) model runs, including associated parameters, notes, and the ability to mark models as favorites. It features a user-friendly interface for interacting with the model data stored in a database.

## Features
- **Add ML Models**: Users can add new ML model entries with details such as dataset name, run datetime, model metric, model path, training and validation loss, notes, and a favorite flag.
- **View Models**: A comprehensive view of all models is available, with options to filter and sort by model fields.

## Technical Stack
- **Front-end**: React, Redux, Bootstrap
- **Back-end**: Flask
- **Database**: SQLite

## Getting Started

### Prerequisites
- Node.js and npm installed for the frontend
- Python3 and pip for the backend

### Setting Up the Frontend
```bash
cd frontend
npm install react-scripts
npm start
```

### Setting Up the Backend
```bash
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
pip install -e .
./bin/db create
./bin/run
```
