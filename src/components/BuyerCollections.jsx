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
 * Editorial category grid for buyers. Reuses LocationCard (the same card
 * used for "Explore Locations" on the Properties page and for Rental
 * Collections on /rent) so clicking a collection applies the existing
 * `type` filter rather than introducing a second filtering engine. The
 * asymmetric layout (first collection spans two columns) keeps this
 * distinct from the plain property-card grid used in Section 3.
 *
 * Built directly from the categories actually present in the current
 * for-sale inventory — no invented category (e.g. "Investment Properties"
 * or "Historic Homes") is shown unless a sale listing with that category
 * exists. Reads from the live, reactive property store (mirroring
 * RentalCollections) so an admin add/edit/delete is reflected immediately
 * instead of only the snapshot captured when the module first loaded.
 */
function BuyerCollections({ activeCategory, onSelect }) {
  const properties = useProperties()

  const buyerCollections = useMemo(() => {
    const saleListings = properties.filter((property) => property.purpose === 'Buy')
    return [...new Set(saleListings.map((property) => property.category).filter(Boolean))]
      .map((category) => {
        const matches = saleListings.filter((property) => property.category === category)
        return {
          id: category,
          name: categoryLabels[category] ?? category,
          count: `${matches.length} available to buy`,
          total: matches.length,
          // First match that actually has a photograph, so a listing
          // without one can never leave a collection card broken.
          image: matches.find((property) => property.image)?.image ?? '',
        }
      })
      .sort((a, b) => b.total - a.total)
  }, [properties])

  if (buyerCollections.length === 0) return null

  return (
    <section className="py-20 lg:py-24">
      <div className="container-veyra">
        <SectionHeading
          title="Buyer Collections"
          description="Browse by the kind of home you're after — each collection pulls directly from our current for-sale inventory."
        />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px] gap-5">
          {buyerCollections.map((collection, i) => (
            <LocationCard
              key={collection.id}
              location={collection}
              onSelect={onSelect}
              active={activeCategory === collection.id}
              className={`aspect-[4/3] lg:aspect-auto ${i === 0 ? 'lg:col-span-2' : 'lg:col-span-1'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuyerCollections
