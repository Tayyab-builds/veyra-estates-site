import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiHeart, FiUser, FiLogOut, FiShield } from 'react-icons/fi'
import { Link, usePathname } from '../router.jsx'
import { useAuth } from '../hooks/useAuth.js'

const routeLinks = [
  { label: 'Properties', to: '/properties' },
  { label: 'Buy', to: '/buy' },
  { label: 'Rent', to: '/rent' },
  { label: 'Locations', to: '/locations' },
  { label: 'Agents', to: '/agents' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const easeEditorial = [0.22, 1, 0.36, 1]

function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // Only the home page has an intentional transparent hero state. Every
  // other route must render the blurred/background pill from its very
  // first frame — there is no "top of page" hero to be transparent over.
  const isHomePage = pathname === '/'
  // Derive the initial scrolled state synchronously from the real scroll
  // position instead of defaulting to `false` and correcting it in an
  // effect after mount. That two-step approach (`useState(false)` then
  // `useEffect(() => setScrolled(...))`) paints one wrong frame whenever
  // the page loads already scrolled (browser scroll restoration on
  // refresh/back-forward, hash links, etc.). Reading `window.scrollY` in
  // the lazy initializer means the very first render already has the
  // right value for the home page's hero -> blurred transition.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 24
  )
  // The actual visual state the pill renders with. On the home page this
  // still depends on real scroll position (preserving the intentional
  // transparent-hero -> blurred-on-scroll behavior). On every other page
  // it is forced `true` unconditionally and synchronously on first
  // render — never derived from scroll position, never corrected later
  // in an effect — so there is no transparent frame to flash before it.
  const showBlurred = isHomePage ? scrolled : true
  const { user, logout } = useAuth()
  const onProperties = pathname === '/properties'
  const onBuy = pathname === '/buy'
  const onRent = pathname === '/rent'
  const onLocations = pathname === '/locations'
  const onAgents = pathname === '/agents'
  const onAbout = pathname === '/about'
  const onContact = pathname === '/contact'
  const onFavorites = pathname === '/favorites'
  const onAccount = pathname.startsWith('/account')
  const onAdmin = pathname.startsWith('/admin')
  const isCustomer = Boolean(user) && user.role !== 'admin'
  const isAdmin = Boolean(user) && user.role === 'admin'

  useEffect(() => {
    // Scroll position only ever changes the visual state on the home
    // page (the hero -> blurred transition). On every other page the
    // pill is already forced blurred via `showBlurred` above, so there
    // is nothing for a scroll listener to correct — skip attaching it
    // entirely rather than have it flip a `scrolled` value that isn't
    // even read for non-home routes.
    if (!isHomePage) return
    // Initial value is already correct (see lazy useState initializer
    // above), so this effect only needs to keep it in sync as the user
    // actually scrolls — no need to call onScroll() again on mount.
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomePage])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeEditorial }}
      className="fixed top-4 inset-x-0 z-50 px-4 sm:top-5 sm:px-6 lg:top-6 lg:px-10"
    >
      <div
        className={`mx-auto flex w-full max-w-content items-center justify-between rounded-full border transition-all duration-500 ease-editorial ${
          showBlurred
            ? 'border-ivory/15 bg-plum/80 shadow-[0_10px_40px_-12px_rgba(52,43,50,0.55)] backdrop-blur-xl'
            : 'border-ivory/10 bg-plum/35 shadow-[0_8px_30px_-16px_rgba(52,43,50,0.35)] backdrop-blur-md'
        }`}
      >
        <nav
          className="flex w-full items-center justify-between gap-2 pl-5 pr-2.5 py-2.5 sm:gap-4 sm:pl-7 sm:pr-3 lg:pl-9 lg:pr-3.5 lg:py-3"
          aria-label="Primary"
        >
          <Link
            to="/"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="group flex flex-col leading-none shrink-0"
          >
            <span className="font-display text-[1.15rem] tracking-[0.03em] text-ivory transition-colors duration-300 group-hover:text-parchment sm:text-xl lg:text-[1.35rem]">
              Veyra Estates
            </span>
            <span className="mt-1 hidden text-[0.6rem] tracking-[0.28em] uppercase text-ivory/45 sm:block">
              Est. 2011
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {routeLinks.map((link) => {
              const active =
                (link.label === 'Properties' && onProperties) ||
                (link.label === 'Buy' && onBuy) ||
                (link.label === 'Rent' && onRent) ||
                (link.label === 'Locations' && onLocations) ||
                (link.label === 'Agents' && onAgents) ||
                (link.label === 'About' && onAbout) ||
                (link.label === 'Contact' && onContact)
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative py-1 text-[0.85rem] tracking-wide transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-olive-light after:transition-all after:duration-300 after:ease-editorial after:content-[''] hover:text-ivory hover:after:w-full ${
                      active ? 'text-ivory after:w-full' : 'text-ivory/70 after:w-0'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              to="/favorites"
              aria-label="View favorites"
              aria-current={onFavorites ? 'page' : undefined}
              className={`transition-colors duration-300 hover:text-ivory ${
                onFavorites ? 'text-ivory' : 'text-ivory/70'
              }`}
            >
              <FiHeart
                size={18}
                className={`transition-transform duration-200 ease-editorial active:scale-90 ${
                  onFavorites ? 'fill-terracotta text-terracotta' : ''
                }`}
              />
            </Link>
            {isCustomer && (
              <Link
                to="/account"
                aria-current={onAccount ? 'page' : undefined}
                className={`flex items-center gap-1.5 text-[0.85rem] transition-colors duration-300 hover:text-ivory ${
                  onAccount ? 'text-ivory' : 'text-ivory/80'
                }`}
              >
                <FiUser size={15} className="opacity-80" />
                My Account
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                aria-current={onAdmin ? 'page' : undefined}
                className={`flex items-center gap-1.5 text-[0.85rem] transition-colors duration-300 hover:text-ivory ${
                  onAdmin ? 'text-ivory' : 'text-ivory/80'
                }`}
              >
                <FiShield size={15} className="opacity-80" />
                Admin
              </Link>
            )}
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1.5 text-[0.85rem] text-ivory/80 transition-colors duration-300 hover:text-ivory"
              >
                <FiLogOut size={15} className="opacity-80" />
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                aria-current={pathname === '/login' ? 'page' : undefined}
                className="flex items-center gap-1.5 text-[0.85rem] text-ivory/80 transition-colors duration-300 hover:text-ivory"
              >
                <FiUser size={15} className="opacity-80" />
                Log In
              </Link>
            )}
            <Link
              to="/properties"
              className="ease-editorial inline-flex items-center justify-center rounded-md border border-olive bg-olive px-5 py-2.5 text-[0.82rem] font-medium tracking-wide text-ivory transition-all duration-300 hover:border-olive-light hover:bg-olive-light active:scale-[0.97]"
            >
              Explore Properties
            </Link>
          </div>

          {/* Mobile-only utility cluster: Favorites and Login/Account stay
              directly visible in the header (not tucked inside the "Tap to
              see pages" menu), sitting alongside the menu toggle. */}
          <div className="flex items-center gap-0.5 sm:gap-1 lg:hidden">
            <Link
              to="/favorites"
              aria-label="View favorites"
              aria-current={onFavorites ? 'page' : undefined}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-all duration-300 ease-editorial hover:bg-ivory/10 active:scale-90 sm:h-10 sm:w-10"
            >
              <FiHeart size={18} className={onFavorites ? 'fill-terracotta text-terracotta' : ''} />
            </Link>

            {isCustomer && (
              <Link
                to="/account"
                aria-label="My account"
                aria-current={onAccount ? 'page' : undefined}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-all duration-300 ease-editorial hover:bg-ivory/10 active:scale-90 sm:h-10 sm:w-10"
              >
                <FiUser size={17} />
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                aria-label="Admin"
                aria-current={onAdmin ? 'page' : undefined}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-all duration-300 ease-editorial hover:bg-ivory/10 active:scale-90 sm:h-10 sm:w-10"
              >
                <FiShield size={17} />
              </Link>
            )}

            {user ? (
              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-all duration-300 ease-editorial hover:bg-ivory/10 active:scale-90 sm:h-10 sm:w-10"
              >
                <FiLogOut size={17} />
              </button>
            ) : (
              <Link
                to="/login"
                aria-label="Log in"
                aria-current={pathname === '/login' ? 'page' : undefined}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-all duration-300 ease-editorial hover:bg-ivory/10 active:scale-90 sm:h-10 sm:w-10"
              >
                <FiUser size={17} />
              </Link>
            )}

            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-all duration-300 ease-editorial hover:bg-ivory/10 active:scale-90 sm:h-10 sm:w-10"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <FiX size={21} /> : <FiMenu size={21} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            className="mx-auto mt-3 w-full max-w-content overflow-hidden rounded-3xl border border-ivory/15 bg-plum/90 shadow-[0_20px_50px_-15px_rgba(52,43,50,0.6)] backdrop-blur-xl lg:hidden"
          >
            <ul className="flex max-h-[70vh] flex-col overflow-y-auto px-6 py-5">
              {routeLinks.map((link) => {
                const active =
                  (link.label === 'Properties' && onProperties) ||
                  (link.label === 'Buy' && onBuy) ||
                (link.label === 'Rent' && onRent) ||
                  (link.label === 'Locations' && onLocations) ||
                  (link.label === 'Agents' && onAgents) ||
                  (link.label === 'About' && onAbout) ||
                  (link.label === 'Contact' && onContact)
                return (
                  <li key={link.label} className="border-b border-ivory/10 last:border-none">
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`block py-3.5 font-display text-lg ${
                        active ? 'text-olive-light' : 'text-ivory'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              {/* Favorites and Login/Account live in the header itself (see
                  the mobile utility cluster above), not in this page-only
                  menu, so they are intentionally not repeated here. */}
              <li className="mt-5">
                <Link
                  to="/properties"
                  onClick={() => setOpen(false)}
                  className="ease-editorial flex w-full items-center justify-center rounded-md border border-olive bg-olive px-5 py-3 text-sm font-medium tracking-wide text-ivory transition-all duration-300 hover:border-olive-light hover:bg-olive-light active:scale-[0.97]"
                >
                  Explore Properties
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
