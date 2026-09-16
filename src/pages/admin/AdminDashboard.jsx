import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiArrowRight,
  FiExternalLink,
  FiEye,
  FiEdit2,
} from 'react-icons/fi'
import { Link } from '../../router.jsx'
import { useAuth, useAllUsers } from '../../hooks/useAuth.js'
import { useProperties } from '../../data/propertyStore.js'
import { useInquiries } from '../../data/inquiryStore.js'
import RequireAdmin from '../../components/dashboard/RequireAdmin.jsx'
import AdminShell from '../../components/admin/AdminShell.jsx'
import DashboardCard from '../../components/dashboard/DashboardCard.jsx'

const cardActionClass =
  'inline-flex shrink-0 items-center gap-1.5 text-[0.8rem] tracking-wide text-plum/60 transition-colors duration-300 hover:text-terracotta'

/* ------------------------------------------------------------------ */
/* 1. Admin Header                                                     */
/* ------------------------------------------------------------------ */

function AdminHeader({ name }) {
  const firstName = name?.split(' ')[0] ?? 'there'
  return (
    <section className="border border-stone bg-ivory p-6 sm:p-8 lg:p-10">
      <p className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">Veyra Admin</p>
      <h1 className="mt-2 max-w-xl font-display text-3xl leading-[1.1] text-plum sm:text-4xl">
        Welcome back, {firstName}.
      </h1>
      <p className="mt-3 max-w-lg leading-relaxed text-plum/60">
        A working overview of the listings, accounts, and enquiries currently on the site.
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Property Overview                                                */
/* ------------------------------------------------------------------ */

function StatTile({ label, value }) {
  return (
    <div className="border-t border-stone pt-4">
      <dt className="text-[0.65rem] tracking-[0.2em] uppercase text-plum/45">{label}</dt>
      <dd className="mt-1.5 font-display text-2xl text-plum">{value}</dd>
    </div>
  )
}

function PropertyOverview({ properties }) {
  const available = properties.filter((p) => p.availability === 'Available Now').length
  const forRent = properties.filter((p) => p.purpose === 'Rent').length
  const forSale = properties.filter((p) => p.purpose === 'Buy').length

  return (
    <DashboardCard
      eyebrow="Listings"
      title="Property Overview"
      action={
        <Link to="/admin/properties" className={cardActionClass}>
          Manage
          <FiArrowRight size={13} />
        </Link>
      }
    >
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        <StatTile label="Total Properties" value={properties.length} />
        <StatTile label="Available" value={available} />
        <StatTile label="Rental Properties" value={forRent} />
        <StatTile label="Sale Properties" value={forSale} />
      </dl>
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Recent Properties                                                */
/* ------------------------------------------------------------------ */

const availabilityStyles = {
  'Available Now': 'bg-sage/20 text-plum',
  'Under Offer': 'bg-terracotta/15 text-terracotta-dark',
  Sold: 'bg-stone text-plum/60',
  'Off Market': 'bg-stone text-plum/60',
}

// Deliberately not the public PropertyCard: a compact row is all an
// overview list needs, and it keeps this section quick to scan rather
// than reproducing the full public card layout in a management context.
function RecentPropertyRow({ property }) {
  return (
    <li className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-4">
      <Link
        to={`/properties/${property.id}`}
        className="h-16 w-full shrink-0 overflow-hidden sm:h-14 sm:w-20"
      >
        <img src={property.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to={`/properties/${property.id}`}
          className="truncate font-display text-base text-plum hover:text-terracotta"
        >
          {property.name}
        </Link>
        <p className="mt-0.5 truncate text-sm text-plum/50">{property.location}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 text-[0.7rem] tracking-wide ${
            availabilityStyles[property.availability] ?? 'bg-stone text-plum/60'
          }`}
        >
          {property.purpose === 'Buy' ? 'For Sale' : 'For Rent'}
        </span>
        <span className="text-plum/60">{property.price}</span>
        <div className="flex items-center gap-1">
          <Link
            to={`/properties/${property.id}`}
            aria-label={`View ${property.name}`}
            className="flex h-8 w-8 items-center justify-center text-plum/55 transition-colors duration-300 hover:bg-parchment hover:text-plum"
          >
            <FiEye size={15} />
          </Link>
          <Link
            to="/admin/properties"
            aria-label={`Edit ${property.name}`}
            className="flex h-8 w-8 items-center justify-center text-plum/55 transition-colors duration-300 hover:bg-parchment hover:text-plum"
          >
            <FiEdit2 size={15} />
          </Link>
        </div>
      </div>
    </li>
  )
}

function RecentProperties({ properties }) {
  const recent = properties.slice(0, 5)

  return (
    <DashboardCard
      eyebrow="Latest"
      title="Recent Properties"
      className="h-full"
      action={
        <Link to="/admin/properties" className={cardActionClass}>
          Manage all
          <FiArrowRight size={13} />
        </Link>
      }
    >
      {recent.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-10 text-center">
          <FiHome size={20} className="text-plum/35" />
          <p className="max-w-[240px] text-sm leading-relaxed text-plum/60">
            No properties remain in the current listing set.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-stone">
          {recent.map((property) => (
            <RecentPropertyRow key={property.id} property={property} />
          ))}
        </ul>
      )}
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 4. User Overview                                                    */
/* ------------------------------------------------------------------ */

function UserOverview({ users }) {
  const admins = users.filter((u) => u.role === 'admin').length
  const customers = users.length - admins

  return (
    <DashboardCard
      eyebrow="Accounts"
      title="User Overview"
      action={
        <Link to="/admin/users" className={cardActionClass}>
          View all
          <FiArrowRight size={13} />
        </Link>
      }
    >
      <dl className="grid grid-cols-3 gap-x-6 gap-y-5">
        <StatTile label="Total Users" value={users.length} />
        <StatTile label="Customers" value={customers} />
        <StatTile label="Admins" value={admins} />
      </dl>
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 5. Recent Inquiries                                                 */
/* ------------------------------------------------------------------ */

const statusStyles = {
  New: 'bg-terracotta/15 text-terracotta-dark',
  Contacted: 'bg-sage/20 text-plum',
  Resolved: 'bg-stone text-plum/60',
}

function RecentInquiries({ inquiries }) {
  const recent = inquiries.slice(0, 5)

  return (
    <DashboardCard
      eyebrow="Enquiries"
      title="Recent Inquiries"
      className="h-full"
      action={
        <Link to="/admin/inquiries" className={cardActionClass}>
          View all
          <FiArrowRight size={13} />
        </Link>
      }
    >
      {recent.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-10 text-center">
          <FiMessageSquare size={20} className="text-plum/35" />
          <p className="max-w-[240px] text-sm leading-relaxed text-plum/60">
            No inquiries have been submitted yet. New enquiries from the site will appear here.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-stone">
          {recent.map((inquiry) => (
            <li key={inquiry.id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div className="min-w-0">
                <p className="truncate font-display text-base text-plum">{inquiry.name}</p>
                <p className="mt-0.5 truncate text-plum/50">
                  {inquiry.type}
                  {inquiry.property ? ` · ${inquiry.property}` : ''}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] tracking-wide ${statusStyles[inquiry.status]}`}
              >
                {inquiry.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardCard>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Quick Management                                                 */
/* ------------------------------------------------------------------ */

const quickActions = [
  { label: 'Manage Properties', to: '/admin/properties', icon: FiHome },
  { label: 'Manage Users', to: '/admin/users', icon: FiUsers },
  { label: 'View Inquiries', to: '/admin/inquiries', icon: FiMessageSquare },
  { label: 'View Website', to: '/', icon: FiExternalLink },
]

function QuickManagement() {
  return (
    <DashboardCard eyebrow="Shortcuts" title="Quick Management">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

/* ------------------------------------------------------------------ */

function AdminDashboard() {
  const { user } = useAuth()
  const properties = useProperties()
  const users = useAllUsers()
  const inquiries = useInquiries()

  return (
    <RequireAdmin>
      {user && (
        <AdminShell pageTitle="Overview">
          {/* 1. Admin Header */}
          <AdminHeader name={user.name} />

          {/* 2. Property Overview */}
          <PropertyOverview properties={properties} />

          {/* 3. Recent Properties */}
          <RecentProperties properties={properties} />

          {/* 4. User Overview */}
          <UserOverview users={users} />

          {/* 5. Recent Inquiries */}
          <RecentInquiries inquiries={inquiries} />

          {/* 6. Quick Management */}
          <QuickManagement />
        </AdminShell>
      )}
    </RequireAdmin>
  )
}

export default AdminDashboard
