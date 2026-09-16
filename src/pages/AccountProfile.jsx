import { FiUser, FiMail, FiPhone, FiShield } from 'react-icons/fi'
import { useAuth } from '../hooks/useAuth.js'
import RequireCustomer from '../components/dashboard/RequireCustomer.jsx'
import DashboardShell from '../components/dashboard/DashboardShell.jsx'
import DashboardCard from '../components/dashboard/DashboardCard.jsx'

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stone py-4 first:pt-0 last:border-none last:pb-0">
      <div className="flex shrink-0 items-center gap-3 text-plum/55">
        <Icon size={15} className="shrink-0" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="min-w-0 flex-1 truncate text-right text-sm text-plum">{value}</span>
    </div>
  )
}

function AccountProfile() {
  const { user } = useAuth()

  return (
    <RequireCustomer>
      {user && (
        <DashboardShell pageTitle="Profile">
          <DashboardCard eyebrow="Account" title="Profile">
            <div className="flex flex-col">
              <ProfileRow icon={FiUser} label="Name" value={user.name} />
              <ProfileRow icon={FiMail} label="Email" value={user.email} />
              {user.phone && <ProfileRow icon={FiPhone} label="Phone" value={user.phone} />}
              <ProfileRow icon={FiShield} label="Account Status" value="Active customer account" />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-plum/50">
              This is a frontend demo — details shown here come from the demo account you signed in
              with. To update them, reach out to your Veyra agent.
            </p>
          </DashboardCard>
        </DashboardShell>
      )}
    </RequireCustomer>
  )
}

export default AccountProfile
