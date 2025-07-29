import QRCodeDisplay from './QRCodeDisplay';
import StravaRouteEmbed from './StravaRouteEmbed';

const Itinerary = () => {
  const schedule = [
    {
      day: 'Day 0',
      date: 'Saturday 25th October 2025',
      location: 'Kaohsiung',
      title: 'Arrival & Assembly',
      description:
        'Arrive at Taoyuan Airport, take the speed train to Kaohsiung. Check-in at Hotel Cozzi and assemble bikes for the journey ahead.',
      stravaRouteID: null, // No cycling route for arrival day
      details: {
        distance: '0km',
        estimatedTime: 'Arrival day',
        elevation: 'N/A',
      },
      accommodation: {
        name: 'Hotel Cozzi Kaohsiung Zhongshan',
        type: '4 star hotel',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two single beds',
        features: 'Central location, convenient, lots of night markets and restaurants nearby',
        bikeStorage: 'Can bring to the room',
        qrCode: 'https://maps.app.goo.gl/LdtcdbYVnX67zifD8',
      },
      note: 'This weekend is a public holiday - expect crowds',
    },
    {
      day: 'Day 1',
      date: 'Sunday 26th October 2025',
      location: 'Kaohsiung to Kenting',
      title: 'Southern Coast Adventure',
      description:
        "Begin your cycling journey at 7am, departing from Kaohsiung and riding south along Taiwan's stunning coastline to Kenting.",
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '104.5km',
        estimatedTime: '4.6 hours',
        elevation: '+313m',
      },
      accommodation: {
        name: 'Fullon Resort Kenting',
        type: 'Beachside resort',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two double beds in a room',
        features: 'Iconic beachside location, facing the ocean, lots of facilities',
        bikeStorage: 'Store in a meeting room',
        qrCode: 'https://maps.app.goo.gl/VKeZeouzairGB92y5',
      },
      note: 'Enjoy the ocean views and beachside atmosphere',
    },
    {
      day: 'Day 2',
      date: 'Monday 27th October 2025',
      location: 'Kenting to Jinlung',
      title: 'Hot Springs & Mountains',
      description:
        'Continue your journey inland towards the mountains, ending at the relaxing hot springs of Jinlung.',
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '117.31km',
        estimatedTime: '4.4 hours',
        elevation: '+1,316m',
      },
      accommodation: {
        name: 'Jinlung Good Hot Spring Hotel',
        type: 'Hot spring resort',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two single beds',
        features: 'One and only salty hot spring resort in Taiwan, hotel buffet breakfast included',
        bikeStorage: 'Store in the room',
        qrCode: 'https://maps.app.goo.gl/fK6DiWyB57HEEsX36',
      },
      note: "Relax in Taiwan's unique salty hot springs",
    },
    {
      day: 'Day 3',
      date: 'Tuesday 28th October 2025',
      location: 'Jinlung to Antong',
      title: 'Forest Retreat',
      description:
        "Cycle through Taiwan's beautiful forest landscapes and arrive at the eco-friendly Forest 3030 Hostel.",
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '114km',
        estimatedTime: '4.4 hours',
        elevation: '+871m',
      },
      accommodation: {
        name: 'Forest 3030 Hostel',
        type: 'Boutique hostel',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two single beds',
        features:
          'Boutique style, located in central area with lots of facilities, hotel buffet breakfast included',
        bikeStorage: 'Store in private hallway',
        qrCode: 'https://maps.app.goo.gl/ia9MYhir2ztusKZg8',
      },
      note: "Experience Taiwan's beautiful forest environment",
    },
    {
      day: 'Day 4',
      date: 'Wednesday 29th October 2025',
      location: 'Antong to Hualien',
      title: 'Eastern Coast Beauty',
      description: "Ride towards Taiwan's dramatic eastern coast and the vibrant city of Hualien.",
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '112km',
        estimatedTime: 'TBC',
        elevation: '+734m',
      },
      accommodation: {
        name: 'Fullon Hotel Hualien',
        type: 'Hotel',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two single beds',
        features: 'Convenient location, facing the ocean, hotel buffet breakfast included',
        bikeStorage: 'Store at lobby, guarded',
        qrCode: 'https://maps.app.goo.gl/VYGJUXhEpg6X9Xg78',
      },
      note: "Explore Hualien's night markets and local culture",
    },
    {
      day: 'Day 5',
      date: 'Thursday 30th October 2025',
      location: 'Hualien to Lishan',
      title: 'Mountain Ascent',
      description:
        "Challenge yourself with a climb to the high-altitude Lishan Guest House in Taiwan's central mountains.",
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '128km',
        estimatedTime: 'TBC',
        elevation: '+2900m',
      },
      accommodation: {
        name: 'Lishan Guest House',
        type: 'Mountain guest house',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two single beds',
        features: 'Most iconic mountain location, traditional building with lots of history',
        bikeStorage: 'Store in a meeting room',
        qrCode: 'https://maps.app.goo.gl/1BRHQo1GJPwA7rM4A',
      },
      note: 'Pay attention to weather and temperature - will be chilly and misty',
    },
    {
      day: 'Day 6',
      date: 'Friday 31st October 2025',
      location: 'Lishan to Yilan',
      title: 'Mountain Descent & East Coast Finale',
      description:
        "Descend from the high mountains of Lishan through spectacular scenery to the coastal plains of Yilan. Experience dramatic elevation changes as you cycle from Taiwan's alpine regions down to the beautiful northeastern coastline.",
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '110.0km',
        estimatedTime: '4.2 hours',
        elevation: '+1206m',
      },
      accommodation: {
        name: 'Timeless Private Villa',
        type: 'Hotel & Private villa',
        price: '$TBC (AUD)',
        roomType: 'Shared room - two single beds',
        features: 'Private villa with plenty of facilities',
        bikeStorage: 'Store in the house',
        qrCode: 'https://maps.app.goo.gl/Vqcgapks6j3RTsPv5',
      },
      note: 'Pay attention to weather and temperature on the descent - will be chilly and misty',
    },
    {
      day: 'Day 7',
      date: 'Saturday 1st November 2025',
      location: 'Yilan to Taipei',
      title: 'Final Celebration',
      description:
        'Complete your epic journey by cycling to Taipei. Celebrate at MAAP Lab and rest after your incredible adventure.',
      stravaRouteID: '3367020249280943442',
      details: {
        distance: '106.12km',
        estimatedTime: '4.2 hours',
        elevation: '+557m',
      },
      accommodation: {
        name: 'Fulon Hotel Taipei',
        type: 'Hotel',
        price: '$TBC (AUD)',
        roomType: 'Single occupancy in double room',
        features: 'Convenient location near MAAP lab',
        bikeStorage: 'Can bring to the room',
        qrCode: 'https://maps.app.goo.gl/Vqcgapks6j3RTsPv5',
      },
      note: 'Celebration dinner and rest after completing the tour',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">7-Day Taiwan Cycling Adventure</h2>
          <p className="text-lg text-gray-600">
            Experience the best of Taiwan from coast to mountains
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {schedule.map((item) => (
            <div
              key={`${item.day}-${item.title}`}
              className="p-6 border border-gray-100 hover:border-gray-200 transition-colors rounded-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm font-medium text-blue-600 mb-1">{item.day}</div>
                  <div className="text-xs text-gray-500">{item.date}</div>
                </div>
                <div className="text-xs text-gray-400">{item.location}</div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>

              {/* Cycling Details */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Cycling Details</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-blue-700">📏 Distance</div>
                    <div className="text-blue-600">{item.details.distance}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-700">⏱️ Time</div>
                    <div className="text-blue-600">{item.details.estimatedTime}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-700">⛰️ Elevation</div>
                    <div className="text-blue-600 text-xs">{item.details.elevation}</div>
                  </div>
                </div>
              </div>

              {/* Strava Route - only show for cycling days */}
              {item.day !== 'Day 0' && (
                <StravaRouteEmbed
                  location={item.location}
                  routeId={item.stravaRouteID || 'placeholder-route-id'}
                />
              )}

              {/* Accommodation Details */}
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-gray-800 mb-2">Accommodation</h4>
                <div className="text-sm space-y-1">
                  <div className="font-medium text-gray-700">{item.accommodation.name}</div>
                  <div className="text-gray-600">
                    {item.accommodation.type} • {item.accommodation.price}
                  </div>
                  <div className="text-gray-600">{item.accommodation.roomType}</div>
                  <div className="text-gray-500 text-xs">{item.accommodation.features}</div>
                  <div className="text-blue-600 text-xs">🚲 {item.accommodation.bikeStorage}</div>
                  {item.accommodation.qrCode && (
                    <div className="mt-2 p-2 bg-gray-50 rounded border-l-4 border-green-400">
                      <div className="text-xs text-gray-700 font-medium mb-2">
                        📱 Location QR Code
                      </div>
                      <QRCodeDisplay
                        value={item.accommodation.qrCode}
                        size={100}
                        className="mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Note */}
              {item.note && (
                <div className="mt-3 p-2 bg-yellow-50 border-l-4 border-yellow-400">
                  <p className="text-xs text-yellow-800">{item.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Itinerary;
