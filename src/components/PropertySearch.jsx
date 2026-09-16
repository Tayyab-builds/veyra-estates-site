import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Reveal } from './motion/Reveal.jsx'

const propertyTypes = ['Property Type', 'House', 'Penthouse', 'Villa', 'Townhouse', 'Loft']
const priceRanges = ['Price Range', 'Up to $1M', '$1M – $3M', '$3M – $6M', '$6M+']

function PropertySearch() {
  const [mode, setMode] = useState('buy')

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 lg:-mt-10 px-4 sm:px-8 lg:px-12">
      <Reveal
        delay={0.2}
        duration={0.7}
        amount={0.3}
        className="container-veyra !px-0 max-w-content mx-auto bg-ivory border border-stone shadow-[0_18px_50px_-24px_rgba(52,43,50,0.35)]"
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col lg:flex-row lg:items-stretch"
        >
          <div className="flex border-b lg:border-b-0 lg:border-r border-stone">
            {['buy', 'rent'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                aria-pressed={mode === option}
                className={`relative flex-1 lg:flex-none lg:w-28 px-6 py-5 text-sm tracking-wide capitalize transition-colors duration-300 ease-editorial ${
                  mode === option ? 'bg-olive text-ivory' : 'text-plum/60 hover:text-plum hover:bg-parchment/60'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex-1 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-stone border-b lg:border-b-0 lg:border-r border-stone">
            <label className="group relative flex flex-col justify-center px-6 py-4 transition-colors duration-300 ease-editorial focus-within:bg-parchment/50">
              <span className="text-[0.7rem] uppercase tracking-wide2 text-plum/45 mb-1 transition-colors duration-300 group-focus-within:text-olive-dark">
                Location
              </span>
              <input
                type="text"
                placeholder="City, neighborhood..."
                className="bg-transparent text-plum placeholder:text-plum/35 focus:outline-none text-[0.95rem]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-olive transition-transform duration-300 ease-editorial group-focus-within:scale-x-100" />
            </label>

            <label className="group relative flex flex-col justify-center px-6 py-4 transition-colors duration-300 ease-editorial focus-within:bg-parchment/50">
              <span className="text-[0.7rem] uppercase tracking-wide2 text-plum/45 mb-1 transition-colors duration-300 group-focus-within:text-olive-dark">
                Type
              </span>
              <select className="bg-transparent text-plum focus:outline-none text-[0.95rem] -ml-0.5">
                {propertyTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-olive transition-transform duration-300 ease-editorial group-focus-within:scale-x-100" />
            </label>

            <label className="group relative flex flex-col justify-center px-6 py-4 transition-colors duration-300 ease-editorial focus-within:bg-parchment/50">
              <span className="text-[0.7rem] uppercase tracking-wide2 text-plum/45 mb-1 transition-colors duration-300 group-focus-within:text-olive-dark">
                Price
              </span>
              <select className="bg-transparent text-plum focus:outline-none text-[0.95rem] -ml-0.5">
                {priceRanges.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-olive transition-transform duration-300 ease-editorial group-focus-within:scale-x-100" />
            </label>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-5 lg:py-0 bg-plum text-ivory text-sm tracking-wide transition-all duration-300 ease-editorial hover:bg-plum/90 active:scale-[0.98]"
          >
            <FiSearch size={16} />
            Search
          </button>
        </form>
      </Reveal>
    </div>
  )
}

export default PropertySearch
