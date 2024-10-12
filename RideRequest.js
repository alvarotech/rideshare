import React, { useState } from 'react';
import axios from 'axios';

const RideRequest = ({ userId, userLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rideStatus, setRideStatus] = useState(null);

  const handleRequestRide = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/request_ride', {
        user_id: userId,
        pickup_latitude: userLocation.latitude,
        pickup_longitude: userLocation.longitude
      });

      setRideStatus({
        status: 'success',
        message: `Ride assigned. Driver ID: ${response.data.driver_id}`
      });
    } catch (error) {
      setRideStatus({
        status: 'error',
        message: error.response?.data?.message || 'An error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleRequestRide} disabled={isLoading}>
        {isLoading ? 'Requesting...' : 'Request Ride'}
      </button>
      {rideStatus && (
        <p className={rideStatus.status === 'success' ? 'success' : 'error'}>
          {rideStatus.message}
        </p>
      )}
    </div>
  );
};

export default RideRequest;
