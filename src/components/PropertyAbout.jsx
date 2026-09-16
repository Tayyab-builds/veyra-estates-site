import { motion } from 'framer-motion'

const easeEditorial = [0.22, 1, 0.36, 1]

function PropertyAbout({ property }) {
  const spotlightImage = property.gallery?.[2] ?? property.image

  return (
    <section aria-labelledby="about-residence-heading" className="py-20 lg:py-28">
      <div className="container-veyra">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: easeEditorial }}
              className="lg:sticky lg:top-32"
            >
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-plum/45">About the Residence</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.1] text-plum sm:text-5xl">
                A Residence With Character
              </h2>
              {property.neighborhood && (
                <p className="mt-6 border-t border-stone pt-6 text-sm leading-relaxed text-plum/55">
                  {property.neighborhood}
                </p>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeEditorial }}
              className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]"
            >
              <img
                src={spotlightImage}
                alt={`Interior detail of ${property.name}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeEditorial }}
              className="mt-8 flex flex-col gap-5 sm:mt-10"
            >
              {property.about.map((paragraph, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-plum/70 ${
                    i === 0 ? 'font-display text-xl sm:text-2xl text-plum leading-[1.4]' : 'text-[1.02rem]'
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyAbout
