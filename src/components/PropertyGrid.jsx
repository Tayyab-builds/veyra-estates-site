import PropertyCard from './PropertyCard.jsx'
import Button from './Button.jsx'
import Reveal from './motion/Reveal.jsx'
import { Link } from '../router.jsx'

// 'auto' keeps the original 1 / 2 / 3 / 4 column rhythm (Properties, Buy,
// Favorites…). 'three' caps the grid at three columns so each card — and the
// photograph inside it — gets more room, which is what the curated Rent
// grid asks for on desktop.
const GRID_COLUMNS = {
  auto: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  three: 'sm:grid-cols-2 lg:grid-cols-3',
}

function PropertyGrid({
  properties,
  visibleCount,
  onLoadMore,
  emptyTitle = 'No properties match those filters',
  emptyMessage = 'Try widening your search, or clear a filter to see more properties.',
  onReset,
  resetLabel = 'Clear Filters',
  emptySecondaryLabel,
  emptySecondaryTo,
  loadMoreLabel = 'Load More Properties',
  columns = 'auto',
}) {
  const visible = properties.slice(0, visibleCount)
  const hasMore = visibleCount < properties.length

  if (properties.length === 0) {
    return (
      <Reveal
        amount={0.3}
        className="border border-stone bg-ivory px-6 py-14 text-center sm:px-12 sm:py-20"
      >
        <div className="flex justify-center">
          <span className="eyebrow-soft">Nothing To Show</span>
        </div>
        <p className="mt-5 font-display text-2xl leading-snug text-plum sm:text-[1.75rem]">
          {emptyTitle}
        </p>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-plum/70">
          {emptyMessage}
        </p>
        {(onReset || emptySecondaryTo) && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {onReset && (
              <Button variant="primary" onClick={onReset}>
                {resetLabel}
              </Button>
            )}
            {emptySecondaryTo && (
              <Button as={Link} to={emptySecondaryTo} variant="secondary">
                {emptySecondaryLabel}
              </Button>
            )}
          </div>
        )}
      </Reveal>
    )
  }

  return (
    <div>
      <div
        className={`grid gap-x-8 gap-y-14 ${GRID_COLUMNS[columns] ?? GRID_COLUMNS.auto}`}
      >
        {visible.map((property, i) => (
          <PropertyCard key={property.id} property={property} index={i % 8} />
        ))}
      </div>

      {hasMore && (
        <Reveal
          direction="none"
          duration={0.5}
          amount={0.5}
          className="mt-14 flex justify-center"
        >
          <Button variant="secondary" onClick={onLoadMore}>
            {loadMoreLabel}
          </Button>
        </Reveal>
      )}
    </div>
  )
}

export default PropertyGrid
