import SectionHeading from './SectionHeading.jsx'
import PropertyCard from './PropertyCard.jsx'
import EditorialPropertyFeature from './EditorialPropertyFeature.jsx'
import Button from './Button.jsx'
import { Link } from '../router.jsx'
import { useProperties } from '../data/propertyStore.js'

function FeaturedProperties() {
  const properties = useProperties()
  return (
    <section id="properties" className="py-24 lg:py-32">
      <div className="container-veyra">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            title="Featured Properties"
            description="A short list of current residences, each selected for its setting, craft, or story."
          />
          <Button as={Link} to="/properties" variant="secondary" className="shrink-0">
            View All Properties
          </Button>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {properties.filter((property) => property.featured).slice(0, 4).map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>

      <EditorialPropertyFeature />
    </section>
  )
}

export default FeaturedProperties
