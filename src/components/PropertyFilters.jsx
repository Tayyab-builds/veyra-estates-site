import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSearch, FiSliders, FiX, FiChevronDown } from 'react-icons/fi'
import {
  propertyTypes,
  bedroomOptions,
  bathroomOptions,
  areaOptions,
  cityOptions,
  priceRangesFor,
} from '../data/filterOptions.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const selectClass =
  'bg-transparent text-plum focus:outline-none text-[0.95rem] -ml-0.5 disabled:opacity-40'
const labelClass = 'text-[0.7rem] uppercase tracking-wide2 text-plum/45 mb-1'

function PropertyFilters({ filters, onChange, onClear, resultCount, activeCount }) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchId = useId()
  const priceRanges = priceRangesFor(filters.purpose)

  const update = (key) => (event) => onChange({ [key]: event.target.value })

  const MoreFields = ({ idPrefix }) => (
    <div className="grid gap-y-5 gap-x-6 sm:grid-cols-3">
      <label className="flex flex-col">
        <span className={labelClass}>Bathrooms</span>
        <select
          className={selectClass}
          value={filters.bathrooms}
          onChange={update('bathrooms')}
          id={`${idPrefix}-bathrooms`}
        >
          {bathroomOptions.map((b) => (
            <option key={b} value={b}>
              {b === 'Any' ? 'Any Bathrooms' : `${b} Bathroom${b === '1' ? '' : 's'}`}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        <span className={labelClass}>Minimum Area</span>
        <select
          className={selectClass}
          value={filters.minArea}
          onChange={update('minArea')}
          id={`${idPrefix}-area`}
        >
          {areaOptions.map((a) => (
            <option key={a.label} value={a.label}>
              {a.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        <span className={labelClass}>Location</span>
        <select
          className={selectClass}
          value={filters.city}
          onChange={update('city')}
          id={`${idPrefix}-city`}
        >
          {cityOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </div>
  )

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 lg:-mt-10 px-4 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeEditorial }}
        className="container-veyra !px-0 max-w-content mx-auto bg-ivory border border-stone shadow-[0_18px_50px_-24px_rgba(52,43,50,0.35)]"
      >
        {/* Desktop / tablet filter bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden lg:block"
          aria-label="Property filters"
        >
          <div className="flex items-stretch">
            <div className="flex border-r border-stone">
              {['Buy', 'Rent'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange({ purpose: option })}
                  aria-pressed={filters.purpose === option}
                  className={`w-24 px-4 py-5 text-sm tracking-wide transition-colors duration-300 ${
                    filters.purpose === option ? 'bg-olive text-ivory' : 'text-plum/60 hover:text-plum'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex-1 grid grid-cols-5 divide-x divide-stone border-r border-stone">
              <label className="flex flex-col justify-center px-5 py-4" htmlFor={searchId}>
                <span className={labelClass}>Location</span>
                <input
                  id={searchId}
                  type="text"
                  value={filters.search}
                  onChange={update('search')}
                  placeholder="City, neighborhood..."
                  className="bg-transparent text-plum placeholder:text-plum/35 focus:outline-none text-[0.95rem]"
                />
              </label>

              <label className="flex flex-col justify-center px-5 py-4">
                <span className={labelClass}>Type</span>
                <select className={selectClass} value={filters.type} onChange={update('type')}>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col justify-center px-5 py-4">
                <span className={labelClass}>Price</span>
                <select className={selectClass} value={filters.price} onChange={update('price')}>
                  {priceRanges.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col justify-center px-5 py-4">
                <span className={labelClass}>Bedrooms</span>
                <select className={selectClass} value={filters.bedrooms} onChange={update('bedrooms')}>
                  {bedroomOptions.map((b) => (
                    <option key={b} value={b}>
                      {b === 'Any' ? 'Any Beds' : `${b} Bed${b === '1' ? '' : 's'}`}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-controls="more-filters-panel"
                className="flex items-center justify-center gap-2 px-4 py-4 text-sm text-plum/70 transition-colors duration-300 hover:text-plum"
              >
                <FiSliders size={15} />
                More Filters
                <FiChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 bg-plum text-ivory text-sm tracking-wide hover:bg-plum/90 transition-colors duration-300"
            >
              <FiSearch size={16} />
              Search
            </button>
          </div>

          <AnimatePresence initial={false}>
            {moreOpen && (
              <motion.div
                id="more-filters-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeEditorial }}
                className="overflow-hidden border-t border-stone"
              >
                <div className="px-6 py-5">
                  <MoreFields idPrefix="desktop" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Mobile filter trigger */}
        <div className="lg:hidden p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex w-full items-center justify-between gap-3 border border-stone bg-parchment px-5 py-4 text-left"
          >
            <span className="flex items-center gap-2.5 text-plum/70 text-sm">
              <FiSearch size={16} />
              {filters.search ? filters.search : 'Search Properties'}
            </span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-wide2 text-olive-dark">
              <FiSliders size={14} />
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Mobile filter panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-plum/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filter properties"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: easeEditorial }}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-ivory px-5 pb-8 pt-5 shadow-[0_-20px_50px_-20px_rgba(52,43,50,0.5)]"
            >
              <div className="flex items-center justify-between border-b border-stone pb-4">
                <h2 className="font-display text-xl text-plum">Filter Properties</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center text-plum/60 hover:text-plum"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-5 pt-5">
                <div className="flex border border-stone">
                  {['Buy', 'Rent'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onChange({ purpose: option })}
                      aria-pressed={filters.purpose === option}
                      className={`flex-1 py-3.5 text-sm tracking-wide transition-colors duration-300 ${
                        filters.purpose === option ? 'bg-olive text-ivory' : 'text-plum/60'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label className="flex flex-col border border-stone px-4 py-3">
                  <span className={labelClass}>Location</span>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={update('search')}
                    placeholder="City, neighborhood..."
                    className="bg-transparent text-plum placeholder:text-plum/35 focus:outline-none text-[0.95rem]"
                  />
                </label>

                <label className="flex flex-col border border-stone px-4 py-3">
                  <span className={labelClass}>Type</span>
                  <select className={selectClass} value={filters.type} onChange={update('type')}>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col border border-stone px-4 py-3">
                    <span className={labelClass}>Price</span>
                    <select className={selectClass} value={filters.price} onChange={update('price')}>
                      {priceRanges.map((p) => (
                        <option key={p.label} value={p.label}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col border border-stone px-4 py-3">
                    <span className={labelClass}>Bedrooms</span>
                    <select
                      className={selectClass}
                      value={filters.bedrooms}
                      onChange={update('bedrooms')}
                    >
                      {bedroomOptions.map((b) => (
                        <option key={b} value={b}>
                          {b === 'Any' ? 'Any' : b}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <details className="group border border-stone px-4 py-3 open:pb-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-plum/70">
                    More Filters
                    <FiChevronDown size={14} className="transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="pt-4">
                    <MoreFields idPrefix="mobile" />
                  </div>
                </details>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="flex-1 border border-plum/30 py-3.5 text-sm text-plum/70 transition-colors duration-300 hover:border-plum hover:text-plum"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex-[2] bg-olive py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-olive-dark"
                >
                  Show {resultCount} Propert{resultCount === 1 ? 'y' : 'ies'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result count + clear (desktop/tablet) */}
      <div className="container-veyra !px-0 max-w-content mx-auto mt-4 hidden items-center justify-between gap-4 px-1 lg:flex">
        <p className="text-sm text-plum/55">
          <span className="font-display text-plum text-base">{resultCount}</span>{' '}
          propert{resultCount === 1 ? 'y' : 'ies'} found
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-plum/55 underline decoration-stone underline-offset-4 transition-colors duration-300 hover:text-plum"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Result count (mobile) */}
      <div className="mt-4 flex items-center justify-between px-1 lg:hidden">
        <p className="text-sm text-plum/55">
          <span className="font-display text-plum text-base">{resultCount}</span>{' '}
          propert{resultCount === 1 ? 'y' : 'ies'} found
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-plum/55 underline decoration-stone underline-offset-4"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default PropertyFilters
