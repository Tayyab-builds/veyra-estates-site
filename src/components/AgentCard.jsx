import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal } from './motion/Reveal.jsx'

function AgentCard({ agent, index = 0 }) {
  return (
    <Reveal
      as="article"
      delay={Math.min(index * 0.08, 0.32)}
      duration={0.6}
      amount={0.3}
      className="group"
    >
      <div className="overflow-hidden aspect-[3/4]">
        <img
          src={agent.image}
          alt={`Portrait of ${agent.name}, ${agent.role}`}
          className="w-full h-full object-cover grayscale-[15%] transition-all duration-[900ms] ease-editorial group-hover:grayscale-0 group-hover:scale-[1.035]"
          loading="lazy"
        />
      </div>
      <div className="pt-5 border-t border-stone mt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-plum transition-colors duration-300 group-hover:text-olive-dark">
            {agent.name}
          </h3>
          <FiArrowUpRight
            size={17}
            className="mt-1.5 shrink-0 text-plum/30 transition-all duration-300 ease-editorial group-hover:text-olive motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </div>
        <p className="text-sm text-plum/60 mt-1">{agent.role}</p>
        <p className="text-sm text-plum/40 mt-0.5">{agent.region}</p>
      </div>
    </Reveal>
  )
}

export default AgentCard
