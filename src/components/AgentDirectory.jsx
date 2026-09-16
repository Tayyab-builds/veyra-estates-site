import SectionHeading from './SectionHeading.jsx'
import AgentProfileCard from './AgentProfileCard.jsx'
import { RevealGroup } from './motion/Reveal.jsx'
import { agents } from '../data/agents.js'

function AgentDirectory() {
  return (
    <section id="agent-directory" aria-label="Meet our agents" className="py-20 lg:py-28">
      <div className="container-veyra">
        <SectionHeading
          title="Meet Our Agents"
          description="Every Veyra advisor works a single market in depth, rather than many markets at a distance."
        />

        <RevealGroup
          className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          amount={0.15}
        >
          {agents.map((agent) => (
            <AgentProfileCard key={agent.id} agent={agent} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default AgentDirectory
