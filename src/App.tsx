import React, { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import RideForm from './components/RideForm';
import RideConfirmationModal from './components/RideConfirmationModal';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [pickup, setPickup] = useState({ longitude: -74.006, latitude: 40.7128 });
  const [dropoff, setDropoff] = useState({ longitude: -73.9866, latitude: 40.7306 });
  const [pickupName, setPickupName] = useState('');
  const [dropoffName, setDropoffName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRideRequest = () => {
    console.log('Ride requested:', { pickup, dropoff });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 h-[calc(100vh-64px)]">
          <Map pickup={pickup} dropoff={dropoff} setPickup={setPickup} setDropoff={setDropoff} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <RideForm
            pickup={pickup}
            setPickup={setPickup}
            dropoff={dropoff}
            setDropoff={setDropoff}
            onSubmit={handleRideRequest}
            setPickupName={setPickupName}
            setDropoffName={setDropoffName}
          />
        </div>
      </main>
      <RideConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pickup={pickupName}
        dropoff={dropoffName}
      />
    </div>
  );
}

export default App;