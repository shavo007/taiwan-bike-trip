const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-light mb-4">Taiwan Bike Tour 2025</h3>
            <p className="text-gray-400 leading-relaxed">
              An unforgettable cycling adventure along Taiwan&apos;s stunning east coast, combining
              breathtaking scenery with authentic cultural experiences.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Tour Information</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📅 October 26 - November 2, 2025</li>
              <li>🚴‍♂️ 8-day cycling adventure</li>
              <li>🏨 Premium accommodations included</li>
              <li>🚐 Support vehicle provided</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>Ready to join us?</p>
              <a
                href="mailto:hello@ekhoekho.global?subject=Taiwan Bike Tour 2025 - Contact Inquiry&body=Hi there,%0D%0A%0D%0AI'd like to get in touch about the Taiwan Bike Tour 2025. Please send me more information.%0D%0A%0D%0AThank you!"
                className="bg-white text-black px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors mt-4 inline-block"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Taiwan Bike Tour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
