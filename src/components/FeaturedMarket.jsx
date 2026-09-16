import { motion } from 'framer-motion'
import { Link } from '../router.jsx'
import Button from './Button.jsx'
import { locations } from '../data/locations.js'
import { getNeighborhoods } from '../lib/locationInsights.js'

const easeEditorial = [0.22, 1, 0.36, 1]

function formatNeighborhoods(names) {
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

function FeaturedMarket() {
  const market = locations.find((l) => l.id === 'miami') ?? locations[0]
  const neighborhoods = getNeighborhoods(market.name)
  const neighborhoodsCopy = formatNeighborhoods(neighborhoods)

  return (
    <section aria-label={`Featured market: ${market.name}`} className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: easeEditorial }}
        className="group relative h-[78vh] min-h-[520px] w-full overflow-hidden sm:h-[82vh] lg:h-[88vh]"
      >
        <img
          src={market.image}
          alt={`Architecture and skyline in ${market.name}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-editorial will-change-transform motion-safe:group-hover:scale-[1.025]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-veyra pb-14 sm:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="max-w-xl"
          >
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/60 sm:text-xs">
              Featured Market
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-ivory">
              {market.name}
            </h2>
            <p className="mt-5 text-ivory/80 leading-relaxed text-base sm:text-lg">
              {neighborhoodsCopy
                ? `Represented across ${neighborhoodsCopy} — a market of very different addresses, not just one.`
                : 'A market we know closely, represented across a number of very different addresses.'}
            </p>
            <p className="mt-4 text-ivory/55 text-sm">{market.count}</p>
            <Button
              as={Link}
              to={`/properties?city=${encodeURIComponent(market.name)}`}
              variant="light"
              className="mt-7"
            >
              Explore {market.name} Properties
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMarket
