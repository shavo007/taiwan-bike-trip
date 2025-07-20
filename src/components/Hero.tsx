import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={imageUrl}
          alt="Taiwan Bike Trip"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
