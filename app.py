from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://username:password@localhost/taxi_app')
db = SQLAlchemy(app)

class Driver(db.Model):
    __tablename__ = 'drivers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    car_model = db.Column(db.String(100), nullable=False)
    license_plate = db.Column(db.String(20), nullable=False)

class DriverLocation(db.Model):
    __tablename__ = 'driver_locations'
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'))
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    last_updated = db.Column(db.DateTime, default=db.func.now())

class Ride(db.Model):
    __tablename__ = 'rides'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.id'))
    pickup_latitude = db.Column(db.Float, nullable=False)
    pickup_longitude = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

@app.route('/request_ride', methods=['POST'])
def request_ride():
    data = request.json
    user_id = data['user_id']
    pickup_latitude = data['pickup_latitude']
    pickup_longitude = data['pickup_longitude']

    # Find the nearest available driver
    nearest_driver = DriverLocation.query.order_by(
        func.sqrt(
            func.pow(DriverLocation.latitude - pickup_latitude, 2) +
            func.pow(DriverLocation.longitude - pickup_longitude, 2)
        )
    ).first()

    if nearest_driver:
        # Create a new ride
        new_ride = Ride(
            user_id=user_id,
            driver_id=nearest_driver.driver_id,
            pickup_latitude=pickup_latitude,
            pickup_longitude=pickup_longitude,
            status='assigned'
        )
        db.session.add(new_ride)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': 'Ride assigned',
            'ride_id': new_ride.id,
            'driver_id': nearest_driver.driver_id
        }), 201
    else:
        return jsonify({
            'status': 'error',
            'message': 'No available drivers'
        }), 404

if __name__ == '__main__':
    app.run(debug=True)
