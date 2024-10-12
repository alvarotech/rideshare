# Taxi Ride Request Application

This application provides a simple backend and frontend for requesting taxi rides. It includes a Flask backend with a PostgreSQL database and a React frontend component.

## Prerequisites

- Python 3.7+
- Node.js and npm
- PostgreSQL

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd taxi-ride-request-app
   ```

2. Set up the PostgreSQL database:
   - Create a new database named `taxi_app`
   - Update the database connection string in `app.py` if necessary

3. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

4. Install Python dependencies:
   ```
   pip install Flask Flask-SQLAlchemy psycopg2-binary
   ```

5. Set up the database schema and insert dummy data:
   ```
   psql -d taxi_app -f create_tables.sql
   psql -d taxi_app -f insert_dummy_data.sql
   ```

6. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

## Running the Application

1. Start the Flask backend:
   ```
   cd <project-root>
   export FLASK_APP=app.py
   export FLASK_ENV=development
   flask run
   ```
   The backend will be available at `http://localhost:5000`

2. In a new terminal, start the React frontend:
   ```
   cd frontend
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

3. Open your web browser and navigate to `http://localhost:3000` to use the application.

## Testing the Ride Request

1. Ensure both the backend and frontend are running.
2. On the frontend, you should see a "Request Ride" button.
3. Click the button to request a ride.
4. The application will assign the nearest available driver and display the result.

## API Endpoints

- `POST /request_ride`: Request a new ride
  - Request body: `{ "user_id": <int>, "pickup_latitude": <float>, "pickup_longitude": <float> }`
  - Response: Ride assignment details or error message

## Notes

- This is a basic implementation and lacks features like authentication, real-time updates, and proper error handling.
- For production use, additional security measures and optimizations should be implemented.
