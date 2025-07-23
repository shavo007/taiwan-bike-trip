const Features = () => {
  const features = [
    {
      icon: '✨',
      title: 'Ride in Style',
      description: 'We\'ve secured our own private driver and support vehicle for the entire week – no panniers, no stress, just you and your bike.'
    },
    {
      icon: '🌊',
      title: 'Scenic East Coast',
      description: 'We\'ll be rolling along the stunning Pacific coastline – think dramatic cliffs, lush jungle, and seaside towns. Every day brings jaw-dropping views.'
    },
    {
      icon: '⛰️',
      title: 'Challenge Yourself',
      description: 'Yes, the Taiwan KOM! A chance to ride one of the most iconic and scenic mountain climbs in the world. A proper bucket list tick!'
    },
    {
      icon: '🏡',
      title: 'Unique Stays',
      description: 'From a private forest villa to a boutique hot spring hotel and a historic mountain guest house, our accommodation is as diverse and exciting as the terrain.'
    },
    {
      icon: '🍜',
      title: 'Local Culture',
      description: 'We\'ll overnight in vibrant towns like Hualien and Kaohsiung with access to buzzing night markets and authentic Taiwanese eats.'
    },
    {
      icon: '📅',
      title: 'Tour Dates',
      description: 'We kick off from Kaohsiung on Oct 26, wrapping up with a celebration in Taipei.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-gray-900 mb-12 text-center">Trip Highlights</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="p-6 bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
