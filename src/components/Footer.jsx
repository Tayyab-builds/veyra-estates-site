import { FiInstagram, FiLinkedin, FiFacebook } from 'react-icons/fi'
import { Link } from '../router.jsx'

const exploreLinks = [
  { label: 'Properties', to: '/properties' },
  { label: 'Buy', to: '/properties?purpose=Buy' },
  { label: 'Rent', to: '/properties?purpose=Rent' },
  { label: 'Locations', to: '/locations' },
  { label: 'Agents', to: '/agents' },
]
const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
const socialLinks = [
  { label: 'Instagram', icon: FiInstagram, href: '#' },
  { label: 'LinkedIn', icon: FiLinkedin, href: '#' },
  { label: 'Facebook', icon: FiFacebook, href: '#' },
]

function Footer() {
  return (
    <footer id="footer" className="bg-ink pt-20 pb-10">
      <div className="container-veyra">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl text-ivory">Veyra Estates</p>
            <p className="mt-4 text-ivory/55 text-sm leading-relaxed max-w-xs">
              A boutique international real estate firm representing
              distinctive residences in New York, London, Dubai and Miami.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-ivory/15 text-ivory/55 hover:text-accent-light hover:border-ivory/30 active:scale-90 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <p className="text-sm text-ivory/45 mb-4">Explore</p>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-block text-ivory/75 hover:text-accent-light text-sm transition-all duration-200 active:scale-95"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm text-ivory/45 mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="inline-block text-ivory/75 hover:text-accent-light text-sm transition-all duration-200 active:scale-95"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 pt-6 lg:pt-0 lg:pl-8 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-ivory/20 lg:before:right-auto lg:before:h-full lg:before:w-px">
            <p className="text-sm text-ivory/45 mb-4">Visit</p>
            <address className="not-italic text-sm text-ivory/75 leading-relaxed">
              21 Ashgrove Lane
              <br />
              London, W11 3AH
              <br />
              +44 20 7946 0192
              <br />
              hello@veyraestates.com
            </address>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ivory/45 text-xs">
            &copy; {new Date().getFullYear()} Veyra Estates. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ivory/45">
            <a href="#" className="inline-block hover:text-ivory/75 transition-all duration-200 active:scale-95">
              Privacy
            </a>
            <a href="#" className="inline-block hover:text-ivory/75 transition-all duration-200 active:scale-95">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
