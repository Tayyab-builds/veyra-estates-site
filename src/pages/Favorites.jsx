import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiHeart, FiArrowUpRight, FiArrowRight } from 'react-icons/fi'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { useProperties, getRelatedProperties } from '../data/propertyStore.js'
import { Link } from '../router.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

/**
 * Motion presets that collapse to a static, already-visible state when the
 * visitor prefers reduced motion.
 */
function useReveal() {
  const reduceMotion = useReducedMotion()

  return (delay = 0, y = 18) =>
    reduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, delay, ease: easeEditorial },
        }
}

function FavoritesHero({ count }) {
  const label = count === 1 ? '1 Saved Property' : `${count} Saved Properties`

  return (
    <section
      aria-label="Favorites introduction"
      className="relative w-full overflow-hidden bg-ink pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #f5f1e8 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-aubergine/30 blur-[110px]" />

      <div className="container-veyra relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="max-w-2xl"
        >
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/60 sm:text-xs">
            Your Collection
          </p>
          <h1 className="mt-4 font-display text-[2.35rem] font-normal leading-[1.12] text-ivory sm:text-5xl lg:text-[3.4rem]">
            The Homes You've Set Aside.
          </h1>
          <p className="mt-5 max-w-lg text-ivory/70 text-base leading-relaxed sm:text-lg">
            Every residence you save lives here — a private shortlist you can
            return to, compare, and revisit whenever you're ready to take the
            next step.
          </p>

          <div className="mt-8 inline-flex items-center gap-2.5 border border-ivory/20 bg-ivory/5 px-5 py-2.5 backdrop-blur-sm">
            <FiHeart size={15} className={count > 0 ? 'fill-terracotta text-terracotta' : 'text-ivory/60'} />
            <span className="text-[0.8rem] tracking-wide text-ivory/85">{label}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SavedPropertiesEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: easeEditorial }}
      className="flex flex-col items-center border border-stone bg-ivory px-6 py-20 text-center sm:py-24"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-stone bg-parchment">
        <FiHeart size={24} className="text-plum/40" />
      </div>
      <h3 className="mt-6 font-display text-2xl text-plum sm:text-3xl">
        Nothing Saved Yet
      </h3>
      <p className="mt-3 max-w-sm text-plum/60 leading-relaxed">
        Browse the collection and tap the heart on any property to keep it
        here for later.
      </p>
      <Button as={Link} to="/properties" variant="primary" className="mt-8">
        Browse Properties
      </Button>
    </motion.div>
  )
}

function SavedProperties({ savedProperties }) {
  return (
    <section aria-labelledby="saved-properties-heading" className="py-20 lg:py-24">
      <div className="container-veyra">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="flex flex-col gap-4 max-w-xl"
        >
          <h2
            id="saved-properties-heading"
            className="text-3xl sm:text-4xl font-display font-normal leading-[1.1] text-plum text-balance"
          >
            Saved Properties
          </h2>
          <p className="text-plum/65 text-[1.05rem] leading-relaxed">
            {savedProperties.length > 0
              ? 'Everything you\'ve marked as a favorite, in one place.'
              : 'Properties you save will appear here.'}
          </p>
        </motion.div>

        <div className="mt-12">
          {savedProperties.length === 0 ? (
            <SavedPropertiesEmptyState />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {savedProperties.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i % 8} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SpotlightEmptyState() {
  return (
    <section aria-label="Favorite property spotlight" className="pb-20 lg:pb-28">
      <div className="container-veyra">
        <div className="border border-stone bg-ivory px-6 py-16 text-center sm:py-20">
          <p className="font-display text-xl text-plum sm:text-2xl">
            No Spotlight Yet
          </p>
          <p className="mt-3 max-w-md mx-auto text-plum/55 leading-relaxed">
            Save a property to feature it here as an editorial pick from your
            collection.
          </p>
        </div>
      </div>
    </section>
  )
}

function FavoritePropertySpotlight({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!property) {
    return <SpotlightEmptyState />
  }

  const saved = isFavorite(property.id)

  return (
    <section aria-labelledby="spotlight-heading" className="pb-20 lg:pb-28">
      <div className="container-veyra">
        <p className="text-[0.7rem] tracking-[0.28em] uppercase text-plum/45 mb-8">
          From Your Collection
        </p>

        <div className="relative border border-stone bg-ivory">
          <div className="grid lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: easeEditorial }}
              className="relative h-[340px] overflow-hidden sm:h-[440px] lg:h-auto lg:min-h-[520px]"
            >
              <img
                src={property.image}
                alt={`${property.name} in ${property.location}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent lg:hidden" />

              <button
                type="button"
                onClick={() => toggleFavorite(property.id)}
                aria-pressed={saved}
                aria-label={saved ? `Remove ${property.name} from favorites` : `Add ${property.name} to favorites`}
                className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center bg-ivory/85 text-plum backdrop-blur-sm transition-colors duration-300 hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
              >
                <FiHeart size={17} className={saved ? 'fill-rose text-rose' : ''} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeEditorial }}
              className="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
            >
              <span className="w-fit text-[0.7rem] tracking-wide bg-plum text-ivory px-3 py-1">
                {property.purpose === 'Rent' ? 'For Rent' : 'For Sale'}
              </span>

              <h2
                id="spotlight-heading"
                className="font-display text-3xl leading-[1.1] text-plum sm:text-4xl lg:text-[2.75rem]"
              >
                {property.name}
              </h2>

              <p className="text-plum/55">{property.location}</p>

              {property.description && (
                <p className="max-w-md text-plum/65 leading-relaxed">
                  {property.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-stone pt-5 text-sm text-plum/60">
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.area}</span>
              </div>

              <p className="font-display text-2xl text-plum">{property.price}</p>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button as={Link} to={`/properties/${property.id}`} variant="primary">
                  View Details
                  <FiArrowUpRight size={16} />
                </Button>
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.id)}
                  aria-pressed={saved}
                  aria-label={saved ? `Remove ${property.name} from favorites` : `Add ${property.name} to favorites`}
                  className="text-[0.85rem] tracking-wide text-plum/60 underline decoration-stone underline-offset-4 transition-colors duration-300 hover:text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                >
                  {saved ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Your Saved Collection                                            */
/* ------------------------------------------------------------------ */

/** Real, derived facts about the saved set — no invented analytics. */
function buildCollectionSummary(savedProperties) {
  if (savedProperties.length === 0) return null

  const cities = [...new Set(savedProperties.map((property) => property.city))]
  const categories = [...new Set(savedProperties.map((property) => property.category))]
  const beds = savedProperties.map((property) => property.beds)
  const minBeds = Math.min(...beds)
  const maxBeds = Math.max(...beds)
  const forSale = savedProperties.filter((property) => property.purpose === 'Buy').length
  const forRent = savedProperties.length - forSale
  const byValue = [...savedProperties].sort((a, b) => a.priceValue - b.priceValue)

  const purposeMix = [
    forSale > 0 ? `${forSale} for sale` : null,
    forRent > 0 ? `${forRent} to rent` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return {
    cities,
    categories,
    bedroomRange: minBeds === maxBeds ? `${minBeds}` : `${minBeds}–${maxBeds}`,
    purposeMix,
    lowest: byValue[0],
    highest: byValue[byValue.length - 1],
  }
}

function CollectionStat({ label, value }) {
  return (
    <div className="border-t border-stone pt-5">
      <dt className="text-[0.65rem] tracking-[0.24em] uppercase text-plum/45">{label}</dt>
      <dd className="mt-2 font-display text-lg leading-snug text-plum text-pretty sm:text-xl">
        {value}
      </dd>
    </div>
  )
}

function SavedCollectionRow({ property, reveal, index }) {
  const { toggleFavorite } = useFavorites()

  return (
    <motion.li
      {...reveal(Math.min(index, 4) * 0.06, 14)}
      className="border-t border-stone py-6 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
        <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-36 lg:h-24 lg:w-20">
          <img
            src={property.image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl leading-snug text-plum">
            <Link
              to={`/properties/${property.id}`}
              className="transition-colors duration-300 hover:text-olive"
            >
              {property.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-plum/55">{property.location}</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:flex lg:shrink-0 lg:items-center lg:gap-8">
          <div>
            <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-plum/40">Type</dt>
            <dd className="mt-1 text-sm text-plum/70">{property.category}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-plum/40">Beds</dt>
            <dd className="mt-1 text-sm text-plum/70">
              {property.beds} · {property.baths} baths
            </dd>
          </div>
          <div className="col-span-2 sm:col-auto">
            <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-plum/40">Size</dt>
            <dd className="mt-1 text-sm text-plum/70">{property.area}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between gap-4 border-t border-stone pt-4 lg:w-40 lg:shrink-0 lg:flex-col lg:items-end lg:gap-2 lg:border-t-0 lg:pt-0">
          <p className="font-display text-[1.05rem] text-plum">{property.price}</p>
          <button
            type="button"
            onClick={() => toggleFavorite(property.id)}
            aria-label={`Remove ${property.name} from favorites`}
            className="text-[0.75rem] tracking-wide text-plum/50 underline decoration-stone underline-offset-4 transition-colors duration-300 hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  )
}

function SavedCollectionEmptyState({ reveal }) {
  return (
    <motion.div
      {...reveal(0.1, 16)}
      className="mt-12 flex flex-col items-start gap-5 border-l-2 border-olive/40 pl-6 sm:pl-8"
    >
      <p className="max-w-md text-plum/60 leading-relaxed">
        Once you save a residence, this is where the shape of your collection
        appears — the cities you're drawn to, the kinds of homes you return to,
        the range you're considering.
      </p>
      <Link
        to="/properties"
        className="group inline-flex items-center gap-2 text-[0.85rem] tracking-wide text-plum transition-colors duration-300 hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
      >
        Start your collection
        <FiArrowRight
          size={15}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
  )
}

function YourSavedCollection({ savedProperties }) {
  const reveal = useReveal()
  const summary = useMemo(() => buildCollectionSummary(savedProperties), [savedProperties])
  const showRange = Boolean(summary) && savedProperties.length > 1

  return (
    <section
      aria-labelledby="saved-collection-heading"
      className="border-y border-stone bg-ivory py-20 lg:py-28"
    >
      <div className="container-veyra">
        <motion.div {...reveal()} className="flex max-w-xl flex-col gap-4">
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-plum/45">
            The Shape of It
          </p>
          <h2
            id="saved-collection-heading"
            className="font-display text-3xl font-normal leading-[1.1] text-plum text-balance sm:text-4xl"
          >
            Your Saved Collection
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-plum/65">
            {summary
              ? 'A closer read of what you\u2019ve set aside — where these homes are, what they are, and how they sit beside one another.'
              : 'A closer read of your shortlist appears here as soon as you save your first residence.'}
          </p>
        </motion.div>

        {summary ? (
          <>
            <motion.dl
              {...reveal(0.1, 16)}
              className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              <CollectionStat
                label="Locations"
                value={summary.cities.join(' · ')}
              />
              <CollectionStat
                label="Property Types"
                value={summary.categories.join(' · ')}
              />
              <CollectionStat
                label={summary.bedroomRange.includes('\u2013') ? 'Bedroom Range' : 'Bedrooms'}
                value={`${summary.bedroomRange} bed${summary.bedroomRange === '1' ? '' : 's'}`}
              />
              <CollectionStat label="Saved As" value={summary.purposeMix} />
            </motion.dl>

            {showRange && (
              <motion.p
                {...reveal(0.15, 12)}
                className="mt-8 border-t border-stone pt-6 text-sm leading-relaxed text-plum/55"
              >
                Lowest listed in your collection is {summary.lowest.name} at{' '}
                <span className="text-plum/80">{summary.lowest.price}</span>; the highest is{' '}
                {summary.highest.name} at{' '}
                <span className="text-plum/80">{summary.highest.price}</span>.
              </motion.p>
            )}

            <ul className="mt-12 border-t border-stone pt-6 sm:mt-14">
              {savedProperties.map((property, index) => (
                <SavedCollectionRow
                  key={property.id}
                  property={property}
                  reveal={reveal}
                  index={index}
                />
              ))}
            </ul>
          </>
        ) : (
          <SavedCollectionEmptyState reveal={reveal} />
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Find More Homes                                                  */
/* ------------------------------------------------------------------ */

const discoveryRoutes = [
  { label: 'The Full Collection', description: 'Every residence we represent.', to: '/properties' },
  { label: 'Homes for Sale', description: 'Residences available to buy.', to: '/buy' },
  { label: 'Homes to Rent', description: 'Long-stay and seasonal lets.', to: '/rent' },
  { label: 'Explore Locations', description: 'New York, London, Dubai, Miami.', to: '/locations' },
]

function DiscoveryPreview({ property, reveal, index }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(property.id)

  return (
    <motion.article {...reveal(0.08 * index, 16)} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={`${property.name} in ${property.location}`}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.05]"
          loading="lazy"
        />
        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${property.name} from favorites`
              : `Add ${property.name} to favorites`
          }
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center bg-ivory/85 text-plum backdrop-blur-sm transition-colors duration-300 hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
        >
          <FiHeart size={15} className={saved ? 'fill-rose text-rose' : ''} />
        </button>
      </div>

      <Link to={`/properties/${property.id}`} className="flex flex-col gap-1 pt-4">
        <h3 className="font-display text-lg leading-snug text-plum transition-colors duration-300 group-hover:text-olive">
          {property.name}
        </h3>
        <p className="text-sm text-plum/55">{property.location}</p>
        <p className="mt-1 text-sm text-plum/70">{property.price}</p>
      </Link>
    </motion.article>
  )
}

function FindMoreHomes({ suggestions, hasSaved, cities }) {
  const reveal = useReveal()

  return (
    <section aria-labelledby="find-more-heading" className="py-20 lg:py-28">
      <div className="container-veyra">
        <motion.div {...reveal()} className="flex max-w-xl flex-col gap-4">
          <p className="text-[0.7rem] tracking-[0.28em] uppercase text-plum/45">
            Keep Looking
          </p>
          <h2
            id="find-more-heading"
            className="font-display text-3xl font-normal leading-[1.1] text-plum text-balance sm:text-4xl"
          >
            Find More Homes
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-plum/65">
            {hasSaved
              ? 'A few residences that sit close to what you\u2019ve already saved, and other ways into the collection.'
              : 'Start somewhere — a city, a purpose, or simply the full collection.'}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div {...reveal(0.05, 16)} className="lg:col-span-5">
            <ul className="border-t border-stone">
              {discoveryRoutes.map((route) => (
                <li key={route.to} className="border-b border-stone">
                  <Link
                    to={route.to}
                    className="group flex items-center justify-between gap-5 py-5 transition-colors duration-300 hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-xl leading-snug text-plum transition-colors duration-300 group-hover:text-olive">
                        {route.label}
                      </span>
                      <span className="mt-1 block text-sm text-plum/55">
                        {route.description}
                      </span>
                    </span>
                    <FiArrowUpRight
                      size={18}
                      className="shrink-0 text-plum/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-olive"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-[0.65rem] tracking-[0.24em] uppercase text-plum/45">
                By City
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {cities.map((city) => (
                  <Link
                    key={city}
                    to={`/properties?city=${encodeURIComponent(city)}`}
                    className="border border-stone bg-ivory px-4 py-2 text-[0.8rem] tracking-wide text-plum/75 transition-colors duration-300 hover:border-olive hover:text-olive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {suggestions.length > 0 && (
            <div className="lg:col-span-7">
              <p className="mb-6 text-[0.65rem] tracking-[0.24em] uppercase text-plum/45">
                {hasSaved ? 'Close to What You\u2019ve Saved' : 'Worth a Look'}
              </p>
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
                {suggestions.map((property, index) => (
                  <DiscoveryPreview
                    key={property.id}
                    property={property}
                    reveal={reveal}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Favorites() {
  const properties = useProperties()
  const { favoriteIds } = useFavorites()

  // Stale / unknown ids — including favorites removed by an admin — are
  // dropped here, so the rest of the page never has to guard against a
  // missing property record.
  const savedProperties = useMemo(
    () =>
      favoriteIds
        .map((id) => properties.find((property) => property.id === id))
        .filter(Boolean),
    [properties, favoriteIds],
  )

  const spotlightProperty = savedProperties[0] ?? null
  const hasSaved = savedProperties.length > 0

  /** Up to three unsaved residences, related to the collection when possible. */
  const suggestions = useMemo(() => {
    const savedIds = new Set(savedProperties.map((property) => property.id))
    const picked = []

    const add = (property) => {
      if (picked.length >= 3) return
      if (savedIds.has(property.id)) return
      if (picked.some((item) => item.id === property.id)) return
      picked.push(property)
    }

    savedProperties
      .slice(0, 3)
      .forEach((property) => getRelatedProperties(property, 4).forEach(add))

    properties.filter((property) => property.featured).forEach(add)
    properties.forEach(add)

    return picked
  }, [properties, savedProperties])

  const discoveryCities = useMemo(
    () => [...new Set(properties.map((property) => property.city))],
    [properties],
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-parchment">
      <Navbar />
      <main>
        {/* 1. Favorites Hero */}
        <FavoritesHero count={savedProperties.length} />

        {/* 2. Saved Properties */}
        <SavedProperties savedProperties={savedProperties} />

        {/* 3. Favorite Property Spotlight */}
        <FavoritePropertySpotlight property={spotlightProperty} />

        {/* 4. Your Saved Collection */}
        <YourSavedCollection savedProperties={savedProperties} />

        {/* 5. Find More Homes */}
        <FindMoreHomes
          suggestions={suggestions}
          hasSaved={hasSaved}
          cities={discoveryCities}
        />

        {/* 6. Favorites CTA */}
        {hasSaved ? (
          <FinalCTA
            heading="Ready to see them in person?"
            description="Keep comparing at your own pace — or let an advisor walk you through the residences you've saved."
            primaryLabel="Contact Veyra"
            primaryTo="/contact"
            secondaryLabel="Meet the Agents"
            secondaryTo="/agents"
          />
        ) : (
          <FinalCTA
            heading="Your collection starts with one."
            description="Browse the residences we represent and save the ones worth returning to."
            primaryLabel="Explore Properties"
            primaryTo="/properties"
            secondaryLabel="Find a Home"
            secondaryTo="/buy"
          />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Favorites
