import { useState } from 'react'
import { FiMail, FiPhone, FiArrowUpRight, FiArrowRight, FiCheck, FiMapPin } from 'react-icons/fi'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ContactForm from '../components/ContactForm.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal.jsx'
import { locations } from '../data/locations.js'
import { agents } from '../data/agents.js'
import { Link } from '../router.jsx'
import { useSiteContent } from '../data/siteContentStore.js'

/* ------------------------------------------------------------------ */
/* 1. Contact Hero                                                     */
/* ------------------------------------------------------------------ */

function ContactHero() {
  const content = useSiteContent('contact')

  return (
    <section
      aria-label="Get in touch with Veyra"
      className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#f5f1e8_1px,transparent_1px),linear-gradient(to_bottom,#f5f1e8_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="container-veyra relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          {/* Visual reveals first and quietly; the text stack staggers in
              just after so the page reads calm rather than busy. */}
          <Reveal
            as="div"
            variant="scale"
            duration={0.9}
            amount={0.5}
            className="relative order-2 lg:order-1 lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 hidden border border-terracotta/30 sm:block"
              />
              <div className="group relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop"
                  alt="A quiet, softly lit reception space with natural materials, representative of a Veyra office"
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
              <div className="absolute left-3 top-3 bg-ivory/95 px-4 py-3 sm:left-5 sm:top-5">
                <p className="font-display text-sm text-plum">By appointment</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-plum/50">
                  Discreet &amp; Unhurried
                </p>
              </div>
            </div>
          </Reveal>

          <RevealGroup
            as="div"
            stagger={0.12}
            amount={0.5}
            className="order-1 lg:order-2 lg:col-span-7"
          >
            <RevealItem as="p" duration={0.5} className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/50 sm:text-xs">
              Get In Touch
            </RevealItem>
            <RevealItem
              as="h1"
              className="mt-5 max-w-2xl font-display text-[2.5rem] font-normal leading-[1.08] text-ivory sm:text-6xl lg:text-[4rem]"
            >
              {content.heroHeading}
            </RevealItem>
            <RevealItem as="p" className="mt-7 max-w-md text-ivory/65 text-base leading-relaxed sm:text-lg">
              {content.heroDescription}
            </RevealItem>

            <RevealItem
              as="div"
              className="mt-12 flex flex-col gap-4 border-t border-ivory/15 pt-6 sm:flex-row sm:gap-10"
            >
              <a
                href="mailto:hello@veyraestates.com"
                className="group inline-flex items-center gap-2.5 text-ivory/80 transition-colors duration-300 hover:text-ivory"
              >
                <FiMail size={16} aria-hidden="true" className="text-terracotta-light" />
                <span className="border-b border-transparent text-sm transition-colors duration-300 group-hover:border-ivory/40 sm:text-base">
                  hello@veyraestates.com
                </span>
              </a>
              <a
                href="tel:+442079460192"
                className="group inline-flex items-center gap-2.5 text-ivory/80 transition-colors duration-300 hover:text-ivory"
              >
                <FiPhone size={16} aria-hidden="true" className="text-terracotta-light transition-colors duration-300 group-hover:text-terracotta" />
                <span className="text-sm sm:text-base">+44 20 7946 0192</span>
              </a>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Start a Conversation                                             */
/* ------------------------------------------------------------------ */

function StartAConversation({ presetInquiryType }) {
  return (
    <section
      id="start-a-conversation"
      aria-label="Send us a message"
      className="bg-plum py-20 lg:py-28"
    >
      <div className="container-veyra">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/45">
              Start a Conversation
            </p>
            <h2 className="mt-5 max-w-sm font-display text-4xl font-normal leading-[1.12] text-ivory sm:text-5xl">
              Tell us what you have in mind.
            </h2>
            <p className="mt-6 max-w-sm text-ivory/60 text-base leading-relaxed">
              A few details are all an advisor needs to begin — no account,
              no obligation. We typically respond within one business day.
            </p>

            <ul className="mt-10 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-sm text-ivory/55">
              <li>Every enquiry reaches a person, never a queue.</li>
              <li>Off-market and private enquiries are handled in confidence.</li>
              <li>No spam, no mailing lists — just a reply from an advisor.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm presetInquiryType={presetInquiryType} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Contact Options                                                  */
/* ------------------------------------------------------------------ */

const contactOptions = [
  {
    label: 'General Enquiries',
    text: 'Questions about Veyra, the firm, or where to start.',
    email: 'hello@veyraestates.com',
    phone: '+44 20 7946 0192',
  },
  {
    label: 'Property Enquiries',
    text: 'Ask about a specific residence, arrange a viewing, or request further detail.',
    email: 'hello@veyraestates.com',
    phone: '+44 20 7946 0192',
  },
]

function ContactOptions() {
  return (
    <section aria-label="Other ways to reach Veyra" className="bg-ivory py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Contact Options</p>
            <h2 className="mt-5 max-w-sm font-display text-4xl font-normal leading-[1.12] text-plum sm:text-5xl">
              Prefer to reach us directly?
            </h2>
            <p className="mt-6 max-w-sm text-plum/60 text-base leading-relaxed">
              Choose whichever route suits the conversation — a short
              email, a call, or a direct line to an advisor who already
              knows the market.
            </p>
          </Reveal>

          <RevealGroup as="div" stagger={0.1} amount={0.3} className="lg:col-span-8">
            <ul className="flex flex-col border-t border-stone">
              {contactOptions.map((option) => (
                <RevealItem
                  key={option.label}
                  as="li"
                  className="grid gap-3 border-b border-stone py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
                >
                  <div>
                    <h3 className="font-display text-xl text-plum sm:text-2xl">{option.label}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-plum/60">
                      {option.text}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:flex-col sm:items-end sm:gap-y-2.5">
                    <a
                      href={`mailto:${option.email}`}
                      className="group inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum active:scale-[0.98]"
                    >
                      <FiMail size={14} aria-hidden="true" className="text-terracotta" />
                      <span className="border-b border-transparent transition-colors duration-300 group-hover:border-plum/30">
                        {option.email}
                      </span>
                    </a>
                    <a
                      href={`tel:${option.phone.replace(/\s+/g, '')}`}
                      className="group inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum active:scale-[0.98]"
                    >
                      <FiPhone size={14} aria-hidden="true" className="text-terracotta transition-colors duration-300 group-hover:text-terracotta-dark" />
                      {option.phone}
                    </a>
                  </div>
                </RevealItem>
              ))}

              <RevealItem
                as="li"
                className="grid gap-3 border-b border-stone py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
              >
                <div>
                  <h3 className="font-display text-xl text-plum sm:text-2xl">Speak With an Advisor</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-plum/60">
                    Reach a specific advisor directly — each one covers a
                    market they know well.
                  </p>
                </div>
                <div className="sm:justify-self-end">
                  <Link
                    to="/agents"
                    className="group inline-flex items-center gap-2 text-sm text-plum/75 transition-colors duration-300 hover:text-plum active:scale-[0.98]"
                  >
                    Meet the Agents
                    <FiArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </RevealItem>
            </ul>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Visit Veyra                                                      */
/* ------------------------------------------------------------------ */

/** Matches a market name (e.g. "London") to the advisor who covers it. */
function agentForLocation(cityName) {
  return agents.find((agent) => agent.region.includes(cityName))
}

function VisitVeyra() {
  const londonAgent = agentForLocation('London')
  const headquarters = locations.find((location) => location.id === 'london')

  return (
    <section aria-label="Visit Veyra" className="py-20 lg:py-28">
      <div className="container-veyra">
        <SectionHeading
          title="Visit Veyra"
          description="One considered home base in London, and advisors on the ground across every market we represent."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal as="div" variant="scale" className="lg:col-span-6">
            <div className="group relative min-h-[420px] overflow-hidden">
              {headquarters?.image && (
                <div className="absolute inset-0">
                  <img
                    src={headquarters.image}
                    alt="Veyra's London headquarters neighbourhood"
                    className="h-full w-full scale-[1.02] object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/55 to-ink/10" />
                </div>
              )}

              <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 sm:p-10">
                <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/60">
                  Headquarters
                </p>
                <p className="mt-4 font-display text-5xl leading-[1.02] text-ivory sm:text-6xl">
                  London
                </p>
                <p className="mt-2 text-ivory/65">United Kingdom</p>

                <div className="mt-7 inline-flex w-fit items-center gap-2 border border-ivory/25 bg-ink/40 px-4 py-2 backdrop-blur-[2px]">
                  <FiMapPin size={14} aria-hidden="true" className="text-terracotta-light" />
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-ivory/70">
                    By appointment · discreet &amp; unhurried
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 border-t border-ivory/20 pt-6 text-sm">
                  <a
                    href="mailto:hello@veyraestates.com"
                    className="inline-flex w-fit items-center gap-2 text-ivory/80 transition-colors duration-300 hover:text-ivory"
                  >
                    <FiMail size={14} aria-hidden="true" className="text-terracotta-light" />
                    hello@veyraestates.com
                  </a>
                  <a
                    href="tel:+442079460192"
                    className="inline-flex w-fit items-center gap-2 text-ivory/80 transition-colors duration-300 hover:text-ivory"
                  >
                    <FiPhone size={14} aria-hidden="true" className="text-terracotta-light" />
                    +44 20 7946 0192
                  </a>
                </div>

                {londonAgent && (
                  <Link
                    to="/agents"
                    className="group mt-8 inline-flex w-fit items-center gap-2 text-sm text-ivory underline decoration-ivory/40 decoration-1 underline-offset-4 transition-colors duration-300 hover:decoration-ivory"
                  >
                    Meet {londonAgent.name}, our London advisor
                    <FiArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="text-terracotta-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="eyebrow">Where We Practice</p>
            <RevealGroup as="ul" stagger={0.07} amount={0.4} className="mt-5 flex flex-col border-t border-stone">
              {locations.map((location) => {
                const agent = agentForLocation(location.name)
                return (
                  <RevealItem
                    key={location.id}
                    as="li"
                    className="group flex items-baseline justify-between gap-4 border-b border-stone px-2 py-5 transition-colors duration-300 hover:bg-parchment/60"
                  >
                    <div>
                      <p className="font-display text-xl text-plum sm:text-2xl">{location.name}</p>
                      {agent && (
                        <p className="mt-1 text-xs text-plum/50">
                          {agent.name} · {agent.role}
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 text-sm text-plum/45">{location.count}</p>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. What Can We Help With                                            */
/* ------------------------------------------------------------------ */

const helpTopics = [
  {
    type: 'Buying',
    label: 'Find a Home',
    text: 'Start a search built around how you actually want to live.',
  },
  {
    type: 'Selling',
    label: 'Sell a Property',
    text: 'List a residence with an advisor who understands its value.',
  },
  {
    type: 'Renting',
    label: 'Rent a Residence',
    text: 'Explore considered rentals across our four markets.',
  },
  {
    type: 'Private / Off-Market',
    label: 'Private / Off-Market Opportunities',
    text: 'Discreet access to residences that are never publicly listed.',
  },
  {
    type: 'General Enquiry',
    label: 'General Enquiry',
    text: "Not sure where to start? We're glad to point you in the right direction.",
  },
]

function WhatCanWeHelpWith({ onSelectTopic, selectedTopic }) {
  return (
    <section aria-label="What can we help with" className="bg-ivory py-20 lg:py-28">
      <div className="container-veyra">
        <SectionHeading
          title="What Can We Help With"
          description="Choose whatever fits — it sets the Inquiry Type above and returns you straight to the form."
          align="center"
        />

        <RevealGroup
          as="ul"
          stagger={0.07}
          amount={0.3}
          className="mx-auto mt-14 flex max-w-3xl flex-col border-t border-plum/15"
        >
          {helpTopics.map((topic, i) => {
            const isSelected = selectedTopic === topic.type
            return (
              <RevealItem key={topic.type} as="li" className="border-b border-plum/15">
                <button
                  type="button"
                  onClick={() => onSelectTopic(topic.type)}
                  aria-pressed={isSelected}
                  className={`group flex w-full items-center gap-5 border-l-2 py-7 pl-4 pr-4 text-left transition-all duration-300 active:scale-[0.99] sm:gap-8 sm:py-8 sm:pl-6 ${
                    isSelected
                      ? 'border-l-accent bg-accent-soft/50'
                      : 'border-l-transparent hover:border-l-accent/40 hover:bg-parchment/60'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-base text-terracotta/70 sm:text-lg"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-3">
                      <span className="block font-display text-xl text-plum sm:text-2xl">
                        {topic.label}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 border border-accent/40 bg-ivory px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-accent-dark">
                          <FiCheck size={11} aria-hidden="true" />
                          Selected
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 block max-w-md text-sm leading-relaxed text-plum/55">
                      {topic.text}
                    </span>
                  </span>
                  <FiArrowRight
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                      isSelected ? 'text-accent' : 'text-plum/30 group-hover:text-terracotta'
                    }`}
                  />
                </button>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Contact CTA                                                      */
/* ------------------------------------------------------------------ */

function ContactCTA() {
  const content = useSiteContent('contact')

  return (
    <FinalCTA
      heading={content.ctaHeading}
      description="Browse the residences we currently represent, or meet the advisors who can guide things from here."
      primaryLabel="Browse Properties"
      primaryTo="/properties"
      secondaryLabel="Meet the Agents"
      secondaryTo="/agents"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
        <a
          href="mailto:hello@veyraestates.com"
          className="inline-flex items-center gap-2 text-ivory/70 transition-colors duration-300 hover:text-ivory"
        >
          <FiMail size={14} aria-hidden="true" className="text-terracotta-light" />
          hello@veyraestates.com
        </a>
        <a
          href="tel:+442079460192"
          className="inline-flex items-center gap-2 text-ivory/70 transition-colors duration-300 hover:text-ivory"
        >
          <FiPhone size={14} aria-hidden="true" className="text-terracotta-light" />
          +44 20 7946 0192
        </a>
      </div>
    </FinalCTA>
  )
}

/* ------------------------------------------------------------------ */

function Contact() {
  const [preset, setPreset] = useState({ type: null, token: 0 })

  const handleSelectTopic = (type) => {
    setPreset((prev) => ({ type, token: prev.token + 1 }))
    document.getElementById('start-a-conversation')?.scrollIntoView()
    window.setTimeout(() => {
      document.getElementById('contact-inquiry-type')?.focus({ preventScroll: true })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <ContactHero />
        <StartAConversation presetInquiryType={preset} />
        <ContactOptions />
        <VisitVeyra />
        <WhatCanWeHelpWith onSelectTopic={handleSelectTopic} selectedTopic={preset.type} />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Contact
