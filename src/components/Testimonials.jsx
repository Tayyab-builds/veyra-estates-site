import SectionHeading from './SectionHeading.jsx'
import TestimonialCard from './TestimonialCard.jsx'
import { testimonials } from '../data/testimonials.js'

function Testimonials() {
  return (
    <div className="py-16 lg:py-20 bg-ivory">
      <div className="container-veyra">
        <SectionHeading title="What Our Clients Remember" />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
