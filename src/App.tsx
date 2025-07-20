import BikeAccommodation from './components/BikeAccommodation'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Taiwan Bike Trip</h1>
          <p className="mt-2">Find bike-friendly accommodations for your cycling adventure</p>
        </div>
      </header>
      <main>
        <BikeAccommodation />
      </main>
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Taiwan Bike Trip. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
