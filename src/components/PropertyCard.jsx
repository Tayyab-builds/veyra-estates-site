import { FiHeart, FiArrowUpRight } from 'react-icons/fi'
import { useFavorites } from '../hooks/useFavorites.js'
import { Link } from '../router.jsx'
import { Reveal } from './motion/Reveal.jsx'

function PropertyCard({ property, index = 0, variant = 'grid' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(property.id)
  const featured = variant === 'featured'

  return (
    <Reveal
      as="article"
      delay={Math.min(index * 0.08, 0.32)}
      duration={0.6}
      amount={0.25}
      className="group flex flex-col"
    >
      <div
        className={`relative overflow-hidden border border-transparent transition-[border-color,box-shadow] duration-500 ease-editorial group-hover:border-stone group-hover:shadow-[0_22px_44px_-30px_rgba(24,33,31,0.5)] ${
          featured ? 'aspect-[4/5] sm:aspect-[3/4]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={property.image}
          alt={`${property.name} in ${property.location}`}
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-editorial will-change-transform motion-safe:group-hover:scale-[1.035]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.name} from favorites` : `Add ${property.name} to favorites`}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center bg-ivory/95 text-plum transition-all duration-300 ease-editorial hover:bg-ivory motion-safe:hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
        >
          <FiHeart
            size={17}
            className={`transition-all duration-300 ease-editorial ${
              saved ? 'fill-wine text-wine scale-[1.06]' : 'text-plum/80'
            }`}
          />
        </button>

        <span className="absolute bottom-4 left-4 text-[0.7rem] tracking-wide bg-ivory/95 text-plum px-3 py-1">
          {property.type}
        </span>
        <span className="absolute bottom-4 right-4 text-[0.7rem] tracking-wide bg-ink/85 text-ivory px-3 py-1">
          {property.purpose === 'Rent' ? 'For Rent' : 'For Sale'}
        </span>

        {featured && property.description && (
          <p className="absolute inset-x-0 bottom-14 px-4 text-ivory/90 text-sm leading-relaxed opacity-0 translate-y-2 transition-all duration-400 ease-editorial group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
            {property.description}
          </p>
        )}
      </div>

      <Link to={`/properties/${property.id}`} className="pt-5 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-plum leading-snug transition-colors duration-300 group-hover:text-olive-dark">
            {property.name}
          </h3>
          <FiArrowUpRight
            size={18}
            className="mt-1.5 shrink-0 text-plum/50 transition-all duration-300 ease-editorial motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 group-hover:text-olive"
          />
        </div>
        <p className="text-sm text-plum/70">{property.location}</p>

        <div className="mt-3 pt-3 border-t border-stone flex items-center justify-between gap-3">
          <p className="text-sm text-plum/70">
            {property.beds} beds, {property.baths} baths, {property.area}
          </p>
          <p className="font-display text-[1.05rem] text-plum whitespace-nowrap">{property.price}</p>
        </div>
      </Link>
    </Reveal>
  )
}

export default PropertyCard
