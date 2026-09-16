import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import SectionHeading from './SectionHeading.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

function MapPlaceholder({ city, country }) {
  return (
    <div
      role="img"
      aria-label={`Stylized map placeholder for ${city}, ${country} — not an interactive map`}
      className="relative aspect-[4/3] w-full overflow-hidden bg-parchment sm:aspect-[16/10]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full text-plum/10"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 44} y1="0" x2={i * 44} y2="300" stroke="currentColor" strokeWidth="1" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 44} x2="400" y2={i * 44} stroke="currentColor" strokeWidth="1" />
        ))}
        <path
          d="M20 220 C 90 180, 140 240, 200 190 S 320 140, 380 170"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive text-ivory">
          <FiMapPin size={18} />
        </span>
        <p className="font-display text-lg text-plum">
          {city}, {country}
        </p>
        <p className="max-w-[16rem] text-xs text-plum/45">
          Illustrative map placeholder — not a live or interactive map.
        </p>
      </div>
    </div>
  )
}

function PropertyLocationAgent({ property, agent }) {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="location-agent-heading">
      <div className="container-veyra">
        <SectionHeading
          title="Location & Agent"
          description="Where the residence sits, and who represents it."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeEditorial }}
          >
            <MapPlaceholder city={property.city} country={property.country} />
            <div className="mt-5 border-t border-stone pt-5">
              <p className="font-display text-xl text-plum">{property.location}</p>
              {property.neighborhood && (
                <p className="mt-2 text-sm leading-relaxed text-plum/60">{property.neighborhood}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeEditorial }}
            className="flex flex-col gap-6 sm:flex-row sm:gap-7"
          >
            <div className="aspect-[3/4] w-full max-w-[13rem] shrink-0 overflow-hidden sm:w-1/3">
              <img
                src={agent.image}
                alt={`Portrait of ${agent.name}, ${agent.role}`}
                className="h-full w-full object-cover grayscale-[15%]"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col border-t border-stone pt-5 sm:border-t-0 sm:pt-0">
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-plum/45">Listing Agent</p>
              <h3 className="mt-2 font-display text-2xl text-plum">{agent.name}</h3>
              <p className="mt-1 text-sm text-plum/55">{agent.role}</p>
              {agent.bio && <p className="mt-4 text-sm leading-relaxed text-plum/65">{agent.bio}</p>}

              <div className="mt-5 flex flex-col gap-2.5 border-t border-stone pt-5">
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum"
                >
                  <FiMail size={14} /> {agent.email}
                </a>
                <a
                  href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum"
                >
                  <FiPhone size={14} /> {agent.phone}
                </a>
              </div>

              <a
                href="#inquiry"
                className="ease-editorial mt-6 inline-flex w-fit items-center justify-center border border-olive bg-olive px-6 py-3 text-sm font-medium tracking-wide text-ivory transition-all duration-300 hover:border-olive-light hover:bg-olive-light"
              >
                Contact {agent.name.split(' ')[0]}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PropertyLocationAgent
