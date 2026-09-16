import { motion } from 'framer-motion'
import { locations } from '../data/locations.js'
import { useSiteContent } from '../data/siteContentStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

function LocationsHero() {
  const content = useSiteContent('locations')
  const featured = locations[0]

  return (
    <section
      aria-label="Introduction to Veyra's markets"
      className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#f5f1e8_1px,transparent_1px),linear-gradient(to_bottom,#f5f1e8_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="container-veyra relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: easeEditorial }}
              className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/50 sm:text-xs"
            >
              Our Markets
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: easeEditorial }}
              className="mt-5 max-w-2xl font-display text-[2.5rem] font-normal leading-[1.08] text-ivory sm:text-6xl lg:text-[4rem]"
            >
              {content.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easeEditorial }}
              className="mt-7 max-w-md text-ivory/65 text-base leading-relaxed sm:text-lg"
            >
              {content.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: easeEditorial }}
              className="mt-12 flex gap-10 border-t border-ivory/15 pt-6 sm:gap-14"
            >
              <div>
                <p className="font-display text-3xl text-ivory">{locations.length}</p>
                <p className="mt-1 text-sm text-ivory/50">Distinct markets</p>
              </div>
              <div>
                <p className="font-display text-3xl text-ivory">2011</p>
                <p className="mt-1 text-sm text-ivory/50">Representing since</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 hidden border border-terracotta/30 sm:block"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={featured.image}
                  alt={`Architecture and skyline representative of ${featured.name}, one of Veyra's markets`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute left-3 top-3 bg-ivory/95 px-4 py-3 sm:left-5 sm:top-5">
                <p className="font-display text-sm text-plum">{featured.name}</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-plum/50">
                  {featured.count}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocationsHero
