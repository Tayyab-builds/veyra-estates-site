import { motion, useReducedMotion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import { Reveal, RevealGroup, RevealItem, EASE_EDITORIAL } from '../components/motion/Reveal.jsx'
import { useSiteContent } from '../data/siteContentStore.js'

const principles = [
  {
    index: '01',
    title: 'Curated, Not Crowded',
    text: 'We represent a limited number of homes at any time, so every listing receives full attention rather than a place in a queue.',
  },
  {
    index: '02',
    title: 'Personal, Not Transactional',
    text: 'Each client works closely with an advisor who takes the time to understand what a home actually needs to do for their life.',
  },
  {
    index: '03',
    title: 'Local, Not Generic',
    text: 'Our advisors work within a single market, so guidance comes from familiarity with the streets, not a general playbook.',
  },
  {
    index: '04',
    title: 'Considered, Not Rushed',
    text: 'We favour the right introduction over the fast one, letting a search take the time it needs to reach the right home.',
  },
]

const experienceStages = [
  {
    index: '01',
    title: 'Discover',
    text: 'We start by understanding what a home actually needs to do for a client, beyond a list of requirements.',
  },
  {
    index: '02',
    title: 'Curate',
    text: 'A short, considered shortlist of homes worth seeing — not an inbox of listings to sort through.',
  },
  {
    index: '03',
    title: 'Advise',
    text: 'Honest guidance through viewings, offers and negotiation, from someone who knows the market well.',
  },
  {
    index: '04',
    title: 'Represent',
    text: 'One advisor stays involved from the first viewing through to closing, rather than a rotating cast of contacts.',
  },
  {
    index: '05',
    title: 'Close',
    text: 'We stay close through the final details, so moving into a new home feels as considered as the search itself.',
  },
]

const values = [
  {
    title: 'Discretion',
    text: 'Many of our clients and properties prefer to stay out of public view, and we work in a way that respects that.',
  },
  {
    title: 'Integrity',
    text: 'Advice comes first, even when it means recommending patience over a quick sale.',
  },
  {
    title: 'Taste',
    text: 'An eye for what makes a property genuinely distinctive, not simply expensive.',
  },
  {
    title: 'Attention',
    text: 'Small details, noticed and handled, throughout the length of a search or sale.',
  },
  {
    title: 'Long-Term Relationships',
    text: 'Many clients return for their next home, or send someone they trust our way.',
  },
]

/* ------------------------------------------------------------------ */
/* 1. About Hero                                                       */
/* ------------------------------------------------------------------ */

function AboutHero() {
  const content = useSiteContent('about')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      aria-label="Introduction to Veyra"
      className="relative overflow-hidden bg-ink pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#f5f1e8_1px,transparent_1px),linear-gradient(to_bottom,#f5f1e8_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="container-veyra relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.7, ease: EASE_EDITORIAL }}
            className="lg:col-span-7"
          >
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/50 sm:text-xs">
              About Veyra
            </p>
            <h1 className="mt-5 max-w-2xl font-display text-[2.5rem] font-normal leading-[1.08] text-ivory sm:text-6xl lg:text-[4rem]">
              {content.heroHeading}
            </h1>
            <p className="mt-7 max-w-md text-ivory/65 text-base leading-relaxed sm:text-lg">
              {content.heroDescription}
            </p>

            <div className="mt-12 flex gap-10 border-t border-ivory/15 pt-6 sm:gap-14">
              <div>
                <p className="font-display text-3xl text-ivory">14</p>
                <p className="mt-1 text-sm text-ivory/50">Years operating</p>
              </div>
              <div>
                <p className="font-display text-3xl text-ivory">4</p>
                <p className="mt-1 text-sm text-ivory/50">Cities represented</p>
              </div>
              <div className="hidden sm:block">
                <p className="font-display text-3xl text-ivory">210+</p>
                <p className="mt-1 text-sm text-ivory/50">Homes placed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, ease: EASE_EDITORIAL }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 hidden border border-terracotta/30 sm:block"
              />
              <div className="group relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop"
                  alt="A softly lit, minimally furnished living space with natural stone and timber finishes, representative of a Veyra-listed home"
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
              <div className="absolute left-3 top-3 bg-ivory/95 px-4 py-3 sm:left-5 sm:top-5">
                <p className="font-display text-sm text-plum">Est. 2011</p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-plum/50">
                  Veyra Estates
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. The Veyra Story                                                  */
/* ------------------------------------------------------------------ */

function VeyraStory() {
  const content = useSiteContent('about')

  return (
    <section aria-label="The Veyra story" className="py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-5 font-display text-4xl font-normal leading-[1.12] text-plum sm:text-5xl">
              {content.introHeading}
            </h2>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col gap-6 lg:col-span-7 lg:border-l lg:border-stone lg:pl-14"
          >
            <p className="text-plum/70 text-lg leading-relaxed">{content.introText}</p>
            <p className="text-plum/70 text-lg leading-relaxed">
              We work with a small number of properties at any time, which
              means each one gets our full attention — from how it's
              photographed to who we introduce it to.
            </p>
            <p className="text-plum/70 text-lg leading-relaxed">
              That same care extends to the people on the other side of
              every transaction. Buying or selling a home well takes local
              knowledge and a personal relationship, not a database of
              listings — so that is what we have built our practice around.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          as="div"
          stagger={0.12}
          amount={0.2}
          className="mt-16 grid gap-6 sm:grid-cols-12 lg:mt-20"
        >
          <RevealItem
            as="div"
            variant="scale"
            className="group relative aspect-[4/3] overflow-hidden sm:col-span-8"
          >
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1800&auto=format&fit=crop"
              alt="An architect's hand-drawn sketches and a scale model on a studio desk"
              className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
              loading="lazy"
            />
          </RevealItem>
          <RevealItem
            as="div"
            variant="scale"
            className="group relative aspect-[4/3] overflow-hidden sm:col-span-4 sm:mt-12"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
              alt="Detail of a stone stairwell inside a residence represented by Veyra"
              className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
              loading="lazy"
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Our Philosophy                                                   */
/* ------------------------------------------------------------------ */

function OurPhilosophy() {
  const content = useSiteContent('about')

  return (
    <section aria-label="Our philosophy" className="bg-ink py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/50">
              Our Philosophy
            </p>
            <h2 className="mt-5 max-w-sm font-display text-4xl font-normal leading-[1.14] text-ivory sm:text-5xl">
              {content.philosophyHeading}
            </h2>
            <p className="mt-6 max-w-sm text-ivory/60 text-base leading-relaxed">
              {content.philosophyText}
            </p>
          </Reveal>

          <RevealGroup
            as="ul"
            stagger={0.08}
            amount={0.4}
            className="border-t border-ivory/15 lg:col-span-8"
          >
            {principles.map((p) => (
              <RevealItem
                key={p.title}
                as="li"
                className="grid grid-cols-[3rem_1fr] gap-6 border-b border-ivory/15 py-7 sm:grid-cols-[4rem_1fr] sm:gap-10 sm:py-8"
              >
                <span className="font-display text-lg text-terracotta-light sm:text-xl">
                  {p.index}
                </span>
                <div>
                  <h3 className="font-display text-xl text-ivory sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-ivory/60 text-sm leading-relaxed sm:text-base">
                    {p.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. The Veyra Experience                                             */
/* ------------------------------------------------------------------ */

function VeyraExperience() {
  return (
    <section aria-label="The Veyra experience" className="py-20 lg:py-28">
      <div className="container-veyra">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">The Veyra Experience</p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.12] text-plum sm:text-5xl">
            What it feels like to work with us.
          </h2>
          <p className="mt-6 max-w-xl text-plum/65 text-lg leading-relaxed">
            Every search moves through the same stages, in the same order,
            so nothing important gets rushed or skipped along the way.
          </p>
        </Reveal>

        <RevealGroup
          as="div"
          stagger={0.08}
          amount={0.3}
          className="mt-16 flex flex-col border-t border-sage/30 lg:mt-20 lg:flex-row lg:border-l lg:border-t-0"
        >
          {experienceStages.map((stage) => (
            <RevealItem
              key={stage.title}
              as="div"
              className="flex-1 border-b border-sage/30 py-8 last:border-none lg:border-b-0 lg:border-r lg:px-7 lg:py-10 lg:last:border-none"
            >
              <span className="font-display text-sm text-terracotta">{stage.index}</span>
              <h3 className="mt-3 font-display text-xl text-plum">{stage.title}</h3>
              <p className="mt-2 max-w-[16rem] text-plum/60 text-sm leading-relaxed">
                {stage.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Our Values                                                       */
/* ------------------------------------------------------------------ */

function OurValues() {
  return (
    <section aria-label="Our values" className="bg-ivory py-20 lg:py-28">
      <div className="container-veyra">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Our Values</p>
          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.12] text-plum sm:text-5xl">
            The standards behind every introduction.
          </h2>
        </Reveal>

        <RevealGroup
          as="div"
          stagger={0.08}
          amount={0.3}
          className="mt-16 border-t border-stone lg:mt-20"
        >
          {values.map((value, i) => (
            <RevealItem
              key={value.title}
              as="div"
              className="grid grid-cols-[3rem_1fr] gap-x-6 gap-y-2 border-b border-stone py-8 sm:grid-cols-[4rem_14rem_1fr] sm:items-baseline sm:gap-x-10 lg:py-9"
            >
              <span className="font-display text-sm text-plum/30 sm:pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl text-plum sm:pt-0.5">{value.title}</h3>
              <p className="col-span-2 max-w-md text-plum/60 leading-relaxed sm:col-span-1 sm:pt-1">
                {value.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function About() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <AboutHero />
        <VeyraStory />
        <OurPhilosophy />
        <VeyraExperience />
        <OurValues />
        {/* 6. About CTA */}
        <FinalCTA
          heading="Ready to find your next address?"
          description="Browse the homes we currently represent, or meet the advisors who can guide your search from here."
          primaryLabel="Explore Properties"
          primaryTo="/properties"
          secondaryLabel="Meet the Agents"
          secondaryTo="/agents"
        />
      </main>
      <Footer />
    </div>
  )
}

export default About
