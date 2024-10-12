import React from 'react';
import { Car } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Car className="mr-2" />
          <span className="text-xl font-bold">RideShare</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Rides</a></li>
            <li><a href="#" className="hover:text-gray-300">Account</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;