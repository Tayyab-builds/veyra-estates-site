import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import LocationsHero from '../components/LocationsHero.jsx'
import ExploreMarkets from '../components/ExploreMarkets.jsx'
import LocationDiscovery from '../components/LocationDiscovery.jsx'
import FeaturedMarket from '../components/FeaturedMarket.jsx'
import LocalPerspective from '../components/LocalPerspective.jsx'

function Locations() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Locations Hero */}
        <LocationsHero />

        {/* 2. Explore Our Markets */}
        <ExploreMarkets />

        {/* 3. Location Discovery */}
        <LocationDiscovery />

        {/* 4. Featured Market */}
        <FeaturedMarket />

        {/* 5. Local Perspective */}
        <LocalPerspective />

        {/* 6. Locations CTA */}
        <FinalCTA
          heading="Ready to explore a market in depth?"
          description="Browse current listings across our four cities, or speak with an advisor who knows the market you're interested in."
          primaryLabel="Explore Properties"
          primaryTo="/properties"
          secondaryLabel="Meet the Agents"
          secondaryTo="/agents"
        />
      </main>
      <Footer />
    </div>
  )
}

export default Locations
