import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import SectionHeading from './SectionHeading.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

const groups = [
  { key: 'interior', label: 'Interior' },
  { key: 'exterior', label: 'Exterior' },
  { key: 'amenities', label: 'Amenities' },
]

function PropertyFeatures({ features }) {
  const visibleGroups = groups.filter((g) => features?.[g.key]?.length)
  if (visibleGroups.length === 0) return null

  return (
    <section className="bg-ivory py-20 lg:py-28" aria-labelledby="features-heading">
      <div className="container-veyra">
        <SectionHeading
          title="Features & Specifications"
          description="A selection of what sets this residence apart, room by room."
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {visibleGroups.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: gi * 0.08, ease: easeEditorial }}
            >
              <h3 className="border-b border-stone pb-3 text-sm uppercase tracking-[0.14em] text-plum/50">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-col">
                {features[group.key].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-stone/70 py-3 text-plum/75 last:border-none"
                  >
                    <FiPlus size={13} className="mt-1 shrink-0 text-olive" aria-hidden="true" />
                    <span className="text-[0.95rem] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertyFeatures
