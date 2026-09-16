import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSearch, FiSliders, FiX, FiChevronDown } from 'react-icons/fi'
import {
  propertyTypes,
  bedroomOptions,
  bathroomOptions,
  areaOptions,
  cityOptions,
  rentPriceRanges,
} from '../data/filterOptions.js'
import { defaultFilters } from '../lib/filterProperties.js'
import { Reveal } from './motion/Reveal.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

// The same defaults this page's `filters` state is built from — used only to
// give a field a quiet "active" treatment. No filter logic lives here.
const rentalDefaults = { ...defaultFilters, purpose: 'Rent' }

const labelBase = 'text-[0.7rem] uppercase tracking-wide2 mb-1 transition-colors duration-200'

// One field shell for every control: a hairline-divided surface that warms
// slightly while focused, with a brass rule that draws in beneath the field.
// Same vocabulary as the search bar on the Properties page.
const fieldShell =
  'group relative flex flex-col justify-center transition-colors duration-200 ease-editorial focus-within:bg-parchment/50'

const fieldUnderline =
  'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-editorial group-focus-within:scale-x-100'

// Boxed variant for the expanded "More Filters" panel and the mobile sheet,
// where fields are stacked rather than divided by hairlines.
const boxedFieldShell =
  'group relative flex flex-col justify-center border border-stone px-4 py-3 transition-colors duration-200 ease-editorial focus-within:border-plum/30 focus-within:bg-parchment/50'

const selectClass =
  'w-full bg-transparent text-plum focus:outline-none text-[0.95rem] -ml-0.5 disabled:opacity-40'
const inputClass =
  'w-full bg-transparent text-plum placeholder:text-plum/40 focus:outline-none text-[0.95rem]'

/**
 * Rental-only variant of PropertyFilters — reuses the same filter fields,
 * options data, and matchesFilters/countActiveFilters logic from the
 * Properties page, but drops the Buy/Rent toggle since this page is
 * dedicated to rentals (filters.purpose is always 'Rent').
 */
function RentalSearch({ filters, onChange, onClear, resultCount, activeCount }) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchId = useId()

  const update = (key) => (event) => onChange({ [key]: event.target.value })

  const isFieldActive = (key) => filters[key] !== rentalDefaults[key]
  const labelFor = (key, text) => (
    <span className={`${labelBase} ${isFieldActive(key) ? 'text-accent-dark' : 'text-plum/70'}`}>
      {text}
    </span>
  )

  const MoreFields = ({ idPrefix }) => (
    <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
      <label className={boxedFieldShell}>
        {labelFor('bathrooms', 'Bathrooms')}
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
        <span aria-hidden="true" className={fieldUnderline} />
      </label>

      <label className={boxedFieldShell}>
        {labelFor('minArea', 'Minimum Area')}
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
        <span aria-hidden="true" className={fieldUnderline} />
      </label>

      <label className={boxedFieldShell}>
        {labelFor('city', 'Location')}
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
        <span aria-hidden="true" className={fieldUnderline} />
      </label>
    </div>
  )

  return (
    <div
      id="rental-search"
      className="relative z-20 -mt-6 scroll-mt-28 px-4 sm:-mt-8 sm:px-8 lg:-mt-10 lg:px-12"
    >
      <Reveal
        distance={20}
        duration={0.6}
        amount={0.3}
        className="container-veyra !px-0 max-w-content mx-auto relative border border-stone bg-ivory shadow-[0_24px_60px_-34px_rgba(24,33,31,0.5)]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
        />

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-stone px-6 py-3.5 lg:px-7">
          <p className="flex items-center gap-2.5 text-[0.7rem] uppercase tracking-wide2 text-plum/70">
            <span className="block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Searching Rental Properties Only
          </p>
          {activeCount > 0 && (
            <p className="text-[0.7rem] uppercase tracking-wide2 text-accent-dark">
              {activeCount} Active Filter{activeCount === 1 ? '' : 's'}
            </p>
          )}
        </div>

        {/* Desktop / tablet filter bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden lg:block"
          aria-label="Rental filters"
        >
          <div className="flex items-stretch">
            <div className="flex-1 grid grid-cols-5 divide-x divide-stone border-r border-stone">
              <label className={`${fieldShell} px-5 py-4`} htmlFor={searchId}>
                {labelFor('search', 'Location')}
                <input
                  id={searchId}
                  type="text"
                  value={filters.search}
                  onChange={update('search')}
                  placeholder="City, neighborhood..."
                  className={inputClass}
                />
                <span aria-hidden="true" className={fieldUnderline} />
              </label>

              <label className={`${fieldShell} px-5 py-4`}>
                {labelFor('type', 'Type')}
                <select className={selectClass} value={filters.type} onChange={update('type')}>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className={fieldUnderline} />
              </label>

              <label className={`${fieldShell} px-5 py-4`}>
                {labelFor('price', 'Monthly Rent')}
                <select className={selectClass} value={filters.price} onChange={update('price')}>
                  {rentPriceRanges.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className={fieldUnderline} />
              </label>

              <label className={`${fieldShell} px-5 py-4`}>
                {labelFor('bedrooms', 'Bedrooms')}
                <select className={selectClass} value={filters.bedrooms} onChange={update('bedrooms')}>
                  {bedroomOptions.map((b) => (
                    <option key={b} value={b}>
                      {b === 'Any' ? 'Any Beds' : `${b} Bed${b === '1' ? '' : 's'}`}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className={fieldUnderline} />
              </label>

              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-controls="rental-more-filters-panel"
                className={`${fieldShell} items-center justify-center gap-2 px-4 py-4 text-sm text-plum/70 hover:text-plum focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent`}
              >
                <FiSliders size={15} aria-hidden="true" />
                More Filters
                <FiChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform duration-300 ease-editorial ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-ink px-8 text-sm tracking-wide text-ivory transition-colors duration-300 ease-editorial hover:bg-ink-secondary active:scale-[0.98] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-light"
            >
              <FiSearch size={16} aria-hidden="true" />
              Search
            </button>
          </div>

          <AnimatePresence initial={false}>
            {moreOpen && (
              <motion.div
                id="rental-more-filters-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeEditorial }}
                className="overflow-hidden border-t border-stone bg-parchment/40"
              >
                <div className="px-6 py-5">
                  <MoreFields idPrefix="rent-desktop" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Mobile filter trigger */}
        <div className="p-4 sm:p-5 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex w-full items-center justify-between gap-3 border border-stone bg-parchment px-5 py-4 text-left transition-colors duration-200 ease-editorial hover:border-plum/25 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex min-w-0 items-center gap-2.5 text-sm text-plum/80">
              <FiSearch size={16} aria-hidden="true" className="shrink-0 text-plum/60" />
              <span className="truncate">{filters.search ? filters.search : 'Search Rentals'}</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-wide2 text-accent-dark">
              <FiSliders size={14} aria-hidden="true" />
              Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </span>
          </button>
        </div>
      </Reveal>

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
              className="absolute inset-0 bg-ink/75"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filter rentals"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: easeEditorial }}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-xl border-t border-stone bg-ivory px-5 pb-8 pt-5 shadow-[0_-20px_50px_-20px_rgba(24,33,31,0.55)]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-stone pb-4">
                <h2 className="font-display text-xl text-plum">Filter Rentals</h2>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close filters"
                  className="-mr-2 flex h-10 w-10 items-center justify-center text-plum/60 transition-all duration-200 ease-editorial hover:bg-plum/5 hover:text-plum active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus-visible:border-stone"
                >
                  <FiX size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col gap-4 pt-5">
                <label className={boxedFieldShell}>
                  {labelFor('search', 'Location')}
                  <input
                    type="text"
                    value={filters.search}
                    onChange={update('search')}
                    placeholder="City, neighborhood..."
                    className={inputClass}
                  />
                  <span aria-hidden="true" className={fieldUnderline} />
                </label>

                <label className={boxedFieldShell}>
                  {labelFor('type', 'Type')}
                  <select className={selectClass} value={filters.type} onChange={update('type')}>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span aria-hidden="true" className={fieldUnderline} />
                </label>

                {/* Single column on the narrowest phones: two cramped selects
                    side by side is exactly what this page should not feel like. */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <label className={boxedFieldShell}>
                    {labelFor('price', 'Monthly Rent')}
                    <select className={selectClass} value={filters.price} onChange={update('price')}>
                      {rentPriceRanges.map((p) => (
                        <option key={p.label} value={p.label}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                    <span aria-hidden="true" className={fieldUnderline} />
                  </label>

                  <label className={boxedFieldShell}>
                    {labelFor('bedrooms', 'Bedrooms')}
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
                    <span aria-hidden="true" className={fieldUnderline} />
                  </label>
                </div>

                <details className="group border border-stone px-4 py-3 open:bg-parchment/40 open:pb-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-plum/80 transition-colors duration-200 group-open:text-plum">
                    More Filters
                    <FiChevronDown
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-editorial group-open:rotate-180"
                    />
                  </summary>
                  <div className="pt-4">
                    <MoreFields idPrefix="rent-mobile" />
                  </div>
                </details>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="flex-1 border border-plum/25 py-3.5 text-sm text-plum/80 transition-all duration-300 ease-editorial hover:border-plum hover:text-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex-[2] bg-ink py-3.5 text-sm font-medium tracking-wide text-ivory transition-all duration-300 ease-editorial hover:bg-ink-secondary active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Show {resultCount} Rental{resultCount === 1 ? '' : 's'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result count + clear (desktop/tablet) */}
      <div className="container-veyra !px-0 max-w-content mx-auto mt-4 hidden items-center justify-between gap-4 px-1 lg:flex">
        <p className="text-sm text-plum/75">
          <span className="font-display text-base text-plum">{resultCount}</span>{' '}
          rental{resultCount === 1 ? '' : 's'} found
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="border border-stone px-4 py-2 text-sm text-plum/80 transition-all duration-300 ease-editorial hover:border-plum hover:text-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Result count (mobile) */}
      <div className="mt-4 flex items-center justify-between gap-4 px-1 lg:hidden">
        <p className="text-sm text-plum/75">
          <span className="font-display text-base text-plum">{resultCount}</span>{' '}
          rental{resultCount === 1 ? '' : 's'} found
        </p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="border border-stone px-3.5 py-2 text-sm text-plum/80 transition-all duration-300 ease-editorial hover:border-plum hover:text-plum active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default RentalSearch
