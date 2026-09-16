import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi'
import InquiryForm from './InquiryForm.jsx'
import ViewingModal from './ViewingModal.jsx'
import Button from './Button.jsx'
import { Link } from '../router.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

function RelatedPropertyItem({ property, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeEditorial }}
    >
      <Link to={`/properties/${property.id}`} className="group flex items-center gap-4">
        <div className="h-16 w-20 shrink-0 overflow-hidden sm:h-20 sm:w-24">
          <img
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.06]"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base text-ivory sm:text-lg">{property.name}</p>
          <p className="mt-0.5 truncate text-sm text-ivory/55">{property.location}</p>
          <p className="mt-1 text-sm text-ivory/80">{property.price}</p>
        </div>
        <FiArrowUpRight
          size={17}
          className="shrink-0 text-ivory/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-olive-light"
        />
      </Link>
    </motion.div>
  )
}

function PropertyInquiry({ property, relatedProperties }) {
  const [viewingOpen, setViewingOpen] = useState(false)

  return (
    <section id="inquiry" className="bg-plum py-24 lg:py-32">
      <div className="container-veyra">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: easeEditorial }}
              className="font-display text-4xl leading-[1.1] text-ivory sm:text-5xl"
            >
              Interested in this residence?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.08, ease: easeEditorial }}
              className="mt-4 max-w-md text-ivory/65"
            >
              Send an inquiry below, or request a viewing at a time that suits you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.14, ease: easeEditorial }}
              className="mt-9"
            >
              <InquiryForm propertyName={property.name} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeEditorial }}
              className="mt-6 border-t border-ivory/15 pt-6"
            >
              <Button variant="light" onClick={() => setViewingOpen(true)}>
                <FiCalendar size={15} />
                Schedule a Viewing
              </Button>
            </motion.div>
          </div>

          {relatedProperties.length > 0 && (
            <div className="lg:col-span-5 lg:border-l lg:border-ivory/10 lg:pl-10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: easeEditorial }}
                className="text-[0.7rem] uppercase tracking-[0.14em] text-ivory/45"
              >
                You May Also Like
              </motion.p>
              <div className="mt-6 flex flex-col gap-6">
                {relatedProperties.map((related, i) => (
                  <RelatedPropertyItem key={related.id} property={related} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ViewingModal open={viewingOpen} onClose={() => setViewingOpen(false)} propertyName={property.name} />
    </section>
  )
}

export default PropertyInquiry
