import React from 'react';

interface Accommodation {
  name: string;
  location: string;
  description: string;
  amenities: string[];
}

const accommodations: Accommodation[] = [
  {
    name: 'Giant Taipei Cycle Station',
    location: 'Taipei Main Station',
    description: 'A cycling-friendly hotel with secure bike storage and maintenance facilities',
    amenities: [
      'Secure bike storage',
      'Bike washing station',
      'Basic tools available',
      'Bike rental service',
      'Route planning assistance'
    ]
  },
  {
    name: 'Bike Inn Taichung',
    location: 'Taichung City Center',
    description: 'Specially designed for cyclists with indoor bike parking',
    amenities: [
      'Indoor bike storage',
      'Repair station',
      'Laundry facilities',
      'Early breakfast service',
      'GPS rental'
    ]
  },
  {
    name: 'Sun Moon Lake Riders Rest',
    location: 'Sun Moon Lake',
    description: 'Lake-side accommodation perfect for cyclists exploring the scenic route',
    amenities: [
      'Secure bike storage',
      'Bike cleaning area',
      'Professional repairs nearby',
      'Packed lunch service',
      'Route maps available'
    ]
  }
];

const BikeAccommodation: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Bike-Friendly Accommodations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.map((accommodation, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold mb-2">{accommodation.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{accommodation.location}</p>
              <p className="text-gray-700 mb-4">{accommodation.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Amenities:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {accommodation.amenities.map((amenity, i) => (
                    <li key={i} className="mb-1">{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeAccommodation;
