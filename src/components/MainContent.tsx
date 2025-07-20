import React from 'react';
import BikeAccommodation from './BikeAccommodation';

const MainContent: React.FC = () => {
  return (
    <main className="-mt-[1px]">
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Find Your Perfect Stay
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Discover bike-friendly accommodations across Taiwan that cater to cyclists' needs
            </p>
          </div>
          <BikeAccommodation />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
