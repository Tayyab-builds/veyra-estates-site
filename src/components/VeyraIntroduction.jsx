import { motion } from 'framer-motion'

function VeyraIntroduction() {
  return (
    <div className="pt-20 pb-16 lg:pt-28 lg:pb-20">
      <div className="container-veyra">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-normal text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.12] max-w-3xl text-plum"
        >
          Property, considered differently.
        </motion.h2>

        <div className="mt-14 lg:mt-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 aspect-[16/11] overflow-hidden [perspective:1400px]"
          >
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop"
              alt="An interior with natural timber, stone surfaces and warm daylight, typical of a Veyra-represented residence"
              className="w-full h-full object-cover transition-transform duration-700 ease-editorial will-change-transform hover:[transform:scale(1.04)_rotateX(1.5deg)_rotateY(-1.5deg)]"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <p className="text-plum/70 text-lg leading-relaxed">
              We work with a small number of properties at any time, which
              means each one gets our full attention — from how it's
              photographed to who we introduce it to.
            </p>
            <p className="text-plum/70 text-lg leading-relaxed">
              Founded by a team of architects and agents, Veyra has spent
              over a decade building relationships in the cities we serve,
              rather than simply listing what happens to be available.
            </p>
            <div className="pt-4 border-t border-stone flex gap-10">
              <div>
                <p className="font-display text-3xl text-plum">14</p>
                <p className="text-sm text-plum/50 mt-1">Years operating</p>
              </div>
              <div>
                <p className="font-display text-3xl text-plum">4</p>
                <p className="text-sm text-plum/50 mt-1">Cities represented</p>
              </div>
              <div>
                <p className="font-display text-3xl text-plum">210+</p>
                <p className="text-sm text-plum/50 mt-1">Homes placed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VeyraIntroduction
