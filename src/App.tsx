import Hero from './components/Hero'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
      <Hero 
        title="Explore Taiwan by Bike"
        subtitle="Discover the perfect cyclist-friendly stays across the island's most beautiful routes"
        imageUrl="/hero-image.jpg"
      />
    </div>
  )
}

export default App
