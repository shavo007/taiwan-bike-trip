'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  value, 
  size = 80, 
  className = '' 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(value, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
        setError('');
      } catch (err) {
        console.error('Error generating QR code:', err);
        setError('Failed to generate QR code');
      }
    };

    if (value) {
      generateQRCode();
    }
  }, [value, size]);

  if (error) {
    return (
      <div className={`text-xs text-red-500 ${className}`}>
        {error}
      </div>
    );
  }

  if (!qrCodeUrl) {
    return (
      <div className={`text-xs text-gray-500 ${className}`}>
        Generating QR code...
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <Image 
        src={qrCodeUrl} 
        alt="QR Code for accommodation location"
        className="border border-gray-200 rounded"
        width={size}
        height={size}
        unoptimized
      />
      <div className="text-xs text-gray-600 text-center">
        Scan for location
      </div>
    </div>
  );
};

export default QRCodeDisplay;
