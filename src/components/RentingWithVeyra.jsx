import { useMemo } from 'react'
import { useProperties } from '../data/propertyStore.js'
import { Reveal, RevealGroup, RevealItem } from './motion/Reveal.jsx'

const principles = [
  {
    title: 'Curated Selection',
    text: 'Every rental is chosen for its setting and condition, not simply added because it is available.',
  },
  {
    title: 'Local Market Knowledge',
    text: 'Our agents work within a handful of cities, and know each of those markets closely.',
  },
  {
    title: 'Personal Guidance',
    text: 'A dedicated agent helps you weigh each property against what you actually need.',
  },
  {
    title: 'A Straightforward Viewing Process',
    text: 'Enquire on a listing and an agent will arrange a viewing directly with you.',
  },
]

/**
 * Trust section. Kept as four plainly-stated principles — no statistics,
 * guarantees or awards — presented as an editorial numbered row rather than
 * a set of feature cards, so the emphasis stays on the words.
 */
function RentingWithVeyra() {
  const properties = useProperties()

  const sectionImage = useMemo(() => {
    const rentals = properties.filter((property) => property.purpose === 'Rent')
    return (
      rentals.find((property) => property.id === 'business-bay-apartment')?.image ||
      rentals.find((property) => property.image)?.image ||
      ''
    )
  }, [properties])

  return (
    <section aria-label="Renting with Veyra" className="bg-ivory py-24 lg:py-32">
      <div className="container-veyra">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow-soft">Renting With Veyra</p>
            <h2 className="mt-5 font-display font-normal text-[2rem] leading-[1.1] text-plum sm:text-[2.5rem] lg:text-[3rem]">
              Renting, Considered Properly.
            </h2>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-plum/70">
              We treat a lease with the same care as a sale — the right
              property, explained clearly, by someone who knows the
              building and the neighborhood around it.
            </p>
          </Reveal>

          <Reveal
            variant="scale"
            scaleFrom={1.02}
            direction="none"
            duration={0.9}
            amount={0.2}
            className="group aspect-[16/11] overflow-hidden lg:col-span-6"
          >
            {sectionImage && (
              <img
                src={sectionImage}
                alt="A calm, considered interior representative of a Veyra rental"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial will-change-transform motion-safe:group-hover:scale-[1.03]"
                loading="lazy"
              />
            )}
          </Reveal>
        </div>

        <RevealGroup
          as="ol"
          stagger={0.08}
          amount={0.2}
          className="mt-16 flex flex-col divide-y divide-stone border-t border-stone lg:mt-20 lg:flex-row lg:divide-x lg:divide-y-0"
        >
          {principles.map((principle, i) => (
            <RevealItem
              key={principle.title}
              as="li"
              className="flex-1 py-7 lg:px-7 lg:py-0 lg:pt-9"
            >
              <span className="block font-display text-[1.6rem] leading-none text-accent-dark">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl text-plum">{principle.title}</h3>
              <p className="mt-2.5 max-w-[260px] text-[0.92rem] leading-relaxed text-plum/70">
                {principle.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default RentingWithVeyra
