import SectionHeading from './SectionHeading.jsx'
import LocationCard from './LocationCard.jsx'
import { locations } from '../data/locations.js'

function PopularLocations() {
  const [newYork, london, dubai, miami] = locations

  return (
    <section className="py-24 lg:py-32 bg-ivory">
      <div className="container-veyra">
        <SectionHeading
          title="Places Worth Calling Home"
          description="Four markets we know intimately — each with its own rhythm, architecture, and way of living."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[300px] gap-5">
          <LocationCard
            location={newYork}
            className="aspect-[4/3] lg:aspect-auto lg:col-span-2 lg:row-span-1"
          />
          <LocationCard
            location={london}
            className="aspect-[4/3] lg:aspect-auto lg:col-span-1 lg:row-span-1"
          />
          <LocationCard
            location={dubai}
            className="aspect-[4/3] lg:aspect-auto lg:col-span-1 lg:row-span-1"
          />
          <LocationCard
            location={miami}
            className="aspect-[4/3] lg:aspect-auto sm:col-span-2 lg:col-span-2 lg:row-span-1"
          />
        </div>
      </div>
    </section>
  )
}

export default PopularLocations
