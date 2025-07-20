import Hero from './components/Hero'
import MainContent from './components/MainContent'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero 
        title="Taiwan Bike Trip"
        subtitle="Discover Cyclist-Friendly Accommodations Across Taiwan"
        imageUrl="/hero-image.jpg"
      />
      <MainContent />
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Taiwan Bike Trip. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
