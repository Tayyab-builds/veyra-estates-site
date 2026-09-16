import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { useProperties } from '../data/propertyStore.js'
import { useSiteContent } from '../data/siteContentStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

// Reads the live property store (rather than a module-level snapshot) so
// an admin add/edit/delete is reflected immediately — mirroring RentHero.
function BuyHero() {
  const content = useSiteContent('buy')
  const properties = useProperties()

  const saleListings = useMemo(
    () => properties.filter((property) => property.purpose === 'Buy'),
    [properties],
  )

  // Reuse an existing for-sale listing's image rather than introducing a
  // new, unverified asset — the Meridian Residence is one of the current
  // sale listings and reads well as a hero image, with a safe fallback if
  // it no longer exists. Developer Mode can override this with another
  // existing listing's image (see Section 5, Media / Content Settings) but
  // never with an uploaded file.
  const defaultHeroImage =
    saleListings.find((property) => property.id === 'meridian-residence')?.image ??
    saleListings.find((property) => property.image)?.image ??
    ''

  const saleCount = saleListings.length
  const saleCities = useMemo(
    () => [...new Set(saleListings.map((property) => property.city).filter(Boolean))],
    [saleListings],
  )

  const heroImage = content.heroImage || defaultHeroImage

  const scrollToSearch = (event) => {
    event.preventDefault()
    document.getElementById('buy-search')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      aria-label="Buying introduction"
      className="relative h-[76svh] min-h-[500px] w-full overflow-hidden bg-ink sm:min-h-[560px] lg:min-h-[660px]"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A refined loft residence available for purchase through Veyra"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-16 pt-28 sm:pb-20 lg:pb-24">
        <div className="container-veyra w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeEditorial }}
          >
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/65 sm:text-xs">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-[2.35rem] font-normal leading-[1.12] text-ivory sm:text-5xl lg:text-[3.4rem]">
              {content.heroHeading}
            </h1>
            <p className="mt-5 max-w-lg text-ivory/70 text-base leading-relaxed sm:text-lg">
              {content.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={scrollToSearch}
                className="ease-editorial inline-flex items-center gap-2.5 border border-ivory/50 px-7 py-3.5 text-[0.9rem] font-medium tracking-wide text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-plum"
              >
                Search Homes For Sale
                <FiArrowDown size={15} />
              </button>
              <p className="text-ivory/55 text-sm">
                {saleCount} home{saleCount === 1 ? '' : 's'} currently for sale across{' '}
                {saleCities.join(', ')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BuyHero
