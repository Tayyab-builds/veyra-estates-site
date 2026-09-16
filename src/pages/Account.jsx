import {
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiCalendar,
  FiHeart,
  FiArrowRight,
  FiCompass,
  FiHome,
  FiKey,
  FiMessageSquare,
} from 'react-icons/fi'
import { Link } from '../router.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { useInquiries } from '../data/inquiryStore.js'
import { useProperties, getPropertyById } from '../data/propertyStore.js'
import RequireCustomer from '../components/dashboard/RequireCustomer.jsx'
import DashboardShell from '../components/dashboard/DashboardShell.jsx'
import DashboardCard from '../components/dashboard/DashboardCard.jsx'
import FavoriteMiniCard from '../components/dashboard/FavoriteMiniCard.jsx'
import Button from '../components/Button.jsx'

const cardActionClass =
  'inline-flex shrink-0 items-center gap-1.5 text-[0.8rem] tracking-wide text-plum/60 transition-colors duration-300 hover:text-terracotta'

const quickActions = [
  { label: 'Browse Properties', to: '/properties', icon: FiCompass },
  { label: 'Buy', to: '/buy', icon: FiHome },
  { label: 'Rent', to: '/rent', icon: FiKey },
  { label: 'Favorites', to: '/favorites', icon: FiHeart },
  { label: 'Contact an Agent', to: '/contact', icon: FiMessageSquare },
]

function Welcome({ name }) {
  const firstName = name?.split(' ')[0] ?? 'there'
  return (
    <section className="border border-stone bg-ivory p-6 sm:p-8 lg:p-10">
      <p className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">My Account</p>
      <h1 className="mt-2 max-w-xl font-display text-3xl leading-[1.1] text-plum sm:text-4xl">
        Welcome back, {firstName}.
      </h1>
      <p className="mt-3 max-w-lg leading-relaxed text-plum/60">
        A private space to keep track of saved homes, upcoming viewings and the details Veyra
        holds on file for you.
      </p>
    </section>
  )
}

function ProfileSummary({ user }) {
  return (
    <DashboardCard
      eyebrow="Account"
      title="Profile Summary"
      action={
        <Link to="/account/profile" className={cardActionClass}>
          Manage
          <FiArrowRight size={13} />
        </Link>
      }
    >
      <dl className="flex flex-col gap-3 text-sm text-plum/75">
        <div className="flex items-center gap-3">
          <FiUser size={15} className="shrink-0 text-plum/40" />
          <dt className="sr-only">Name</dt>
          <dd className="truncate">{user.name}</dd>
        </div>
        <div className="flex items-center gap-3">
          <FiMail size={15} className="shrink-0 text-plum/40" />
          <dt className="sr-only">Email</dt>
          <dd className="truncate">{user.email}</dd>
        </div>
        {user.phone && (
          <div className="flex items-center gap-3">
            <FiPhone size={15} className="shrink-0 text-plum/40" />
            <dt className="sr-only">Phone</dt>
            <dd className="truncate">{user.phone}</dd>
          </div>
        )}
        <div className="flex items-center gap-3">
          <FiCheckCircle size={15} className="shrink-0 text-olive" />
          <dt className="sr-only">Status</dt>
          <dd>Active customer account</dd>
        </div>
      </dl>
    </DashboardCard>
  )
}

/**
 * Most recent Viewing Request inquiry (see `ViewingModal.jsx`) submitted
 * under the signed-in customer's own email — matched case-insensitively.
 * Reuses the existing `inquiryStore` rather than inventing a separate
 * reservations/bookings store. Full history lives at `/account/reservations`.
 */
function UpcomingReservation({ userEmail }) {
  const inquiries = useInquiries()
  const email = userEmail?.toLowerCase()
  const latest = inquiries.find(
    (inquiry) => inquiry.type === 'Viewing Request' && inquiry.email.toLowerCase() === email,
  )

  return (
    <DashboardCard eyebrow="Viewings" title="Upcoming Reservation">
      {latest ? (
        <div className="border border-stone bg-parchment/40 p-4 sm:p-5">
          {latest.property && (
            <p className="font-display text-base text-plum">{latest.property}</p>
          )}
          <p className="mt-1 text-sm leading-relaxed text-plum/65">{latest.message}</p>
          <p className="mt-3 text-[0.75rem] uppercase tracking-[0.1em] text-plum/45">
            Status: {latest.status}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-10 text-center">
          <FiCalendar size={20} className="text-plum/35" />
          <p className="max-w-[220px] text-sm leading-relaxed text-plum/60">
            Nothing scheduled yet. Request a viewing from any property page and it will appear here.
          </p>
          <Button as={Link} to="/properties" variant="secondary" className="mt-1 px-5 py-2.5 text-xs">
            Browse Properties
          </Button>
        </div>
      )}
    </DashboardCard>
  )
}

function FavoritesSummary({ favoriteIds }) {
  const properties = useProperties()
  const savedProperties = properties.filter((property) => favoriteIds.includes(property.id)).slice(0, 3)

  return (
    <DashboardCard
      eyebrow="Collection"
      title="Favorites Summary"
      action={
        <Link to="/favorites" className={cardActionClass}>
          View all
          <FiArrowRight size={13} />
        </Link>
      }
    >
      {savedProperties.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-10 text-center">
          <FiHeart size={20} className="text-plum/35" />
          <p className="max-w-[220px] text-sm leading-relaxed text-plum/60">
            Nothing saved yet. Tap the heart on any property to keep it here.
          </p>
          <Button as={Link} to="/properties" variant="secondary" className="mt-1 px-5 py-2.5 text-xs">
            Browse Properties
          </Button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-plum/55">
            {favoriteIds.length} saved {favoriteIds.length === 1 ? 'property' : 'properties'}
          </p>
          <div className="flex flex-col gap-3 sm:gap-4">
            {savedProperties.map((property) => (
              <FavoriteMiniCard key={property.id} property={property} />
            ))}
          </div>
        </>
      )}
    </DashboardCard>
  )
}

function RecentActivity({ favoriteIds }) {
  // Only real, existing state (favorites) is used here — there is no
  // backend activity feed to draw from, so recently-saved properties are
  // the genuine "recent activity" this frontend-only demo has.
  const recentSaves = [...favoriteIds]
    .reverse()
    .slice(0, 5)
    .map((id) => getPropertyById(id))
    .filter(Boolean)

  return (
    <DashboardCard eyebrow="Timeline" title="Recent Activity" className="h-full">
      {recentSaves.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-10 text-center">
          <p className="max-w-[280px] text-sm leading-relaxed text-plum/60">
            Your activity will show up here once you start saving properties or requesting
            viewings.
          </p>
          <Button as={Link} to="/properties" variant="secondary" className="mt-1 px-5 py-2.5 text-xs">
            Browse Properties
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-stone">
          {recentSaves.map((property) => (
            <li key={property.id} className="flex items-center gap-3 py-3 text-sm text-plum/70">
              <FiHeart size={14} className="shrink-0 fill-terracotta text-terracotta" />
              <span className="truncate">
                Saved{' '}
                <Link to={`/properties/${property.id}`} className="text-plum hover:text-terracotta">
                  {property.name}
                </Link>
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  )
}

function QuickActions() {
  return (
    <DashboardCard eyebrow="Shortcuts" title="Quick Actions" className="h-full">
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-start gap-2.5 border border-stone bg-parchment/50 px-4 py-4 text-sm text-plum transition-colors duration-300 hover:border-plum/30 hover:bg-parchment"
          >
            <Icon size={16} className="text-plum/45" />
            {label}
          </Link>
        ))}
      </div>
    </DashboardCard>
  )
}

function Account() {
  const { user } = useAuth()
  const { favoriteIds } = useFavorites()

  return (
    <RequireCustomer>
      {user && (
        <DashboardShell pageTitle="Overview">
          <Welcome name={user.name} />

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            <ProfileSummary user={user} />
            <UpcomingReservation userEmail={user.email} />
            <FavoritesSummary favoriteIds={favoriteIds} />
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivity favoriteIds={favoriteIds} />
            </div>
            <QuickActions />
          </div>
        </DashboardShell>
      )}
    </RequireCustomer>
  )
}

export default Account
