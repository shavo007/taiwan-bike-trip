import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Taiwan Bike Trip"
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
        
        {/* Title with Animation */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          {title}
        </h1>

        {/* Subtitle with Glass Effect */}
        <div className="inline-block backdrop-blur-sm bg-white/10 rounded-lg p-6 shadow-2xl">
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-light">
            {subtitle}
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold 
            transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 
            hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
            Explore Accommodations
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 rounded-full bg-white/30 relative overflow-hidden">
          <div className="w-full h-1/2 bg-white absolute top-0 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
