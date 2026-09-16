import { motion, useReducedMotion } from 'framer-motion'

/**
 * Shared motion language for the Veyra design system.
 *
 * Mirrors the timing tokens defined in `src/index.css`
 * (`--duration-fast/standard/editorial/stagger`, `--ease-editorial`).
 * framer-motion animates via the Web Animations API / JS, not CSS, so
 * it can't read CSS custom properties directly — these constants keep
 * the two systems in sync by hand instead.
 */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1]

export const DURATION = {
  fast: 0.18,
  standard: 0.3,
  editorial: 0.6,
}

export const STAGGER = 0.08

const DIRECTION_OFFSET = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Reveal — fade/translate (and optionally scale) an element in as it
 * enters the viewport. This is the single entrance pattern shared by
 * section headings, editorial images, and card grids so scroll motion
 * reads as one consistent system rather than a different animation
 * per component.
 *
 * Usage:
 *   <Reveal><SectionHeading .../></Reveal>
 *   <Reveal as="img" variant="scale" src={...} />
 *   <Reveal direction="left" delay={0.1}>...</Reveal>
 *
 * For staggered groups (e.g. a grid of cards), wrap the grid in
 * <RevealGroup> and each child in <RevealItem> — the stagger is
 * driven by the parent, so children don't need individual delays.
 */
export function Reveal({
  as = 'div',
  children,
  variant = 'fade-up',
  direction = 'up',
  duration = DURATION.editorial,
  delay = 0,
  amount = 0.3,
  once = true,
  scaleFrom: scaleFromProp,
  distance,
  className = '',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()
  const Comp = motion[as] || motion.div
  const baseOffset = DIRECTION_OFFSET[direction] ?? DIRECTION_OFFSET.up
  // `distance` lets a caller scale the travel down for smaller elements
  // (labels inside a card, for example) without needing a new direction.
  const offset =
    distance == null
      ? baseOffset
      : { x: Math.sign(baseOffset.x) * distance, y: Math.sign(baseOffset.y) * distance }
  // `variant="scale"` settles gently in from 0.97 by default; pass
  // `scaleFrom={1.02}` for the editorial image reveal that starts a
  // touch large instead and eases back to 1.
  const scaleFrom = variant === 'scale' ? (scaleFromProp ?? 0.97) : 1

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y, scale: scaleFrom }

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1 }

  return (
    <Comp
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{
        duration: prefersReducedMotion ? DURATION.fast : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE_EDITORIAL,
      }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

/**
 * RevealGroup — wraps a grid/list of items and staggers their
 * entrance via framer-motion variants propagation. Pair with
 * <RevealItem> children.
 */
export function RevealGroup({
  as = 'div',
  children,
  stagger = STAGGER,
  delay = 0,
  amount = 0.2,
  once = true,
  className = '',
  ...props
}) {
  const Comp = motion[as] || motion.div

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        // `delay` (delayChildren) holds the whole staggered sequence back a
        // beat — used when a sibling element, e.g. a hero photograph,
        // should settle first.
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({
  as = 'div',
  children,
  direction = 'up',
  variant = 'fade-up',
  duration = DURATION.standard,
  className = '',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()
  const Comp = motion[as] || motion.div
  const offset = DIRECTION_OFFSET[direction] ?? DIRECTION_OFFSET.up
  const scaleFrom = variant === 'scale' ? 0.97 : 1

  const hidden = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y, scale: scaleFrom }

  const visible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1 }

  return (
    <Comp
      variants={{ hidden, visible }}
      transition={{ duration: prefersReducedMotion ? DURATION.fast : duration, ease: EASE_EDITORIAL }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default Reveal
