import React from 'react';
import { X, Car, Clock, DollarSign } from 'lucide-react';

interface RideConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pickup: string;
  dropoff: string;
}

const RideConfirmationModal: React.FC<RideConfirmationModalProps> = ({ isOpen, onClose, pickup, dropoff }) => {
  if (!isOpen) return null;

  // Simulate random driver data
  const driverName = "John Doe";
  const carModel = "Toyota Camry";
  const licensePlate = "ABC 123";
  const eta = Math.floor(Math.random() * 10) + 1; // Random ETA between 1-10 minutes
  const fare = (Math.random() * (20 - 10) + 10).toFixed(2); // Random fare between $10-$20

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ride Confirmed!</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Car className="mr-2" />
            <div>
              <p className="font-semibold">{driverName}</p>
              <p className="text-sm text-gray-600">{carModel} - {licensePlate}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2" />
            <p>ETA: {eta} minutes</p>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2" />
            <p>Estimated fare: ${fare}</p>
          </div>
          <div className="border-t pt-4 mt-4">
            <p className="font-semibold">Pickup: {pickup}</p>
            <p className="font-semibold">Dropoff: {dropoff}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mt-6"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RideConfirmationModal;