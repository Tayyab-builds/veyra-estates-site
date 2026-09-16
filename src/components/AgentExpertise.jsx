import { FiCompass, FiKey, FiHome, FiUserCheck, FiTrendingUp, FiLayers } from 'react-icons/fi'
import { agents } from '../data/agents.js'
import { getAgentStats } from '../lib/agentStats.js'
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal.jsx'

const expertise = [
  {
    icon: FiCompass,
    title: 'Local Market Knowledge',
    text: 'Deep familiarity with the neighborhoods, buildings, and price movements in each market we serve.',
  },
  {
    icon: FiKey,
    title: 'Private Sales',
    text: 'Discreet, off-market introductions for clients who value privacy as much as the property itself.',
  },
  {
    icon: FiHome,
    title: 'Luxury Residential',
    text: 'Specialist experience across penthouses, waterfront estates, and architecturally distinctive homes.',
  },
  {
    icon: FiUserCheck,
    title: 'Buyer Representation',
    text: 'Independent guidance for buyers, from a first viewing through to close.',
  },
  {
    icon: FiTrendingUp,
    title: 'Seller Representation',
    text: 'Considered positioning and presentation to reach the right buyer, not just any buyer.',
  },
  {
    icon: FiLayers,
    title: 'Curated Property Selection',
    text: 'A hand-picked portfolio, kept deliberately small rather than run as a high-volume listings feed.',
  },
]

function AgentExpertise() {
  const stats = getAgentStats(agents)
  const marketsCopy = stats.markets.length > 1
    ? `${stats.markets.slice(0, -1).join(', ')} and ${stats.markets[stats.markets.length - 1]}`
    : stats.markets[0]

  return (
    <section aria-labelledby="expertise-heading" className="py-20 lg:py-28 bg-ivory">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2
              id="expertise-heading"
              className="font-display font-normal text-3xl sm:text-4xl leading-[1.14] text-plum"
            >
              What our agents bring to a sale.
            </h2>
            <p className="mt-5 text-plum/65 text-[1.05rem] leading-relaxed max-w-sm">
              Every advisor at Veyra covers the same ground: patient
              representation, private access, and a genuine read on the
              market they work in.
            </p>
            {marketsCopy && (
              <p className="mt-6 text-sm text-plum/45 max-w-sm">
                Currently representing clients across {marketsCopy}.
              </p>
            )}
          </Reveal>

          <div className="lg:col-span-8">
            <RevealGroup as="div" className="border-t border-stone" stagger={0.06} amount={0.3}>
              {expertise.map((item) => (
                <RevealItem
                  key={item.title}
                  as="div"
                  className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-stone py-7 sm:grid-cols-[auto_minmax(0,10rem)_1fr] sm:gap-x-8"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone text-aubergine">
                    <item.icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg text-plum sm:pt-1.5">{item.title}</h3>
                  <p className="col-span-2 text-sm leading-relaxed text-plum/60 sm:col-span-1 sm:pt-1.5">
                    {item.text}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentExpertise
