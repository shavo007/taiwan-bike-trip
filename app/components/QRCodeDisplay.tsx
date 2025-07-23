'use client';

import { useEffect, useState, useRef } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCodeWithLogo = async () => {
      try {
        // First generate the QR code
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = size;
        canvas.height = size;

        // Generate QR code on canvas
        await QRCode.toCanvas(canvas, value, {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'H' // High error correction to allow for logo overlay
        });

        // Create bubble tea emoji/icon overlay
        const logoSize = size * 0.2; // Logo will be 20% of QR code size
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        // Create a white background circle for the logo
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize / 2 + 4, 0, 2 * Math.PI);
        ctx.fill();

        // Add a border around the logo area
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize / 2 + 4, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw bubble tea emoji
        ctx.font = `${logoSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText('🧋', size / 2, size / 2);

        // Convert canvas to data URL
        const dataURL = canvas.toDataURL('image/png');
        setQrCodeUrl(dataURL);
        setError('');
      } catch (err) {
        console.error('Error generating QR code with logo:', err);
        setError('Failed to generate QR code');
      }
    };

    if (value) {
      generateQRCodeWithLogo();
    }
  }, [value, size]);

  if (error) {
    return (
      <div className={`text-xs text-red-500 ${className}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }} 
      />
      {qrCodeUrl ? (
        <Image 
          src={qrCodeUrl} 
          alt="QR Code for accommodation location with Taiwan bubble tea logo"
          className="border border-gray-200 rounded"
          width={size}
          height={size}
          unoptimized
        />
      ) : (
        <div className="text-xs text-gray-500">
          Generating branded QR code...
        </div>
      )}
      <div className="text-xs text-gray-600 text-center">
        🧋 Scan for location
      </div>
    </div>
  );
};

export default QRCodeDisplay;
