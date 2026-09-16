import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHeart, FiShare2, FiCheck } from 'react-icons/fi'
import { useFavorites } from '../hooks/useFavorites.js'

const easeEditorial = [0.22, 1, 0.36, 1]

function Stat({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 py-3 pr-6 sm:py-0">
      <span className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">{label}</span>
      <span className="font-display text-lg text-plum sm:text-xl">{value}</span>
    </div>
  )
}

function PropertyOverview({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(property.id)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: `${property.name} — Veyra Estates`,
      text: `${property.name} in ${property.location}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2200)
      } catch {
        // clipboard unavailable — silently no-op in this demo
      }
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: easeEditorial }}
      aria-label="Property overview"
      className="border-y border-stone"
    >
      <div className="container-veyra flex flex-col gap-6 py-6 sm:py-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap divide-y divide-stone sm:flex-nowrap sm:divide-y-0 sm:divide-x sm:divide-stone">
          <Stat label="Bedrooms" value={property.beds} />
          <Stat label="Bathrooms" value={property.baths} />
          <Stat label="Area" value={property.area} />
          <Stat label="Type" value={property.type} />
          <Stat label="Year Built" value={property.yearBuilt} />
          <Stat label="Parking" value={property.parking} />
          <Stat label="Status" value={property.availability} />
        </div>

        <div className="flex items-center gap-3 border-t border-stone pt-5 lg:border-t-0 lg:pt-0">
          <motion.button
            type="button"
            onClick={() => toggleFavorite(property.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${property.name} from favorites` : `Add ${property.name} to favorites`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: easeEditorial }}
            className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
              saved ? 'border-rose/40 text-rose' : 'border-plum/25 text-plum hover:border-plum'
            }`}
          >
            <motion.span
              key={saved ? 'saved' : 'unsaved'}
              initial={{ scale: 0.7, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: easeEditorial }}
              className="inline-flex"
            >
              <FiHeart size={15} className={saved ? 'fill-rose text-rose' : ''} />
            </motion.span>
            {saved ? 'Saved' : 'Save'}
          </motion.button>
          <motion.button
            type="button"
            onClick={handleShare}
            aria-label={`Share ${property.name}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: easeEditorial }}
            className="inline-flex items-center gap-2 border border-plum/25 px-4 py-2.5 text-sm text-plum transition-colors duration-300 hover:border-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
          >
            {copied ? <FiCheck size={15} /> : <FiShare2 size={15} />}
            {copied ? 'Copied' : 'Share'}
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}

export default PropertyOverview
