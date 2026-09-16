import { motion } from 'framer-motion'

function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col h-full border-t border-stone pt-7"
    >
      <blockquote className="font-display text-[1.35rem] leading-snug text-plum flex-1">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="text-plum block">{testimonial.name}</span>
        <span className="text-plum/45">{testimonial.context}</span>
      </figcaption>
    </motion.figure>
  )
}

export default TestimonialCard
