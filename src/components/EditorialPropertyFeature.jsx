import { motion } from 'framer-motion'
import Button from './Button.jsx'

function EditorialPropertyFeature() {
  return (
    <div className="relative mt-20 lg:mt-28">
      {/* subtle layered architectural frame — desktop only, purely decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-3 bottom-3 left-10 hidden border border-stone/70 lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-[70vh] min-h-[420px] w-full overflow-hidden sm:h-[74vh] lg:h-[78vh]"
      >
        <img
          src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1920&auto=format&fit=crop"
          alt="A cantilevered concrete and glass residence set into a hillside at dusk"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-veyra pb-10 sm:pb-12 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl leading-[1.1] text-ivory">
              A home with a point of view.
            </h2>
            <p className="mt-4 sm:mt-5 text-ivory/80 leading-relaxed text-sm sm:text-base">
              The Hollow Ridge House cuts into its hillside rather than
              sitting atop it — a study in restraint by architect Mireille
              Coste, represented exclusively through Veyra.
            </p>
            <p className="mt-3 text-ivory/60 text-sm">Ojai, California, USA</p>
            <Button as="a" href="#properties" variant="light" className="mt-6 sm:mt-7">
              Explore This Property
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EditorialPropertyFeature
