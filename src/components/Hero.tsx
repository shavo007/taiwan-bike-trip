import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Split Layout */}
      <div className="w-full grid lg:grid-cols-2 gap-0">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-20 lg:py-32 bg-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
            {subtitle}
          </p>
        </div>
        
        {/* Right Image */}
        <div className="relative h-[50vh] lg:h-full min-h-[600px]">
          <img
            src={imageUrl}
            alt="Taiwan Bike Trip"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>

      {/* Tour Details Section */}
      <div className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-gray-500 mb-6 block">Limited Availability</span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
              🚴‍♂️ Taiwan Bike Tour – Final Call to Join! 🇹🇼
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Hey team! We're locking in what promises to be an epic week of cycling in Taiwan this October – and we want YOU to be part of it!
            </p>
          </div>

          <div className="w-16 h-px bg-gray-200 mx-auto mb-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group">
              <h4 className="text-xl font-light text-gray-900 mb-4">✨ Ride in Style</h4>
              <p className="text-gray-600 leading-relaxed">We've secured our own private driver and support vehicle for the entire week – no panniers, no stress, just you and your bike.</p>
            </div>

            <div className="group">
              <h4 className="text-xl font-light text-gray-900 mb-4">🌊 Scenic East Coast</h4>
              <p className="text-gray-600 leading-relaxed">We'll be rolling along the stunning Pacific coastline – think dramatic cliffs, lush jungle, and seaside towns. Every day brings jaw-dropping views.</p>
            </div>

            <div className="group">
              <h4 className="text-xl font-light text-gray-900 mb-4">⛰️ Challenge Yourself</h4>
              <p className="text-gray-600 leading-relaxed">Yes, the Taiwan KOM! A chance to ride one of the most iconic and scenic mountain climbs in the world. A proper bucket list tick!</p>
            </div>

            <div className="group">
              <h4 className="text-xl font-light text-gray-900 mb-4">🏡 Unique Stays</h4>
              <p className="text-gray-600 leading-relaxed">From a private forest villa to a boutique hot spring hotel and a historic mountain guest house, our accommodation is as diverse and exciting as the terrain.</p>
            </div>

            <div className="group">
              <h4 className="text-xl font-light text-gray-900 mb-4">🍜 Local Culture</h4>
              <p className="text-gray-600 leading-relaxed">We'll overnight in vibrant towns like Hualien and Kaohsiung with access to buzzing night markets and authentic Taiwanese eats.</p>
            </div>

            <div className="bg-black/95 text-white p-8 rounded-sm">
              <h4 className="text-xl font-light mb-4">📅 Tour Dates</h4>
              <p className="leading-relaxed">We kick off from Kaohsiung on Oct 26, wrapping up with a celebration in Taipei.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
