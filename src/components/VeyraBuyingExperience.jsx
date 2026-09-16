import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useProperties } from '../data/propertyStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const principles = [
  {
    title: 'Curated Discovery',
    text: 'Every listing is chosen for its setting and condition, not simply added because it is on the market.',
  },
  {
    title: 'Market Knowledge',
    text: 'Our agents work within a handful of cities, and know each of those markets closely.',
  },
  {
    title: 'Thoughtful Matching',
    text: 'A dedicated agent helps you weigh each property against what you actually need.',
  },
  {
    title: 'Private Viewings',
    text: 'Enquire on a listing and an agent will arrange a private viewing directly with you.',
  },
]

// Reads the live property store (rather than a module-level snapshot) so
// an admin add/edit/delete is reflected immediately — mirroring the Rent
// equivalent, RentingWithVeyra.
function VeyraBuyingExperience() {
  const properties = useProperties()

  const sectionImage = useMemo(() => {
    const saleListings = properties.filter((property) => property.purpose === 'Buy')
    return (
      saleListings.find((property) => property.id === 'sutton-place-residence')?.image ||
      saleListings.find((property) => property.image)?.image ||
      ''
    )
  }, [properties])

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: easeEditorial }}
            className="lg:col-span-6"
          >
            <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-plum">
              Buying, Considered Properly.
            </h2>
            <p className="mt-6 max-w-md text-plum/65 text-lg leading-relaxed">
              A purchase this size deserves more than a listing page —
              the right property, explained clearly, by someone who
              knows the building and the neighborhood around it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: easeEditorial }}
            className="lg:col-span-6 aspect-[16/11] overflow-hidden"
          >
            <img
              src={sectionImage}
              alt="A serene interior representative of a Veyra home for sale"
              className="h-full w-full object-cover transition-transform duration-700 ease-editorial will-change-transform hover:scale-[1.04]"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col divide-y divide-stone border-t border-stone lg:mt-20 lg:flex-row lg:divide-x lg:divide-y-0">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: easeEditorial }}
              className="flex-1 py-7 lg:px-8 lg:py-0 lg:pt-8"
            >
              <h3 className="font-display text-xl text-plum">{principle.title}</h3>
              <p className="mt-2.5 text-plum/60 text-sm leading-relaxed max-w-[260px]">
                {principle.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VeyraBuyingExperience
