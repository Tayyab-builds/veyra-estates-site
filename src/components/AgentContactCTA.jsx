import { FiMail, FiPhone } from 'react-icons/fi'
import InquiryForm from './InquiryForm.jsx'
import { agents } from '../data/agents.js'
import { Reveal, RevealGroup, RevealItem, DURATION } from './motion/Reveal.jsx'

function AgentContactCTA() {
  return (
    <section id="contact-agent" className="bg-plum py-24 lg:py-32">
      <div className="container-veyra">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal
              as="h2"
              amount={0.5}
              duration={DURATION.editorial + 0.1}
              className="font-display text-4xl leading-[1.1] text-ivory sm:text-5xl"
            >
              Ready to talk to someone who knows the market?
            </Reveal>
            <Reveal
              as="p"
              amount={0.5}
              delay={0.08}
              duration={DURATION.editorial + 0.1}
              className="mt-4 max-w-md text-ivory/65"
            >
              Send a note below and we'll connect you with the right advisor, or
              reach out to someone directly using the details alongside.
            </Reveal>

            <Reveal amount={0.3} delay={0.14} duration={DURATION.editorial + 0.1} className="mt-9">
              <InquiryForm propertyName="your property search" />
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-ivory/10 lg:pl-10">
            <Reveal
              as="p"
              amount={0.5}
              duration={DURATION.standard + 0.1}
              className="text-[0.7rem] uppercase tracking-[0.14em] text-ivory/45"
            >
              Prefer to Reach Out Directly?
            </Reveal>

            <RevealGroup
              as="div"
              className="mt-6 flex flex-col divide-y divide-ivory/10 border-t border-b border-ivory/10"
              stagger={0.06}
              amount={0.3}
            >
              {agents.map((agent) => (
                <RevealItem key={agent.id} as="div" className="py-5">
                  <p className="font-display text-lg text-ivory">{agent.name}</p>
                  <p className="mt-0.5 text-sm text-ivory/50">
                    {agent.role} — {agent.region}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors duration-300 hover:text-ivory"
                    >
                      <FiMail size={13} aria-hidden="true" />
                      Email
                    </a>
                    <a
                      href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 text-sm text-ivory/75 transition-colors duration-300 hover:text-ivory"
                    >
                      <FiPhone size={13} aria-hidden="true" />
                      Call
                    </a>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentContactCTA
