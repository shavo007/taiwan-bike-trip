import QRCodeDisplay from './QRCodeDisplay';
import StravaRouteEmbed from './StravaRouteEmbed';

const ItineraryEnhanced = () => {
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
      stravaRouteID: '3327904070859937976',
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
      stravaRouteID: '3327907356470638110',
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
        qrCode: 'https://maps.app.goo.gl/YMhwb3g1RNDnruJH6',
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
      stravaRouteID: '3327913061249090078',
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
      stravaRouteID: '3327915611232641162',
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
      title: 'Mountain Ascent - Taiwan KOM',
      description:
        "Challenge yourself with a climb to the high-altitude Lishan Guest House in Taiwan's central mountains.",
      stravaRouteID: '3383647444636415170',
      details: {
        distance: '147km',
        estimatedTime: 'TBC',
        elevation: '+5000m',
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
      stravaRouteID: '3327919303200876062',
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
      stravaRouteID: '3327920394931803678',
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
        qrCode: 'https://maps.app.goo.gl/KYDVbzE2T7oj3WJj8',
      },
      note: 'Celebration dinner and rest after completing the tour',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-wider text-blue-600 mb-2">
            Your Adventure Awaits
          </div>
          <h2 className="text-4xl font-light text-gray-900 mb-4">8-Day Taiwan Cycling Adventure</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From the vibrant south to the dramatic mountains, experience Taiwan&apos;s diverse
            landscapes and rich culture on two wheels
          </p>
        </div>

        <div className="space-y-8">
          {schedule.map((item, index) => (
            <div
              key={`${item.day}-${item.title}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left side - Main content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center font-medium text-lg">
                      {index}
                    </div>
                    <div>
                      <div className="text-xl font-medium text-gray-900">{item.day}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                      <div className="text-sm text-blue-600 font-medium">{item.location}</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-light text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

                  {/* Cycling details */}
                  {item.stravaRouteID && (
                    <div className="grid grid-cols-3 gap-4 mb-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-light text-blue-700">
                          {item.details.distance}
                        </div>
                        <div className="text-xs text-blue-600 uppercase tracking-wide font-medium">
                          Distance
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-blue-700">
                          {item.details.estimatedTime}
                        </div>
                        <div className="text-xs text-blue-600 uppercase tracking-wide font-medium">
                          Time
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-blue-700">
                          {item.details.elevation}
                        </div>
                        <div className="text-xs text-blue-600 uppercase tracking-wide font-medium">
                          Elevation
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side - Accommodation & QR */}
                <div className="p-8 bg-gray-50 border-l border-gray-100">
                  <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    🏨 Tonight&apos;s Stay
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium text-gray-900 text-lg">
                        {item.accommodation.name}
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{item.accommodation.type}</div>
                      <div className="text-xl font-light text-blue-600 mb-2">
                        {item.accommodation.price}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {item.accommodation.features}
                    </div>

                    {/* QR Code */}
                    <div className="mt-6 p-4 bg-white rounded-lg text-center">
                      <div className="text-sm font-medium text-gray-700 mb-3">
                        📍 Location QR Code
                      </div>
                      <QRCodeDisplay
                        value={item.accommodation.qrCode}
                        size={120}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Strava embed */}
              {item.stravaRouteID && (
                <div className="p-6 bg-gray-900 text-white">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
                    🚴‍♂️ Route Preview
                  </h4>
                  <StravaRouteEmbed routeId={item.stravaRouteID} location={item.location} />
                </div>
              )}

              {/* Note */}
              {item.note && (
                <div className="p-4 bg-blue-50 border-t border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-lg">💡</div>
                    <p className="text-sm text-blue-800">{item.note}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItineraryEnhanced;
