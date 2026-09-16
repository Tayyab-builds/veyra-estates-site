import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiGrid,
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiShield,
  FiExternalLink,
  FiEdit3,
} from 'react-icons/fi'
import { Link, useRouter, usePathname } from '../../router.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: FiGrid },
  { label: 'Properties', to: '/admin/properties', icon: FiHome },
  { label: 'Users', to: '/admin/users', icon: FiUsers },
  { label: 'Inquiries', to: '/admin/inquiries', icon: FiMessageSquare },
  { label: 'Developer Mode', to: '/admin/developer', icon: FiEdit3 },
]

// Leaves the admin area entirely, so it's kept out of `navItems`/`isActive`
// (it should never show the "active" pill) and rendered as its own link.
const viewSiteItem = { label: 'View Website', to: '/', icon: FiExternalLink }

function isActive(pathname, to) {
  return pathname === to
}

function NavList({ pathname, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {navItems.map(({ label, to, icon: Icon }) => {
        const active = isActive(pathname, to)
        return (
          <Link
            key={label}
            to={to}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`group relative flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.85rem] tracking-wide transition-colors duration-300 ${
              active ? 'bg-ivory/12 text-ivory' : 'text-ivory/65 hover:bg-ivory/8 hover:text-ivory'
            }`}
          >
            {active && (
              <span
                aria-hidden="true"
                className="absolute left-0 h-5 w-[3px] rounded-full bg-terracotta-light"
              />
            )}
            <Icon size={16} className={active ? 'text-terracotta-light' : 'text-ivory/45 group-hover:text-ivory/75'} />
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

function AdminHeader({ name }) {
  return (
    <div className="mb-3 border-b border-ivory/10 px-3 pb-4">
      <div className="flex items-center gap-2">
        <FiShield size={14} className="text-terracotta-light" />
        <p className="font-display text-lg text-ivory">Veyra Admin</p>
      </div>
      {name && <p className="mt-1 truncate text-[0.7rem] tracking-wide text-ivory/45">{name}</p>}
    </div>
  )
}

/**
 * Admin navigation. Reuses the customer dashboard sidebar's dark,
 * blurred, pill-shaped visual language (see `DashboardSidebar.jsx`) —
 * translucent background, backdrop blur, subtle border, restrained
 * shadow — rather than introducing a separate, generic admin template
 * look. Sticky full-height rail on desktop, compact bar + slide-in
 * drawer on mobile.
 */
function AdminSidebar({ pageTitle }) {
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
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ivory/45">Veyra Admin</p>
            <p className="truncate font-display text-base text-ivory">{pageTitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open admin menu"
            aria-expanded={open}
            aria-controls="admin-drawer"
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
                id="admin-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Admin navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: easeEditorial }}
                className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col justify-between border-l border-ivory/15 bg-plum/95 p-6 shadow-[0_20px_60px_-15px_rgba(40,37,34,0.65)] backdrop-blur-xl"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <AdminHeader name={user?.name} />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close admin menu"
                      className="-mt-8 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory transition-colors duration-300 hover:bg-ivory/10"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                  <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
                </div>
                <div className="border-t border-ivory/10 pt-3">
                  <Link
                    to={viewSiteItem.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.85rem] tracking-wide text-ivory/65 transition-colors duration-300 hover:bg-ivory/8 hover:text-ivory"
                  >
                    <FiExternalLink size={16} className="text-ivory/45" />
                    {viewSiteItem.label}
                  </Link>
                  <LogoutButton onNavigate={() => setOpen(false)} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: sticky vertical rail, full viewport height */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="lg:sticky lg:top-28 lg:flex lg:min-h-[calc(100vh-9rem)] lg:flex-col lg:justify-between rounded-[28px] border border-ivory/15 bg-plum/85 p-5 shadow-[0_20px_50px_-18px_rgba(40,37,34,0.55)] backdrop-blur-xl">
          <div>
            <AdminHeader name={user?.name} />
            <NavList pathname={pathname} />
          </div>
          <div className="mt-6 border-t border-ivory/10 pt-3">
            <Link
              to={viewSiteItem.to}
              className="flex items-center gap-3 rounded-full px-4 py-2.5 text-[0.85rem] tracking-wide text-ivory/65 transition-colors duration-300 hover:bg-ivory/8 hover:text-ivory"
            >
              <FiExternalLink size={16} className="text-ivory/45" />
              {viewSiteItem.label}
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
