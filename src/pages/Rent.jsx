import { useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import RentHero from '../components/RentHero.jsx'
import RentalSearch from '../components/RentalSearch.jsx'
import PropertyGrid from '../components/PropertyGrid.jsx'
import RentalCollections from '../components/RentalCollections.jsx'
import RentingWithVeyra from '../components/RentingWithVeyra.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import { useProperties } from '../data/propertyStore.js'
import { matchesFilters, defaultFilters } from '../lib/filterProperties.js'

const PAGE_SIZE = 9
const LOAD_MORE_STEP = 6

// This page only ever shows rentals, so `purpose` is pinned to 'Rent' and
// left out of the "active filters" count / reset target below (it's not a
// user-facing choice on this page — see RentalSearch, which hides the
// Buy/Rent toggle entirely).
const rentDefaultFilters = { ...defaultFilters, purpose: 'Rent' }

function countActiveRentalFilters(filters) {
  let count = 0
  if (filters.search.trim()) count += 1
  if (filters.type !== rentDefaultFilters.type) count += 1
  if (filters.price !== rentDefaultFilters.price) count += 1
  if (filters.bedrooms !== rentDefaultFilters.bedrooms) count += 1
  if (filters.bathrooms !== rentDefaultFilters.bathrooms) count += 1
  if (filters.minArea !== rentDefaultFilters.minArea) count += 1
  if (filters.city !== rentDefaultFilters.city) count += 1
  return count
}

function Rent() {
  const properties = useProperties()
  const [filters, setFilters] = useState(rentDefaultFilters)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const resultsRef = useRef(null)

  const updateFilters = (partial) => {
    // `purpose` is never part of `partial` here (RentalSearch doesn't expose
    // it), but guard anyway so this page can never drift into showing
    // for-sale listings.
    setFilters((prev) => ({ ...prev, ...partial, purpose: 'Rent' }))
    setVisibleCount(PAGE_SIZE)
  }

  const clearFilters = () => {
    setFilters(rentDefaultFilters)
    setVisibleCount(PAGE_SIZE)
  }

  const rentalProperties = useMemo(
    () => properties.filter((property) => matchesFilters(property, filters)),
    [properties, filters],
  )

  const activeCount = useMemo(() => countActiveRentalFilters(filters), [filters])

  // Rental Collections (Section 4) applies the same `type` filter used by
  // Rental Search (Section 2) — no separate filtering engine.
  const handleSelectCollection = (category) => {
    updateFilters({ type: filters.type === category ? rentDefaultFilters.type : category })
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Rent Hero */}
        <RentHero />

        {/* 2. Rental Search */}
        <section aria-label="Rental search" className="bg-ivory">
          <RentalSearch
            filters={filters}
            onChange={updateFilters}
            onClear={clearFilters}
            resultCount={rentalProperties.length}
            activeCount={activeCount}
          />
        </section>

        {/* 3. Featured Rentals */}
        <section
          id="featured-rentals"
          aria-label="Featured Rentals"
          ref={resultsRef}
          className="pt-14 pb-20 scroll-mt-28 lg:pt-16 lg:pb-24"
        >
          <div className="container-veyra">
            <SectionHeading
              eyebrow="Current Availability"
              eyebrowTone="soft"
              title="Featured Rentals"
              description="Current leases across New York, London, Dubai and Miami — each one professionally managed and ready to view."
            />
            <div className="mt-12 lg:mt-14">
              <PropertyGrid
                properties={rentalProperties}
                visibleCount={visibleCount}
                onLoadMore={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
                columns="three"
                loadMoreLabel="Load More Rentals"
                emptyTitle="No rentals match those filters."
                emptyMessage="Try widening your search, or clear a filter to see more available rentals."
                onReset={clearFilters}
                resetLabel="Clear Filters"
                emptySecondaryLabel="Browse All Properties"
                emptySecondaryTo="/properties"
              />
            </div>
          </div>
        </section>

        {/* 4. Rental Collections */}
        <RentalCollections activeCategory={filters.type} onSelect={handleSelectCollection} />

        {/* 5. Renting With Veyra */}
        <RentingWithVeyra />

        {/* 6. Rent CTA */}
        <FinalCTA
          heading="Ready To Find Your Next Address?"
          description="Browse the current rental collection, or speak with an agent who knows the building and the neighborhood around it."
          primaryLabel="Explore Rentals"
          primaryHref="#featured-rentals"
          secondaryLabel="Meet the Agents"
          secondaryTo="/agents"
        />
      </main>
      <Footer />
    </div>
  )
}

export default Rent
