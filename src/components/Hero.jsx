import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Button from './Button.jsx'
import { Link } from '../router.jsx'
import { heroSlides } from '../data/heroSlides.js'

const SLIDE_DURATION = 6200 // ms — within the 5–7s range
const TICK = 100
const easeEditorial = [0.22, 1, 0.36, 1]

function pad(n) {
  return String(n).padStart(2, '0')
}

function Hero() {
  const [index, setIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = heroSlides.length
  const slide = heroSlides[index]
  const prefersReducedMotion = useReducedMotion()
  const hoverCapable = useRef(false)
  const sectionRef = useRef(null)

  // Extremely subtle scroll response: the photograph drifts a few
  // pixels slower than the page (a hint of parallax, not a spectacle)
  // and the content eases back and fades slightly as the hero leaves
  // view. Kept extremely small and GPU-cheap (transform/opacity only).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 40])
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 24])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, prefersReducedMotion ? 1 : 0.4])

  useEffect(() => {
    hoverCapable.current =
      typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => {
      setElapsed((prev) => {
        if (prev + TICK >= SLIDE_DURATION) {
          setIndex((i) => (i + 1) % total)
          return 0
        }
        return prev + TICK
      })
    }, TICK)
    return () => clearInterval(id)
  }, [paused, index, total])

  const goTo = (nextIndex) => {
    setIndex((nextIndex + total) % total)
    setElapsed(0)
  }
  const goNext = () => goTo(index + 1)
  const goPrev = () => goTo(index - 1)

  const progressPct = Math.min(100, (elapsed / SLIDE_DURATION) * 100)

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Featured estates"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink sm:min-h-[620px] lg:min-h-[760px]"
      onMouseEnter={() => hoverCapable.current && setPaused(true)}
      onMouseLeave={() => hoverCapable.current && setPaused(false)}
    >
      {/* Photography layer */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 1.1, ease: easeEditorial }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
              style={{ objectPosition: slide.focal }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient — strongest behind the text, fading into the photograph */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end pb-14 pt-28 sm:pb-16 lg:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-veyra w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
            >
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/65 sm:text-xs">
                {slide.category}
              </p>

              <h1 className="mt-4 max-w-xl font-display text-[2.35rem] font-normal leading-[1.12] text-ivory sm:text-5xl lg:max-w-2xl lg:text-[3.4rem]">
                {slide.headlineLines.map((line, i) => (
                  <span key={line} className="block">
                    {line}
                    {i === 0 && <br className="hidden sm:block" />}
                  </span>
                ))}
              </h1>

              <div className="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-ivory/15 pt-5 sm:mt-9">
                <div>
                  <p className="font-display text-lg text-ivory sm:text-xl">{slide.property}</p>
                  <p className="mt-1 text-sm text-ivory/60">{slide.location}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button as={Link} to="/properties" variant="primary" className="!px-6 !py-3 text-[0.82rem]">
                    Explore Properties
                  </Button>
                  <Button as="a" href="#introduction" variant="light" className="!px-6 !py-3 text-[0.82rem]">
                    Discover Veyra
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicator */}
          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            <span className="font-body text-xs tracking-wide text-ivory/55">
              {pad(index + 1)} / {pad(total)}
            </span>
            <div className="relative h-px w-full max-w-[140px] overflow-hidden bg-ivory/20">
              <div
                className="h-full bg-ivory transition-[width] duration-150 ease-linear"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Manual controls */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous property"
        className="group absolute left-3 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-ink/25 text-ivory/80 backdrop-blur-sm transition-all duration-300 hover:border-ivory/50 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory sm:left-5 sm:h-10 sm:w-10 lg:left-8"
      >
        <FiChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next property"
        className="group absolute right-3 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-ink/25 text-ivory/80 backdrop-blur-sm transition-all duration-300 hover:border-ivory/50 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory sm:right-5 sm:h-10 sm:w-10 lg:right-8"
      >
        <FiChevronRight size={18} />
      </button>
    </section>
  )
}

export default Hero
