import { FiHeart } from 'react-icons/fi'
import { Link } from '../../router.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'

/**
 * Compact, single-row presentation of a saved property for the customer
 * dashboard's "Favorites Summary" card.
 *
 * The full `PropertyCard` (see `components/PropertyCard.jsx`) is built for
 * wide, multi-column grids on the Properties/Buy/Rent/Favorites pages — its
 * tall image, large title, and separate metadata row need real column width
 * to lay out cleanly. Inside this dashboard card the available width is
 * narrow at every breakpoint (it shares a row with two other cards on
 * desktop, and sits in a single-column mobile layout), so reusing
 * `PropertyCard` here caused titles, locations and prices to visually
 * collide. This component instead lays each saved property out as one
 * fixed-size thumbnail plus a `min-w-0` text column, so every piece of text
 * truncates or wraps within its own space instead of overflowing into its
 * neighbors, at any viewport width.
 */
function FavoriteMiniCard({ property }) {
  const { toggleFavorite } = useFavorites()

  return (
    <div className="flex min-w-0 items-center gap-3 border border-stone bg-parchment/40 p-3 sm:gap-4 sm:p-4">
      <Link
        to={`/properties/${property.id}`}
        className="relative h-16 w-16 shrink-0 overflow-hidden sm:h-20 sm:w-20"
      >
        <img
          src={property.image}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to={`/properties/${property.id}`}
          className="block truncate font-display text-[0.95rem] leading-snug text-plum transition-colors duration-300 hover:text-terracotta sm:text-base"
        >
          {property.name}
        </Link>
        <p className="mt-0.5 truncate text-xs text-plum/55 sm:text-sm">{property.location}</p>
        <p className="mt-1 truncate text-[0.7rem] text-plum/50 sm:text-xs">
          {property.beds} bd · {property.baths} ba · {property.area}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <p className="whitespace-nowrap font-display text-sm text-plum sm:text-[0.95rem]">
          {property.price}
        </p>
        <button
          type="button"
          onClick={() => toggleFavorite(property.id)}
          aria-label={`Remove ${property.name} from favorites`}
          className="flex h-7 w-7 items-center justify-center text-plum/40 transition-colors duration-300 hover:text-terracotta"
        >
          <FiHeart size={15} className="fill-rose text-rose" />
        </button>
      </div>
    </div>
  )
}

export default FavoriteMiniCard
