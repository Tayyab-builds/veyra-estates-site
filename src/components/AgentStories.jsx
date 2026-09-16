import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi'
import { agents } from '../data/agents.js'

const easeEditorial = [0.22, 1, 0.36, 1]

// Short, hand-written framing drawn directly from each agent's existing
// bio/role/region in agents.js — not new facts, just an editorial lens.
const focusLine = {
  'olivia-bennett': 'Waterfront and pre-war residences across Manhattan and South Florida.',
  'james-laurent': 'Period London property, from townhouses to converted penthouses.',
  'sofia-rahman': "Off-market opportunities across Dubai's most established addresses.",
}

const contactAbout = {
  'olivia-bennett': 'Buying or selling in Manhattan or South Florida, particularly waterfront and pre-war homes.',
  'james-laurent': 'Buying or selling period property in London.',
  'sofia-rahman': 'International purchases in Dubai, including off-market opportunities.',
}

function AgentStories() {
  const [activeId, setActiveId] = useState(agents[0].id)
  const active = agents.find((agent) => agent.id === activeId) ?? agents[0]
  const prefersReducedMotion = useReducedMotion()

  return (
    <section aria-labelledby="agent-stories-heading" className="py-20 lg:py-28">
      <div className="container-veyra">
        <h2
          id="agent-stories-heading"
          className="max-w-lg font-display text-3xl sm:text-4xl leading-[1.14] text-plum"
        >
          Get to know the people you'd actually work with.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Featured profile */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.15 : 0.5, ease: easeEditorial }}
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={active.image}
                    alt={`Portrait of ${active.name}, ${active.role}`}
                    className="h-full w-full object-cover grayscale-[10%]"
                    loading="lazy"
                  />
                </div>

                <div className="mt-7 border-t border-stone pt-7">
                  <p className="text-[0.7rem] tracking-[0.28em] uppercase text-plum/45">
                    {active.region}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-plum sm:text-4xl">{active.name}</h3>
                  <p className="mt-1 text-sm text-plum/55">{active.role}</p>

                  {focusLine[active.id] && (
                    <p className="mt-6 border-l-2 border-aubergine/40 pl-4 text-plum/70 italic leading-relaxed">
                      {focusLine[active.id]}
                    </p>
                  )}

                  <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-plum/65">
                    {active.bio}
                  </p>

                  {contactAbout[active.id] && (
                    <p className="mt-6 text-sm text-plum/55">
                      <span className="text-plum/75">Contact {active.name.split(' ')[0]} about:</span>{' '}
                      {contactAbout[active.id]}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-stone pt-6">
                    <a
                      href={`mailto:${active.email}`}
                      className="inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum"
                    >
                      <FiMail size={14} aria-hidden="true" />
                      {active.email}
                    </a>
                    <a
                      href={`tel:${active.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum"
                    >
                      <FiPhone size={14} aria-hidden="true" />
                      {active.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Secondary list — switches the featured profile */}
          <div className="lg:col-span-5 lg:border-l lg:border-stone lg:pl-10">
            <p className="eyebrow">The Full Team</p>
            <div className="mt-5 flex flex-col divide-y divide-stone border-t border-b border-stone">
              {agents.map((agent) => {
                const isActive = agent.id === active.id
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setActiveId(agent.id)}
                    aria-pressed={isActive}
                    className={`group flex items-center gap-4 py-4 text-left transition-colors duration-300 ${
                      isActive ? 'text-plum' : 'text-plum/55 hover:text-plum'
                    }`}
                  >
                    <span className="h-14 w-12 shrink-0 overflow-hidden">
                      <img
                        src={agent.image}
                        alt=""
                        aria-hidden="true"
                        className={`h-full w-full object-cover transition-all duration-500 ${
                          isActive ? 'grayscale-0' : 'grayscale'
                        }`}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-lg">{agent.name}</span>
                      <span className="block truncate text-sm opacity-70">
                        {agent.role} — {agent.region}
                      </span>
                    </span>
                    <FiArrowRight
                      size={16}
                      aria-hidden="true"
                      className={`shrink-0 transition-all duration-300 ${
                        isActive ? 'translate-x-0.5 opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentStories
