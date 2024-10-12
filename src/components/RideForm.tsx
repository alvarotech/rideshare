import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  longitude: number;
  latitude: number;
}

interface RideFormProps {
  pickup: Location;
  setPickup: (location: Location) => void;
  dropoff: Location;
  setDropoff: (location: Location) => void;
  onSubmit: () => void;
  setPickupName: (name: string) => void;
  setDropoffName: (name: string) => void;
}

const RideForm: React.FC<RideFormProps> = ({
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  onSubmit,
  setPickupName,
  setDropoffName
}) => {
  const [pickupName, setLocalPickupName] = useState('');
  const [dropoffName, setLocalDropoffName] = useState('');

  const geocode = async (locationName: string): Promise<Location | null> => {
    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${accessToken}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return { longitude, latitude };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPickupName = e.target.value;
    setLocalPickupName(newPickupName);
    setPickupName(newPickupName);
    const location = await geocode(newPickupName);
    if (location) {
      setPickup(location);
    }
  };

  const handleDropoffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDropoffName = e.target.value;
    setLocalDropoffName(newDropoffName);
    setDropoffName(newDropoffName);
    const location = await geocode(newDropoffName);
    if (location) {
      setDropoff(location);
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Request a Ride</h2>
      <div className="mb-4">
        <label htmlFor="pickup" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            id="pickup"
            className="pl-10 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter pickup location"
            value={pickupName}
            onChange={handlePickupChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700 mb-1">Dropoff Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            id="dropoff"
            className="pl-10 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter dropoff location"
            value={dropoffName}
            onChange={handleDropoffChange}
          />
        </div>
      </div>
      <button
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
        onClick={handleSubmit}
      >
        Request Ride
      </button>
    </div>
  );
};

export default RideForm;