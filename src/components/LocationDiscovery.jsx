import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from '../router.jsx'
import { locations } from '../data/locations.js'
import { getNeighborhoods } from '../lib/locationInsights.js'

const easeEditorial = [0.22, 1, 0.36, 1]

function LocationDiscovery() {
  return (
    <section aria-label="How to explore our locations" className="py-20 lg:py-28 bg-ivory">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="lg:col-span-4"
          >
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-plum/50">
              Where to Look
            </p>
            <h2 className="mt-5 max-w-sm font-display text-3xl sm:text-4xl font-normal leading-[1.14] text-plum">
              Start with the city. Narrow from there.
            </h2>
            <p className="mt-6 max-w-sm text-plum/65 text-[1.05rem] leading-relaxed">
              Each of our markets is really a handful of distinct
              neighborhoods, each with its own character. A search usually
              moves faster once you know which one you're looking for.
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <ul className="border-t border-stone">
              {locations.map((location, i) => {
                const neighborhoods = getNeighborhoods(location.name)
                return (
                  <motion.li
                    key={location.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: easeEditorial }}
                    className="grid grid-cols-1 gap-3 border-b border-stone py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6"
                  >
                    <div>
                      <h3 className="font-display text-xl text-plum">{location.name}</h3>
                      <p className="mt-1 text-sm text-plum/45">{location.count}</p>
                    </div>

                    {neighborhoods.length > 0 && (
                      <p className="text-sm leading-relaxed text-plum/60">
                        {neighborhoods.join(' · ')}
                      </p>
                    )}

                    <Link
                      to={`/properties?city=${encodeURIComponent(location.name)}`}
                      className="inline-flex items-center gap-1.5 text-sm text-aubergine transition-colors duration-300 hover:text-plum"
                    >
                      View Properties
                      <FiArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationDiscovery
