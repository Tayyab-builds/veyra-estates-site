import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import PropertySearch from '../components/PropertySearch.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import PopularLocations from '../components/PopularLocations.jsx'
import VeyraIntroduction from '../components/VeyraIntroduction.jsx'
import WhyVeyra from '../components/WhyVeyra.jsx'
import FeaturedAgents from '../components/FeaturedAgents.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCTA from '../components/FinalCTA.jsx'
import Footer from '../components/Footer.jsx'
import { useSiteContent } from '../data/siteContentStore.js'

function Home() {
  // Everything on the homepage below is static/data-driven except this
  // closing CTA, which is the one Home section exposed to Developer Mode
  // (`/admin/developer`) — see `src/data/siteContent.js`.
  const content = useSiteContent('home')

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        {/* 1. Hero / Estate Stories — dynamic slider plus its floating search bar */}
        <Hero />
        <PropertySearch />

        {/* 2. Featured Properties — grid + editorial spotlight */}
        <FeaturedProperties />

        {/* 3. Places Worth Living */}
        <PopularLocations />

        {/* 4. The Veyra Approach — introduction + guiding principles */}
        <section id="introduction">
          <VeyraIntroduction />
          <WhyVeyra />
        </section>

        {/* 5. People + Client Experience — agents + testimonials */}
        <section id="agents">
          <FeaturedAgents />
          <Testimonials />
        </section>

        {/* 6. Final CTA + Footer */}
        <FinalCTA
          heading={content.ctaHeading}
          description={content.ctaDescription}
          primaryLabel={content.ctaPrimaryLabel}
          secondaryLabel={content.ctaSecondaryLabel}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Home
