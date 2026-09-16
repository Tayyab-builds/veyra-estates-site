import SectionHeading from './SectionHeading.jsx'
import LocationCard from './LocationCard.jsx'
import { locations } from '../data/locations.js'
import { useRouter } from '../router.jsx'

function ExploreMarkets() {
  const { navigate } = useRouter()

  // Reuses the Properties page's existing city filter (the same mechanism
  // already used by PopularLocations / the Properties page's own location
  // grid) rather than introducing a second filtering system.
  const handleSelectLocation = (locationId) => {
    const location = locations.find((l) => l.id === locationId)
    if (!location) return
    navigate(`/properties?city=${encodeURIComponent(location.name)}`)
  }

  return (
    <section aria-label="Explore our markets" className="py-24 lg:py-32 bg-parchment">
      <div className="container-veyra">
        <SectionHeading
          title="Explore Our Markets"
          description="Every city Veyra currently represents. Select one to see what's available there right now."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, i) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={handleSelectLocation}
              className="aspect-[4/5]"
              revealDelay={(i % 3) * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreMarkets
