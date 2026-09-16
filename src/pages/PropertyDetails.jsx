import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import PropertyGallery from '../components/PropertyGallery.jsx'
import PropertyHeroHeader from '../components/PropertyHeroHeader.jsx'
import PropertyOverview from '../components/PropertyOverview.jsx'
import PropertyAbout from '../components/PropertyAbout.jsx'
import PropertyFeatures from '../components/PropertyFeatures.jsx'
import PropertyLocationAgent from '../components/PropertyLocationAgent.jsx'
import PropertyInquiry from '../components/PropertyInquiry.jsx'
import PropertyNotFound from '../components/PropertyNotFound.jsx'
import { getPropertyById, getRelatedProperties } from '../data/propertyStore.js'
import { getAgentById } from '../data/agents.js'

function PropertyDetails({ id }) {
  const property = getPropertyById(id)

  if (!property) {
    return <PropertyNotFound />
  }

  const agent = getAgentById(property.agentId)
  const related = getRelatedProperties(property, 3)

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Property Hero / Gallery */}
        <section className="pt-28 pb-10 sm:pt-32 lg:pt-36">
          <PropertyHeroHeader property={property} />
          <div className="container-veyra mt-8 sm:mt-10">
            <PropertyGallery images={property.gallery} name={property.name} />
          </div>
        </section>

        {/* 2. Property Overview */}
        <PropertyOverview property={property} />

        {/* 3. About the Residence */}
        <PropertyAbout property={property} />

        {/* 4. Features & Specifications */}
        <PropertyFeatures features={property.features} />

        {/* 5. Location + Agent */}
        <PropertyLocationAgent property={property} agent={agent} />

        {/* 6. Inquiry / CTA + related properties */}
        <PropertyInquiry property={property} relatedProperties={related} />
      </main>
      <Footer />
    </div>
  )
}

export default PropertyDetails
