import { useMemo } from 'react'
import { FiArrowDown } from 'react-icons/fi'
import { useProperties } from '../data/propertyStore.js'
import { useSiteContent } from '../data/siteContentStore.js'
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal.jsx'

/**
 * Rent page hero — full-bleed photograph, editorial type, and a single
 * quiet action that leads into the search panel below.
 *
 * Entrance order is deliberate: the photograph settles first (1.02 → 1), then
 * the eyebrow, heading, supporting copy and the search cue stagger in behind
 * it. Text travel is kept to a few pixels so nothing appears to jump.
 *
 * The hero reads the live property store (rather than a module-level
 * snapshot) so an admin edit or removal is reflected immediately — and it
 * degrades safely if the flagship listing no longer exists.
 */
function RentHero() {
  const content = useSiteContent('rent')
  const properties = useProperties()

  const rentals = useMemo(
    () => properties.filter((property) => property.purpose === 'Rent'),
    [properties],
  )

  // Same flagship rental the page has always used, with a safe fallback to
  // the first rental that actually has a photograph.
  const defaultHeroImage =
    rentals.find((property) => property.id === 'harbor-crest-residence')?.image ||
    rentals.find((property) => property.image)?.image ||
    ''

  const heroImage = content.heroImage || defaultHeroImage

  const rentalCities = useMemo(
    () => [...new Set(rentals.map((property) => property.city).filter(Boolean))],
    [rentals],
  )

  const rentalCount = rentals.length
  const availabilityLine =
    rentalCount > 0
      ? `${rentalCount} current rental${rentalCount === 1 ? '' : 's'} across ${rentalCities.join(', ')}`
      : 'New rental listings are added regularly'

  const scrollToSearch = (event) => {
    event.preventDefault()
    document.getElementById('rental-search')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section aria-label="Rentals introduction" className="relative w-full overflow-hidden bg-ink">
      <Reveal
        variant="scale"
        scaleFrom={1.02}
        direction="none"
        duration={1.1}
        amount={0.2}
        className="absolute inset-0"
      >
        {heroImage && (
          <img
            src={heroImage}
            alt="A light-filled waterfront residence available to rent through Veyra"
            className="h-full w-full object-cover"
            loading="eager"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent" />
      </Reveal>

      {/* `min-h` rather than a fixed height: the hero stays immersive on
          large screens but is free to grow on narrow ones, so the heading can
          never be clipped by a short viewport. */}
      <div className="relative z-10 flex min-h-[68svh] flex-col justify-end pt-32 pb-16 sm:min-h-[560px] sm:pb-20 lg:min-h-[660px] lg:pb-24">
        <div className="container-veyra w-full">
          <RevealGroup as="div" stagger={0.09} delay={0.18} amount={0.3} className="max-w-2xl">
            <RevealItem as="p" duration={0.5} className="eyebrow-dark">
              {content.heroEyebrow}
            </RevealItem>
            <RevealItem
              as="h1"
              className="mt-4 font-display text-[2.1rem] font-normal leading-[1.1] text-ivory sm:text-5xl lg:text-[3.4rem]"
            >
              {content.heroHeading}
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ivory/75 sm:text-lg"
            >
              {content.heroDescription}
            </RevealItem>

            <RevealItem as="div" className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <button
                type="button"
                onClick={scrollToSearch}
                className="inline-flex items-center gap-2.5 border border-ivory/50 px-7 py-3.5 text-[0.9rem] font-medium tracking-wide text-ivory transition-all duration-300 ease-editorial hover:border-ivory hover:bg-ivory hover:text-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
              >
                Search Rentals
                <FiArrowDown size={15} aria-hidden="true" />
              </button>
              <p className="text-sm text-ivory/70">{availabilityLine}</p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

export default RentHero
