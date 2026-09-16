import { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import PropertyFilters from '../components/PropertyFilters.jsx'
import PropertyGrid from '../components/PropertyGrid.jsx'
import LocationCard from '../components/LocationCard.jsx'
import PropertiesHero from '../components/PropertiesHero.jsx'
import { useProperties } from '../data/propertyStore.js'
import { locations } from '../data/locations.js'
import { useRouter } from '../router.jsx'
import { matchesFilters, countActiveFilters, defaultFilters } from '../lib/filterProperties.js'
import { cityOptions } from '../data/filterOptions.js'

const PAGE_SIZE = 9
const LOAD_MORE_STEP = 6

function getSearchParams(path) {
  const queryStart = path.indexOf('?')
  if (queryStart === -1) return new URLSearchParams()
  return new URLSearchParams(path.slice(queryStart + 1).split('#')[0])
}

function Properties() {
  const properties = useProperties()
  const { path } = useRouter()
  const gridRef = useRef(null)

  const [filters, setFilters] = useState(() => {
    const params = getSearchParams(path)
    const purposeParam = params.get('purpose')
    const cityParam = params.get('city')
    return {
      ...defaultFilters,
      purpose: purposeParam === 'Buy' || purposeParam === 'Rent' ? purposeParam : defaultFilters.purpose,
      city: cityOptions.includes(cityParam) ? cityParam : defaultFilters.city,
    }
  })
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Keep filters in sync if the navbar's Buy/Rent links, or the Locations
  // page's city links, are clicked while already on this page (path changes
  // but the component stays mounted).
  useEffect(() => {
    const params = getSearchParams(path)
    const purposeParam = params.get('purpose')
    const cityParam = params.get('city')
    setFilters((prev) => {
      let next = prev
      if ((purposeParam === 'Buy' || purposeParam === 'Rent') && prev.purpose !== purposeParam) {
        // Buy/Rent use separate price-range option sets (see
        // `priceRangesFor`), so a price selected under the previous
        // purpose can be a label that doesn't exist in the new one —
        // same reset `updateFilters` already does for a manual purpose
        // change below, applied here too so the URL-driven switch (e.g.
        // the footer's Buy/Rent links) can't leave a stale, invisible
        // price filter silently in effect.
        next = { ...next, purpose: purposeParam, price: defaultFilters.price }
      }
      if (cityOptions.includes(cityParam) && prev.city !== cityParam) {
        next = { ...next, city: cityParam }
      }
      return next
    })
  }, [path])

  const updateFilters = (partial) => {
    setFilters((prev) => {
      const next = { ...prev, ...partial }
      if (partial.purpose && partial.purpose !== prev.purpose) {
        next.price = defaultFilters.price
      }
      return next
    })
    setVisibleCount(PAGE_SIZE)
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    setVisibleCount(PAGE_SIZE)
  }

  const filteredProperties = useMemo(
    () => properties.filter((property) => matchesFilters(property, filters)),
    [properties, filters],
  )

  const activeCount = useMemo(() => countActiveFilters(filters), [filters])

  const featured = useMemo(
    () => properties.filter((property) => property.featured).slice(0, 4),
    [properties],
  )

  const handleSelectLocation = (locationId) => {
    const location = locations.find((l) => l.id === locationId)
    if (!location) return
    updateFilters({ city: filters.city === location.name ? defaultFilters.city : location.name })
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Page hero */}
        <PropertiesHero />

        {/* 2. Search & filters */}
        <PropertyFilters
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
          resultCount={filteredProperties.length}
          activeCount={activeCount}
        />

        {/* 3. Featured / recommended */}
        <section className="py-20 lg:py-24">
          <div className="container-veyra">
            <SectionHeading
              title="Selected for You"
              description="A small edit of standout residences, chosen for their setting, craft, or story."
            />
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {featured.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* 4. All properties grid */}
        <section id="all-properties" ref={gridRef} className="py-4 lg:py-10 scroll-mt-28">
          <div className="container-veyra">
            <SectionHeading
              title="Explore All Properties"
              description="Every current listing across New York, London, Dubai and Miami."
            />
            <div className="mt-12">
              <PropertyGrid
                properties={filteredProperties}
                visibleCount={visibleCount}
                onLoadMore={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
                emptyMessage="Try widening your search, or clear a filter to see more residences."
              />
            </div>
          </div>
        </section>

        {/* 5. Explore locations */}
        <section className="py-24 lg:py-32 bg-ivory">
          <div className="container-veyra">
            <SectionHeading
              title="Explore Locations"
              description="Four markets we know intimately — select one to see what's currently available."
            />
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px] gap-5">
              {locations.map((location, i) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onSelect={handleSelectLocation}
                  active={filters.city === location.name}
                  className={`aspect-[4/3] lg:aspect-auto ${
                    i === 0 || i === 3 ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Closing CTA */}
        <FinalCTA
          heading="Still Looking for the Right Place?"
          description="Explore the full collection, or speak with a Veyra property specialist who knows the market you're interested in."
          primaryLabel="Explore Properties"
          primaryHref="#all-properties"
          secondaryLabel="Speak With an Expert"
          secondaryHref="#footer"
        />
      </main>
      <Footer />
    </div>
  )
}

export default Properties
