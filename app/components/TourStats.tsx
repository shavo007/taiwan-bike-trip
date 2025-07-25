'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

const TourStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = useMemo(() => [
    {
      number: '8',
      targetValue: 8,
      unit: 'Days',
      description: 'Epic cycling adventure'
    },
    {
      number: '750+',
      targetValue: 750,
      unit: 'KM',
      description: 'Total distance covered'
    },
    {
      number: '10,000+',
      targetValue: 10000,
      unit: 'M',
      description: 'Total elevation gain'
    },
    {
      number: '7',
      targetValue: 7,
      unit: 'Unique',
      description: 'Accommodation experiences'
    }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.targetValue / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(Math.floor(increment * currentStep), stat.targetValue);
        
        setAnimatedValues(prev => {
          const updated = [...prev];
          updated[index] = newValue;
          return updated;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [isVisible, stats]);

  const formatValue = (value: number, index: number) => {
    switch (index) {
      case 1: // KM
        return value >= 750 ? '750+' : value.toString();
      case 2: // Elevation
        return value >= 10000 ? '10,000+' : value.toLocaleString();
      default:
        return value.toString();
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-4">Tour by the Numbers</h2>
          <p className="text-blue-100">Experience Taiwan like never before</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.unit} className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2 transition-all duration-300">
                <span className="inline-block">
                  {isVisible ? formatValue(animatedValues[index], index) : '0'}
                </span>
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
