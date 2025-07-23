const TourStats = () => {
  const stats = [
    {
      number: '8',
      unit: 'Days',
      description: 'Epic cycling adventure'
    },
    {
      number: '750+',
      unit: 'KM',
      description: 'Total distance covered'
    },
    {
      number: '6,000+',
      unit: 'M',
      description: 'Total elevation gain'
    },
    {
      number: '7',
      unit: 'Unique',
      description: 'Accommodation experiences'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-4">Tour by the Numbers</h2>
          <p className="text-blue-100">Experience Taiwan like never before</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.unit} className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">
                {stat.number}
                <span className="text-2xl md:text-3xl ml-1 text-blue-200">{stat.unit}</span>
              </div>
              <div className="text-blue-100 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourStats;
