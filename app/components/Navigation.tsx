'use client';

import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className={`font-light text-xl transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            Taiwan Bike Tour
          </div>

          <div className="hidden md:flex space-x-8">
            {[
              { label: 'Home', id: 'hero' },
              { label: 'Highlights', id: 'features' },
              { label: 'Itinerary', id: 'itinerary' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors hover:opacity-70 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a
            href="mailto:hello@ekhoekho.global?subject=Taiwan Bike Tour 2025 - Booking Inquiry&body=Hi there,%0D%0A%0D%0AI'm interested in joining the Taiwan Bike Tour 2025 (October 26 - November 2). Could you please send me more details about booking and availability?%0D%0A%0D%0AThank you!"
            className={`px-6 py-2 rounded-sm transition-all ${
              isScrolled
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
