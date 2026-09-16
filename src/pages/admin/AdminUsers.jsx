import { FiUsers, FiShield, FiUser } from 'react-icons/fi'
import { useAllUsers } from '../../hooks/useAuth.js'
import RequireAdmin from '../../components/dashboard/RequireAdmin.jsx'
import AdminShell from '../../components/admin/AdminShell.jsx'
import DashboardCard from '../../components/dashboard/DashboardCard.jsx'

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return '—'
  }
}

function RoleBadge({ role }) {
  const isAdmin = role === 'admin'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] tracking-wide ${
        isAdmin ? 'bg-aubergine/15 text-aubergine' : 'bg-sage/20 text-plum'
      }`}
    >
      {isAdmin ? <FiShield size={11} /> : <FiUser size={11} />}
      {isAdmin ? 'Admin' : 'Customer'}
    </span>
  )
}

function UserRow({ user }) {
  return (
    <li className="flex flex-col gap-3 border-t border-stone py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="truncate font-display text-base text-plum">{user.name}</p>
        <p className="mt-0.5 truncate text-sm text-plum/55">{user.email}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-plum/60">
        <RoleBadge role={user.role} />
        <span className="inline-flex items-center gap-1.5 text-plum/60">
          <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
          Active
        </span>
        <span className="text-[0.8rem] text-plum/45">
          {user.createdAt ? `Joined ${formatDate(user.createdAt)}` : 'Demo account'}
        </span>
      </div>
    </li>
  )
}

function AdminUsers() {
  const users = useAllUsers()

  return (
    <RequireAdmin>
      <AdminShell pageTitle="Users">
        <section className="border border-stone bg-ivory p-6 sm:p-8 lg:p-10">
          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">Accounts</p>
          <h1 className="mt-2 font-display text-3xl leading-[1.1] text-plum sm:text-4xl">Users</h1>
          <p className="mt-3 max-w-lg leading-relaxed text-plum/60">
            Everyone with an account on the site — the built-in demo accounts, plus anyone who has
            registered through the public sign-up form. Passwords and other credentials are never
            shown here.
          </p>
        </section>

        <DashboardCard eyebrow={`${users.length} Users`} title="All Users">
          {users.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-14 text-center">
              <FiUsers size={22} className="text-plum/35" />
              <p className="max-w-sm text-sm leading-relaxed text-plum/60">No accounts exist yet.</p>
            </div>
          ) : (
            <ul>
              {users.map((user) => (
                <UserRow key={user.email} user={user} />
              ))}
            </ul>
          )}
        </DashboardCard>
      </AdminShell>
    </RequireAdmin>
  )
}

export default AdminUsers
