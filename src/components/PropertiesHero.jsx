import { motion } from 'framer-motion'

const easeEditorial = [0.22, 1, 0.36, 1]

function PropertiesHero() {
  return (
    <section
      aria-label="Properties introduction"
      className="relative h-[72svh] min-h-[460px] w-full overflow-hidden bg-ink sm:min-h-[520px] lg:min-h-[620px]"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1920&auto=format&fit=crop"
          alt="A glass-fronted contemporary residence framed by clean architectural lines"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-16 pt-28 sm:pb-20 lg:pb-24">
        <div className="container-veyra w-full">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeEditorial }}
          >
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/65 sm:text-xs">
              The Collection
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-[2.35rem] font-normal leading-[1.12] text-ivory sm:text-5xl lg:text-[3.4rem]">
              Properties Worth Finding.
            </h1>
            <p className="mt-5 max-w-lg text-ivory/70 text-base leading-relaxed sm:text-lg">
              Veyra curates exceptional residences across a handful of
              distinctive locations — each one selected for its setting,
              craft, and story, not simply its square footage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PropertiesHero
