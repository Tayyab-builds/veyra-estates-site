import { motion } from 'framer-motion'
import { FiCompass, FiUsers, FiMapPin, FiFeather } from 'react-icons/fi'
import SectionHeading from './SectionHeading.jsx'
import { RevealGroup, RevealItem } from './motion/Reveal.jsx'

const principles = [
  {
    number: '01',
    icon: FiCompass,
    title: 'Curated',
    text: 'Properties selected with intention, not volume.',
  },
  {
    number: '02',
    icon: FiUsers,
    title: 'Personal',
    text: 'Guidance built around each client\u2019s needs.',
  },
  {
    number: '03',
    icon: FiMapPin,
    title: 'Local Insight',
    text: 'Deep understanding of distinctive markets.',
  },
  {
    number: '04',
    icon: FiFeather,
    title: 'Considered',
    text: 'A calmer, more thoughtful property experience.',
  },
]

function WhyVeyra() {
  return (
    <div className="py-16 lg:py-20 bg-ivory">
      <div className="container-veyra">
        <SectionHeading title="Why Veyra" align="center" />

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px w-full origin-left bg-stone"
        />

        <RevealGroup
          as="div"
          stagger={0.12}
          amount={0.3}
          className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-stone"
        >
          {principles.map((p) => (
            <RevealItem key={p.title} className="flex flex-col items-center text-center gap-4 px-6 py-10">
              <span className="font-display text-sm text-olive-dark/70 tracking-wide">{p.number}</span>
              <p.icon size={22} className="text-sage" />
              <h3 className="font-display text-xl text-plum">{p.title}</h3>
              <p className="text-plum/60 text-sm leading-relaxed max-w-[220px]">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  )
}

export default WhyVeyra
