#!/usr/bin/env python3
"""
QR Code detection from saved PNG files
"""

from PIL import Image
import sys
import os

def extract_qr_from_images():
    """Extract QR codes from the saved PNG files"""
    
    qr_codes = {}
    
    try:
        import cv2
        from pyzbar import pyzbar
        import numpy as np
        print("✅ QR libraries loaded successfully")
        
        # Function to decode QR codes from image file
        def decode_qr_from_file(image_path):
            try:
                # Load image with PIL
                pil_image = Image.open(image_path)
                
                # Convert PIL to OpenCV format
                opencv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
                
                # Decode QR codes
                qr_codes_found = pyzbar.decode(opencv_image)
                
                if qr_codes_found:
                    return [qr.data.decode('utf-8') for qr in qr_codes_found]
                
                # If no QR codes found, try preprocessing the image
                # Convert to grayscale
                gray = cv2.cvtColor(opencv_image, cv2.COLOR_BGR2GRAY)
                
                # Apply threshold to get better contrast
                _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
                
                # Try decoding again
                qr_codes_found = pyzbar.decode(thresh)
                if qr_codes_found:
                    return [qr.data.decode('utf-8') for qr in qr_codes_found]
                
                return None
                
            except Exception as e:
                print(f"Error processing {image_path}: {e}")
                return None
        
        # Process PNG files for pages 2-10 (Days 1-9)
        for page_num in range(2, 11):  # Pages 2-10
            day_number = page_num - 1  # Day 1 is page 2
            
            # Check for page images
            full_page_file = f'page_{page_num}_full.png'
            largest_file = f'page_{page_num}_largest.bin'
            
            print(f"\n🔍 Processing Day {day_number} (Page {page_num})...")
            
            if os.path.exists(full_page_file):
                print(f"   📄 Scanning full page image: {full_page_file}")
                qr_result = decode_qr_from_file(full_page_file)
                
                if qr_result:
                    print(f"   ✅ QR Code found: {qr_result[0]}")
                    qr_codes[f'day_{day_number}'] = qr_result[0]
                else:
                    print(f"   ⚠️  No QR code detected in full page")
            else:
                print(f"   ❌ Full page image not found: {full_page_file}")
            
            # Also check if there's a separate largest image file
            if f'day_{day_number}' not in qr_codes and os.path.exists(largest_file):
                print(f"   📄 Found largest image file: {largest_file}")
                # Note: .bin files might not be images, skip for now
                
    except ImportError as e:
        print(f"❌ Missing required libraries: {e}")
        return {}
        
    except Exception as e:
        print(f"❌ Error processing images: {e}")
        return {}
    
    return qr_codes

def main():
    print("🔄 Starting QR code extraction from saved PNG files...")
    
    qr_codes = extract_qr_from_images()
    
    if qr_codes:
        print(f"\n✅ Successfully extracted {len(qr_codes)} QR codes:")
        for day, code in qr_codes.items():
            print(f"   {day}: {code}")
    else:
        print("\n⚠️  No QR codes were extracted from PNG files")
        print("   The QR codes might be:")
        print("   • Too small or low resolution")
        print("   • Partially obscured or corrupted")
        print("   • Not standard QR code format")
        print("   • Located in areas not captured properly")
    
    return qr_codes

if __name__ == "__main__":
    main()
