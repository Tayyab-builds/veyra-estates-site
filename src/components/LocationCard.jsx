import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from './motion/Reveal.jsx'

/**
 * Image-led collection card. The reveal is layered rather than
 * simultaneous — the photograph settles in first (a 1.02 → 1 scale), then
 * the label lifts into place, then the arrow — so a group of cards reads as
 * a considered sequence instead of one block of motion. Hover transforms sit
 * on inner elements because framer-motion owns the wrapper's transform.
 */
function LocationCard({ location, className = '', onSelect, active = false, revealDelay = 0 }) {
  const isInteractive = typeof onSelect === 'function'

  const interactiveProps = isInteractive
    ? {
        type: 'button',
        onClick: () => onSelect(location.id),
        'aria-pressed': active,
      }
    : { href: '#properties' }

  return (
    <Reveal
      as={isInteractive ? 'button' : 'a'}
      variant="scale"
      scaleFrom={1.02}
      direction="none"
      duration={0.7}
      delay={revealDelay}
      amount={0.25}
      className={`group relative block w-full overflow-hidden text-left shadow-[inset_0_0_0_1px_rgba(245,241,232,0)] transition-[box-shadow] duration-300 ease-editorial hover:shadow-[inset_0_0_0_1px_rgba(245,241,232,0.22)] ${
        active ? 'ring-2 ring-olive ring-offset-2 ring-offset-ivory' : ''
      } ${className}`}
      {...interactiveProps}
    >
      <img
        src={location.image}
        alt={`Skyline and architecture representative of ${location.name}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-editorial will-change-transform motion-safe:group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-plum/10 to-transparent transition-opacity duration-500 ease-editorial group-hover:from-plum/80" />
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6 sm:p-7">
        <Reveal distance={12} duration={0.5} delay={revealDelay + 0.12} amount={0.4}>
          <div className="transition-transform duration-500 ease-editorial motion-safe:group-hover:-translate-y-0.5">
            <h3 className="font-display text-2xl sm:text-3xl text-ivory">{location.name}</h3>
            <p className="text-ivory/80 text-sm mt-1">{location.count}</p>
          </div>
        </Reveal>
        <Reveal distance={12} duration={0.5} delay={revealDelay + 0.2} amount={0.4}>
          <span className="block mb-1 shrink-0">
            <FiArrowUpRight
              size={20}
              className="text-ivory/70 transition-all duration-300 ease-editorial motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 group-hover:text-ivory"
            />
          </span>
        </Reveal>
      </div>
    </Reveal>
  )
}

export default LocationCard
