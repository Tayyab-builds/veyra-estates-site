import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGrid, FiCalendar, FiHeart, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { Link, useRouter, usePathname } from '../../router.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const navItems = [
  { label: 'Overview', to: '/account', icon: FiGrid },
  { label: 'My Reservations', to: '/account/reservations', icon: FiCalendar },
  { label: 'Favorites', to: '/favorites', icon: FiHeart },
  { label: 'Profile', to: '/account/profile', icon: FiUser },
]

function isActive(pathname, to) {
  return pathname === to || (to === '/favorites' && pathname.startsWith('/favorites'))
}

function NavList({ pathname, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Account">
      {navItems.map(({ label, to, icon: Icon }) => {
        const active = isActive(pathname, to)
        return (
          <Link
            key={label}
            to={to}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.85rem] tracking-wide transition-colors duration-300 ${
              active ? 'bg-ivory/12 text-ivory' : 'text-ivory/65 hover:bg-ivory/8 hover:text-ivory'
            }`}
          >
            <Icon size={16} className={active ? 'text-terracotta' : 'text-ivory/45 group-hover:text-ivory/75'} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function LogoutButton({ onNavigate, className = '' }) {
  const { logout } = useAuth()
  const { navigate } = useRouter()

  const handleLogout = () => {
    logout()
    onNavigate?.()
    navigate('/')
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.85rem] tracking-wide text-ivory/65 transition-colors duration-300 hover:bg-ivory/8 hover:text-ivory ${className}`}
    >
      <FiLogOut size={16} className="text-ivory/45" />
      Log Out
    </button>
  )
}

function AccountHeader({ name }) {
  return (
    <div className="mb-3 border-b border-ivory/10 px-3 pb-4">
      <p className="font-display text-lg text-ivory">My Account</p>
      {name && <p className="mt-1 truncate text-[0.7rem] tracking-wide text-ivory/45">{name}</p>}
    </div>
  )
}

/**
 * Customer dashboard navigation. Renders a sticky vertical rail on desktop
 * (`lg:` and up) and a compact translucent bar + slide-in drawer on smaller
 * screens — both reuse the Navbar's dark, blurred, pill-shaped visual
 * language rather than a generic admin sidebar look.
 */
function DashboardSidebar({ pageTitle }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  // Lock background scroll and allow Escape-to-close while the mobile
  // drawer is open — the same behavior every other overlay in the app
  // already has (Navbar's mobile menu, PropertyEditModal, ConfirmDialog).
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      {/* Mobile: compact bar + drawer */}
      <div className="lg:hidden">
        <div className="sticky top-20 z-30 flex items-center justify-between rounded-full border border-ivory/15 bg-plum/85 px-5 py-3 shadow-[0_10px_30px_-14px_rgba(40,37,34,0.55)] backdrop-blur-xl">
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ivory/45">My Account</p>
            <p className="truncate font-display text-base text-ivory">{pageTitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open account menu"
            aria-expanded={open}
            aria-controls="account-drawer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-colors duration-300 hover:bg-ivory/10"
          >
            <FiMenu size={19} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                id="account-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Account navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: easeEditorial }}
                className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col justify-between border-l border-ivory/15 bg-plum/95 p-6 shadow-[0_20px_60px_-15px_rgba(40,37,34,0.65)] backdrop-blur-xl"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <AccountHeader name={user?.name} />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close account menu"
                      className="-mt-8 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-colors duration-300 hover:bg-ivory/10"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                  <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
                </div>
                <div className="border-t border-ivory/10 pt-3">
                  <LogoutButton onNavigate={() => setOpen(false)} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: sticky vertical rail */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="lg:sticky lg:top-28 lg:flex lg:min-h-[calc(100vh-9rem)] lg:flex-col lg:justify-between rounded-[28px] border border-ivory/15 bg-plum/85 p-5 shadow-[0_20px_50px_-18px_rgba(40,37,34,0.55)] backdrop-blur-xl">
          <div>
            <AccountHeader name={user?.name} />
            <NavList pathname={pathname} />
          </div>
          <div className="mt-6 border-t border-ivory/10 pt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  )
}

export default DashboardSidebar
