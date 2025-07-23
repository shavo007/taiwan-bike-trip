'use client';

import Image from 'next/image';

const Hero = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/taiwan-bike-trip' : '';
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${basePath}/images/hero_img.jpg`}
          alt="Taiwan Bike Tour"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl">
          <div className="text-sm uppercase tracking-wider mb-4 text-white/80">
            October 26 - November 2, 2025
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            Taiwan Bike <br />Tour 2025
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl font-light leading-relaxed">
            Experience the breathtaking beauty of Taiwan&apos;s east coast on an exclusive cycling adventure through dramatic cliffs, lush jungles, and seaside towns.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <button className="bg-white text-black px-8 py-4 rounded-sm hover:bg-gray-100 transition-all duration-300 text-lg font-light transform hover:scale-105">
              Book Your Spot
            </button>
            <button 
              onClick={() => scrollToSection('itinerary')}
              className="border border-white text-white px-8 py-4 rounded-sm hover:bg-white/10 transition-all duration-300 text-lg font-light"
            >
              View Itinerary
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
