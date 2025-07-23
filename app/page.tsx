import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import TourStats from './components/TourStats';
import ItineraryEnhanced from './components/ItineraryEnhanced';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section id="hero">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <TourStats />
      <section id="itinerary">
        <ItineraryEnhanced />
      </section>
      <Footer />
    </main>
  );
}
