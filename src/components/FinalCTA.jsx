import { motion } from 'framer-motion'
import Button from './Button.jsx'
import { Link } from '../router.jsx'

function FinalCTA({
  heading = 'Find somewhere worth staying for.',
  description = "Browse current residences, or speak with someone who knows the market you're interested in.",
  primaryLabel = 'Explore Properties',
  primaryTo = '/properties',
  primaryHref,
  secondaryLabel = 'Speak With an Expert',
  secondaryTo,
  secondaryHref = '#footer',
  children,
}) {
  return (
    <section className="bg-plum py-24 lg:py-32">
      <div className="container-veyra flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-ivory max-w-2xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-ivory/65 text-lg max-w-md"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          {primaryHref ? (
            <Button as="a" href={primaryHref} variant="primary">
              {primaryLabel}
            </Button>
          ) : (
            <Button as={Link} to={primaryTo} variant="primary">
              {primaryLabel}
            </Button>
          )}
          {secondaryTo ? (
            <Button as={Link} to={secondaryTo} variant="light">
              {secondaryLabel}
            </Button>
          ) : (
            <Button as="a" href={secondaryHref} variant="light">
              {secondaryLabel}
            </Button>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 w-full max-w-sm border-t border-ivory/15 pt-7"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default FinalCTA
