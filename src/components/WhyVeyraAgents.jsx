import { RevealGroup, RevealItem } from './motion/Reveal.jsx'

const principles = [
  {
    title: 'Curated Guidance',
    text: 'We work with a small number of clients at a time, and give each one full attention rather than dividing focus across many.',
  },
  {
    title: 'Local Expertise',
    text: 'Every advisor is based in the market they represent, not managing it remotely from elsewhere.',
  },
  {
    title: 'Discreet Representation',
    text: "Many of the properties and buyers we work with prefer not to be public, and we're set up to work that way.",
  },
  {
    title: 'Personal Attention',
    text: 'You deal with one advisor throughout a transaction, not a rotating cast of contacts.',
  },
]

function WhyVeyraAgents() {
  return (
    <section aria-labelledby="why-veyra-heading" className="py-20 lg:py-28 bg-ivory">
      <div className="container-veyra">
        <div className="max-w-xl">
          <p className="eyebrow">Why Work With Veyra Agents</p>
          <h2
            id="why-veyra-heading"
            className="mt-4 font-display text-3xl sm:text-4xl leading-[1.14] text-plum"
          >
            Representation built around one person, not a pipeline.
          </h2>
        </div>

        <RevealGroup as="div" className="mt-14 border-t border-stone" stagger={0.08} amount={0.4}>
          {principles.map((principle, i) => (
            <RevealItem
              key={principle.title}
              as="div"
              className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-stone py-8 sm:grid-cols-[3rem_minmax(0,11rem)_1fr] sm:gap-x-6 sm:gap-y-2 sm:py-9"
            >
              <span className="font-display text-sm text-plum/35 sm:pt-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl text-plum sm:text-3xl">{principle.title}</h3>
              <p className="col-span-2 max-w-xl text-plum/60 leading-relaxed sm:col-span-1 sm:pt-1.5">
                {principle.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default WhyVeyraAgents
