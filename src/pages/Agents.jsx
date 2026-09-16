import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import AgentsHero from '../components/AgentsHero.jsx'
import AgentDirectory from '../components/AgentDirectory.jsx'
import AgentExpertise from '../components/AgentExpertise.jsx'
import AgentStories from '../components/AgentStories.jsx'
import WhyVeyraAgents from '../components/WhyVeyraAgents.jsx'
import AgentContactCTA from '../components/AgentContactCTA.jsx'

function Agents() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Agents hero */}
        <AgentsHero />

        {/* 2. Meet our agents */}
        <AgentDirectory />

        {/* 3. Featured expertise */}
        <AgentExpertise />

        {/* 4. Agent stories / profiles */}
        <AgentStories />

        {/* 5. Why work with Veyra agents */}
        <WhyVeyraAgents />

        {/* 6. Contact an agent CTA */}
        <AgentContactCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Agents
