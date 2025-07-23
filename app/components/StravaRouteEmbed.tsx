'use client';

import { useEffect } from 'react';

interface StravaRouteEmbedProps {
  routeId?: string;
  location: string;
  fullWidth?: boolean;
  style?: 'standard' | 'satellite';
  mapHash?: string;
}

const StravaRouteEmbed: React.FC<StravaRouteEmbedProps> = ({
  routeId = 'placeholder-route-id',
  location,
  fullWidth = true,
  style = 'satellite',
  mapHash = '9.94/43.7504/7.3901'
}) => {
  // Load Strava embed script
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://strava-embeds.com/embed.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const isPlaceholder = routeId === 'placeholder-route-id';

  return (
    <div className="mb-4">
      <div 
        className="strava-embed-placeholder" 
        data-embed-type="route" 
        data-embed-id={routeId} 
        data-full-width={fullWidth.toString()} 
        data-style={style} 
        data-map-hash={mapHash} 
        data-from-embed="true"
        style={{
          width: '100%',
          height: '192px',
          backgroundColor: isPlaceholder ? '#f3f4f6' : 'transparent',
          border: isPlaceholder ? '1px solid #d1d5db' : 'none',
          borderRadius: '0.5rem',
          display: isPlaceholder ? 'flex' : 'block',
          alignItems: isPlaceholder ? 'center' : 'initial',
          justifyContent: isPlaceholder ? 'center' : 'initial',
          color: '#6b7280',
          fontSize: '14px'
        }}
      >
        {isPlaceholder && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>🚴‍♂️</div>
            <div>Strava Route: {location}</div>
            <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
              Replace routeId prop with actual route ID
            </div>
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1 text-center">
        Strava Route: {location}
      </div>
    </div>
  );
};

export default StravaRouteEmbed;
