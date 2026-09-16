import { useMemo } from 'react'
import SectionHeading from './SectionHeading.jsx'
import LocationCard from './LocationCard.jsx'
import { useProperties } from '../data/propertyStore.js'

const categoryLabels = {
  Apartment: 'Apartments',
  Villa: 'Villas',
  Residence: 'Residences',
  Penthouse: 'Penthouses',
}

/**
 * Editorial category mosaic for rentals.
 *
 * Built directly from the categories actually present in the live rental
 * inventory — no invented category (e.g. "Townhomes" or "Furnished Homes")
 * is shown unless a rental property with that category exists. Each
 * collection reuses LocationCard and applies the existing `type` filter via
 * `onSelect`, so there is still only one filtering engine on this page.
 *
 * Composition is deliberately asymmetric: the largest collection takes a
 * large two-column frame, the smaller ones sit beside it, and the reveals
 * lead the eye across them in sequence.
 */
function RentalCollections({ activeCategory, onSelect }) {
  const properties = useProperties()

  const collections = useMemo(() => {
    const rentals = properties.filter((property) => property.purpose === 'Rent')
    return [...new Set(rentals.map((property) => property.category).filter(Boolean))]
      .map((category) => {
        const matches = rentals.filter((property) => property.category === category)
        return {
          id: category,
          name: categoryLabels[category] ?? category,
          count: `${matches.length} available to rent`,
          total: matches.length,
          // First match that actually has a photograph, so a listing without
          // one can never leave a collection card broken.
          image: matches.find((property) => property.image)?.image ?? '',
        }
      })
      .sort((a, b) => b.total - a.total)
  }, [properties])

  if (collections.length === 0) return null

  return (
    <section aria-label="Rental collections" className="py-24 lg:py-32">
      <div className="container-veyra">
        <SectionHeading
          eyebrow="Browse By Category"
          eyebrowTone="soft"
          title="Rental Collections"
          description="Browse by the way you want to live — each collection pulls directly from our current rental inventory."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-3">
          {collections.map((collection, i) => (
            <LocationCard
              key={collection.id}
              location={collection}
              onSelect={onSelect}
              active={activeCategory === collection.id}
              revealDelay={i * 0.09}
              className={`aspect-[4/3] lg:aspect-auto ${
                i === 0 ? 'sm:aspect-[16/10] lg:col-span-2 lg:row-span-2' : ''
              }`}
            />
          ))}
        </div>
        <p className="mt-7 text-sm text-plum/70">
          Select a collection to filter the rentals above.
        </p>
      </div>
    </section>
  )
}

export default RentalCollections
