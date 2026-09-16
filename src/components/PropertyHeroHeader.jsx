import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from '../router.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

function PropertyHeroHeader({ property }) {
  return (
    <div className="container-veyra">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeEditorial }}
      >
        <Link
          to="/properties"
          className="group inline-flex items-center gap-2 text-sm text-plum/60 transition-colors duration-300 hover:text-plum"
        >
          <FiArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to Properties
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easeEditorial }}
        className="mt-5 flex flex-col gap-4 sm:mt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6"
      >
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.14em] text-plum/45">
            <span>{property.type}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{property.purpose === 'Rent' ? 'For Rent' : 'For Sale'}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl leading-[1.08] text-plum sm:text-5xl lg:text-6xl">
            {property.name}
          </h1>
          <p className="mt-3 text-plum/60 sm:text-lg">{property.location}</p>
        </div>

        <p className="font-display text-3xl text-plum sm:text-4xl lg:text-right">{property.price}</p>
      </motion.div>
    </div>
  )
}

export default PropertyHeroHeader
