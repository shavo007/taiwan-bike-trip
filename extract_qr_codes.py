#!/usr/bin/env python3
"""
QR Code extraction script for Taiwan bike trip accommodation PDF
"""

import pdfplumber
from PIL import Image
import io
import sys

def extract_qr_codes_from_pdf():
    """Extract QR codes from the bike accommodation PDF"""
    
    qr_codes = {}
    
    try:
        import cv2
        from pyzbar import pyzbar
        print("✅ QR libraries loaded successfully")
        
        # Function to decode QR codes from image
        def decode_qr_from_image(image_data):
            try:
                # Convert to PIL Image
                pil_image = Image.open(io.BytesIO(image_data))
                
                # Convert PIL to OpenCV format
                import numpy as np
                opencv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
                
                # Decode QR codes
                qr_codes_found = pyzbar.decode(opencv_image)
                
                if qr_codes_found:
                    return [qr.data.decode('utf-8') for qr in qr_codes_found]
                return None
                
            except Exception as e:
                print(f"Error processing image: {e}")
                return None
        
        # Process PDF
        with pdfplumber.open('bike_accommodation.pdf') as pdf:
            print(f"📄 Processing PDF with {len(pdf.pages)} pages")
            
            # Process pages 2-10 (accommodation pages)
            for page_num in range(1, min(10, len(pdf.pages))):  # Pages 2-10 (0-indexed)
                page = pdf.pages[page_num]
                day_number = page_num  # Day 1 is page 2 (index 1)
                
                print(f"\n🔍 Processing Day {day_number} (Page {page_num + 1})...")
                
                # Get all images from the page using different approach
                try:
                    # Convert entire page to image and scan for QR codes
                    page_image = page.to_image(resolution=300)
                    image_data = io.BytesIO()
                    page_image.save(image_data, format='PNG')
                    image_data.seek(0)
                    
                    # Try to decode QR code from entire page
                    qr_result = decode_qr_from_image(image_data.getvalue())
                    
                    if qr_result:
                        print(f"   ✅ QR Code found on page: {qr_result[0]}")
                        qr_codes[f'day_{day_number}'] = qr_result[0]
                    else:
                        print(f"   ⚠️  No QR code detected on page")
                        
                except Exception as e:
                    print(f"   ❌ Error processing page image: {e}")
                    
                # Also try extracting images individually if page scan didn't work
                if f'day_{day_number}' not in qr_codes:
                    try:
                        images = page.images
                        print(f"   Found {len(images)} images on page, trying individual extraction...")
                        
                        for img_idx, img in enumerate(images):
                            try:
                                # Get image coordinates
                                x0, y0, x1, y1 = img['x0'], img['y0'], img['x1'], img['y1']
                                
                                # Extract image using coordinates
                                cropped_page = page.crop((x0, y0, x1, y1))
                                image_obj = cropped_page.to_image(resolution=300)
                                image_data = io.BytesIO()
                                image_obj.save(image_data, format='PNG')
                                image_data.seek(0)
                                
                                # Try to decode QR code
                                qr_result = decode_qr_from_image(image_data.getvalue())
                                
                                if qr_result:
                                    print(f"   ✅ QR Code found in image {img_idx}: {qr_result[0]}")
                                    qr_codes[f'day_{day_number}'] = qr_result[0]
                                    break  # Found QR code for this day
                                    
                            except Exception as e:
                                print(f"   ❌ Error processing image {img_idx}: {e}")
                                continue
                                
                    except Exception as e:
                        print(f"   ❌ Error accessing images: {e}")
                
                if f'day_{day_number}' not in qr_codes:
                    print(f"   ⚠️  No QR code found for Day {day_number}")
                    
    except ImportError as e:
        print(f"❌ Missing required libraries: {e}")
        print("Installing required libraries...")
        
        import subprocess
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'opencv-python', 'pyzbar'], check=True)
        
        print("Libraries installed! Please run the script again.")
        return {}
        
    except Exception as e:
        print(f"❌ Error processing PDF: {e}")
        return {}
    
    return qr_codes

def main():
    print("🔄 Starting QR code extraction from Taiwan bike trip PDF...")
    
    qr_codes = extract_qr_codes_from_pdf()
    
    if qr_codes:
        print(f"\n✅ Successfully extracted {len(qr_codes)} QR codes:")
        for day, code in qr_codes.items():
            print(f"   {day}: {code}")
    else:
        print("\n⚠️  No QR codes were extracted")
    
    return qr_codes

if __name__ == "__main__":
    main()
