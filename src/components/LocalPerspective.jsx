import { motion } from 'framer-motion'
import { locations } from '../data/locations.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const principles = [
  {
    index: '01',
    title: 'Understand the Character',
    text: 'Two neighborhoods in the same city can live completely differently. We start by understanding what makes each one distinct.',
  },
  {
    index: '02',
    title: 'Choose Deliberately',
    text: "A shortlist built around a place, not just a price range, tends to hold up better once you're actually living there.",
  },
  {
    index: '03',
    title: 'Match the Lifestyle',
    text: 'The right property fits how someone actually lives — the commute, the quiet, the neighbors — as much as the floor plan.',
  },
]

function LocalPerspective() {
  const imageLocation = locations.find((l) => l.id === 'dubai') ?? locations[0]

  return (
    <section aria-label="The value of local perspective" className="bg-ink py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="lg:col-span-7"
          >
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/50">
              Local Perspective
            </p>
            <h2 className="mt-5 max-w-xl font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-ivory">
              The right home starts with the right place.
            </h2>
            <p className="mt-6 max-w-lg text-ivory/60 text-base sm:text-lg leading-relaxed">
              A property is only ever as good as its setting. Knowing a
              market closely — not just its listings, but its rhythm — is
              what lets us match someone to a place they'll actually want to
              stay.
            </p>

            <ul className="mt-12 border-t border-ivory/15">
              {principles.map((principle, i) => (
                <motion.li
                  key={principle.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: easeEditorial }}
                  className="grid grid-cols-[3rem_1fr] gap-6 border-b border-ivory/15 py-6 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="font-display text-lg text-terracotta-light sm:text-xl">
                    {principle.index}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ivory sm:text-xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-md text-ivory/55 text-sm leading-relaxed sm:text-base">
                      {principle.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: easeEditorial }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={imageLocation.image}
                alt={`Architecture representative of ${imageLocation.name}, one of Veyra's markets`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
            <p className="mt-4 text-sm text-ivory/45">{imageLocation.name}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocalPerspective
