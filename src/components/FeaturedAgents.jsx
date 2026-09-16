import SectionHeading from './SectionHeading.jsx'
import AgentCard from './AgentCard.jsx'
import { agents } from '../data/agents.js'

function FeaturedAgents() {
  return (
    <div className="pt-20 pb-16 lg:pt-28 lg:pb-20">
      <div className="container-veyra">
        <SectionHeading
          title="People Behind the Properties"
          description="A small team, each with deep roots in the markets they represent."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedAgents
