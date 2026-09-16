import { useEffect } from 'react'
import { FiLogOut, FiShield } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth.js'
import { Link, useRouter } from '../../router.jsx'
import Navbar from '../Navbar.jsx'
import Footer from '../Footer.jsx'
import Button from '../Button.jsx'

function AdminNotice() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <section className="bg-ink pt-32 pb-24 sm:pt-36 lg:pt-40">
        <div className="container-veyra">
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 border border-ivory/15 bg-ink/40 px-8 py-12 text-center">
            <FiShield size={26} className="text-olive-light" />
            <p className="font-display text-2xl text-ivory">This area is for customer accounts.</p>
            <p className="text-sm leading-relaxed text-ivory/60">
              You're signed in with a demo admin account, which doesn't have a customer dashboard in
              this preview.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <Button as={Link} to="/admin/dashboard" variant="primary">
                Go to Admin
              </Button>
              <Button type="button" variant="light" onClick={logout} className="gap-2">
                <FiLogOut size={15} aria-hidden="true" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

/**
 * Protects `/account` and its subpages. Reuses the existing `useAuth`
 * mock-session state — no separate auth system. Logged-out visitors are
 * sent to the existing `/login` route; signed-in admin accounts are kept
 * out of the customer dashboard entirely, preserving the existing
 * admin/customer role split from `mockAccounts.js`.
 */
function RequireCustomer({ children }) {
  const { user, isAuthenticated } = useAuth()
  const { navigate } = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <p className="text-sm tracking-wide text-ivory/50">Redirecting to sign in…</p>
      </div>
    )
  }

  if (user.role === 'admin') {
    return <AdminNotice />
  }

  return children
}

export default RequireCustomer
