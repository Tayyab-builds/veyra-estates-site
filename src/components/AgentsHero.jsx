import { motion, useReducedMotion } from 'framer-motion'
import { agents } from '../data/agents.js'
import { getAgentStats } from '../lib/agentStats.js'
import { useSiteContent } from '../data/siteContentStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

function AgentsHero() {
  const content = useSiteContent('agents')
  const stats = getAgentStats(agents)
  const primary = agents[0]
  const secondary = agents[agents.length - 1]
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      aria-label="Introduction to the Veyra team"
      className="relative overflow-hidden bg-ivory pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pb-28"
    >
      <div className="container-veyra">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: easeEditorial }}
            className="lg:col-span-6"
          >
            <p className="eyebrow">Our People</p>
            <h1 className="mt-4 max-w-lg font-display text-[2.35rem] font-normal leading-[1.14] text-plum sm:text-5xl lg:text-[3.1rem]">
              {content.heading}
            </h1>
            <p className="mt-6 max-w-md text-plum/65 text-base leading-relaxed sm:text-lg">
              {content.description}
            </p>

            <div className="mt-10 flex gap-10 border-t border-stone pt-6 sm:gap-14">
              <div>
                <p className="font-display text-3xl text-plum">{stats.count}</p>
                <p className="mt-1 text-sm text-plum/50">Advisors</p>
              </div>
              <div>
                <p className="font-display text-3xl text-plum">{stats.markets.length}</p>
                <p className="mt-1 text-sm text-plum/50">Markets represented</p>
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-3xl text-plum">2011</p>
                <p className="mt-1 text-sm text-plum/50">Advising since</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, ease: easeEditorial }}
            className="relative lg:col-span-6"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 hidden border border-aubergine/25 sm:block"
              />
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={primary.image}
                  alt={`Portrait of ${primary.name}, ${primary.role}`}
                  className="h-full w-full object-cover grayscale-[10%]"
                  loading="eager"
                />
              </div>

              <div
                className="absolute -bottom-10 -left-6 hidden w-[42%] overflow-hidden border-4 border-ivory shadow-[0_20px_45px_-20px_rgba(40,37,34,0.45)] sm:block aspect-[3/4]"
                aria-hidden={false}
              >
                <img
                  src={secondary.image}
                  alt={`Portrait of ${secondary.name}, ${secondary.role}`}
                  className="h-full w-full object-cover grayscale-[10%]"
                  loading="lazy"
                />
              </div>

              <div className="absolute right-3 top-3 bg-ivory/95 px-4 py-3 text-right sm:right-5 sm:top-5">
                <p className="font-display text-sm text-plum">{stats.marketsLabel}</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-plum/50">
                  Worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AgentsHero
