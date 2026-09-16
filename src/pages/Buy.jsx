import { useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import BuyHero from '../components/BuyHero.jsx'
import BuySearch from '../components/BuySearch.jsx'
import PropertyGrid from '../components/PropertyGrid.jsx'
import BuyerCollections from '../components/BuyerCollections.jsx'
import VeyraBuyingExperience from '../components/VeyraBuyingExperience.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import { useProperties } from '../data/propertyStore.js'
import { matchesFilters, defaultFilters } from '../lib/filterProperties.js'

const PAGE_SIZE = 9
const LOAD_MORE_STEP = 6

// This page only ever shows homes for sale, so `purpose` is pinned to
// 'Buy' and left out of the "active filters" count / reset target below
// (it's not a user-facing choice on this page — see BuySearch, which
// hides the Buy/Rent toggle entirely). Mirrors rentDefaultFilters on
// /rent.
const buyDefaultFilters = { ...defaultFilters, purpose: 'Buy' }

function countActiveBuyFilters(filters) {
  let count = 0
  if (filters.search.trim()) count += 1
  if (filters.type !== buyDefaultFilters.type) count += 1
  if (filters.price !== buyDefaultFilters.price) count += 1
  if (filters.bedrooms !== buyDefaultFilters.bedrooms) count += 1
  if (filters.bathrooms !== buyDefaultFilters.bathrooms) count += 1
  if (filters.minArea !== buyDefaultFilters.minArea) count += 1
  if (filters.city !== buyDefaultFilters.city) count += 1
  return count
}

function Buy() {
  const properties = useProperties()
  const [filters, setFilters] = useState(buyDefaultFilters)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const resultsRef = useRef(null)

  const updateFilters = (partial) => {
    // `purpose` is never part of `partial` here (BuySearch doesn't expose
    // it), but guard anyway so this page can never drift into showing
    // rental listings.
    setFilters((prev) => ({ ...prev, ...partial, purpose: 'Buy' }))
    setVisibleCount(PAGE_SIZE)
  }

  const clearFilters = () => {
    setFilters(buyDefaultFilters)
    setVisibleCount(PAGE_SIZE)
  }

  const saleProperties = useMemo(
    () => properties.filter((property) => matchesFilters(property, filters)),
    [properties, filters],
  )

  const activeCount = useMemo(() => countActiveBuyFilters(filters), [filters])

  // Buyer Collections (Section 4) applies the same `type` filter used by
  // Property Search (Section 2) — no separate filtering engine.
  const handleSelectCollection = (category) => {
    updateFilters({ type: filters.type === category ? buyDefaultFilters.type : category })
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Buy Hero */}
        <BuyHero />

        {/* 2. Property Search */}
        <BuySearch
          filters={filters}
          onChange={updateFilters}
          onClear={clearFilters}
          resultCount={saleProperties.length}
          activeCount={activeCount}
        />

        {/* 3. Featured Homes For Sale */}
        <section id="featured-homes" ref={resultsRef} className="py-20 lg:py-24 scroll-mt-28">
          <div className="container-veyra">
            <SectionHeading
              title="Featured Homes For Sale"
              description="Current listings across New York, London, Dubai and Miami — each one available to view with an agent."
            />
            <div className="mt-12">
              <PropertyGrid
                properties={saleProperties}
                visibleCount={visibleCount}
                onLoadMore={() => setVisibleCount((v) => v + LOAD_MORE_STEP)}
                emptyMessage="Try widening your search, or clear a filter to see more homes for sale."
              />
            </div>
          </div>
        </section>

        {/* 4. Buyer Collections */}
        <BuyerCollections activeCategory={filters.type} onSelect={handleSelectCollection} />

        {/* 5. The Veyra Buying Experience */}
        <VeyraBuyingExperience />

        {/* 6. Buy CTA */}
        <FinalCTA
          heading="Ready To Find Your Next Home?"
          description="Browse the current collection of homes for sale, or speak with an agent who knows the building and the neighborhood around it."
          primaryLabel="Explore Homes For Sale"
          primaryHref="#featured-homes"
          secondaryLabel="Meet the Agents"
          secondaryTo="/agents"
        />
      </main>
      <Footer />
    </div>
  )
}

export default Buy
