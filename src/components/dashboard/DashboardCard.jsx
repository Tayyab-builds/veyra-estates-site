/**
 * Shared content-card shell for the customer dashboard. Reuses the same
 * ivory panel + hairline border language already used across the site
 * (see e.g. the empty states in `pages/Favorites.jsx`) rather than
 * introducing a new "admin panel" card style.
 */
function DashboardCard({ eyebrow, title, action, children, className = '' }) {
  return (
    <section className={`border border-stone bg-ivory p-6 sm:p-7 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div>
          {eyebrow && (
            <p className="text-[0.68rem] tracking-[0.14em] uppercase text-plum/45">{eyebrow}</p>
          )}
          <h2 className="mt-1 font-display text-xl text-plum sm:text-[1.35rem]">{title}</h2>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default DashboardCard
