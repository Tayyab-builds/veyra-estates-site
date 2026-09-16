import { useState } from 'react'
import { FiMail, FiPhone, FiChevronDown } from 'react-icons/fi'
import { RevealItem, DURATION } from './motion/Reveal.jsx'

function AgentProfileCard({ agent }) {
  const [expanded, setExpanded] = useState(false)
  const bioId = `agent-bio-${agent.id}`
  const firstName = agent.name.split(' ')[0]

  return (
    <RevealItem as="article" duration={DURATION.editorial} className="group flex h-full flex-col">
      <div className="overflow-hidden aspect-[3/4]">
        <img
          src={agent.image}
          alt={`Portrait of ${agent.name}, ${agent.role}`}
          className="h-full w-full object-cover grayscale-[15%] transition-all duration-[1000ms] ease-editorial group-hover:grayscale-0 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col border-t border-stone pt-5 mt-5">
        <h3 className="font-display text-xl text-plum">{agent.name}</h3>
        <p className="mt-1 text-sm text-plum/60">{agent.role}</p>
        <p className="mt-0.5 text-sm text-plum/40">{agent.region}</p>

        <p
          id={bioId}
          className={`mt-4 text-sm leading-relaxed text-plum/65 ${
            expanded ? '' : 'line-clamp-3'
          }`}
        >
          {agent.bio}
        </p>

        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={bioId}
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex w-fit items-center gap-1.5 text-[0.8rem] font-medium tracking-wide text-aubergine transition-colors duration-300 hover:text-plum"
        >
          {expanded ? 'Show less' : `More about ${firstName}`}
          <FiChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <div className="mt-auto flex flex-col gap-2 border-t border-stone pt-4 mt-5">
          <a
            href={`mailto:${agent.email}`}
            className="inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum"
          >
            <FiMail size={14} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{agent.email}</span>
          </a>
          <a
            href={`tel:${agent.phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum"
          >
            <FiPhone size={14} className="shrink-0" aria-hidden="true" />
            {agent.phone}
          </a>
        </div>
      </div>
    </RevealItem>
  )
}

export default AgentProfileCard
