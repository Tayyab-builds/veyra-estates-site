import { FiCalendar } from 'react-icons/fi'
import { Link } from '../router.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useInquiries } from '../data/inquiryStore.js'
import RequireCustomer from '../components/dashboard/RequireCustomer.jsx'
import DashboardShell from '../components/dashboard/DashboardShell.jsx'
import DashboardCard from '../components/dashboard/DashboardCard.jsx'
import Button from '../components/Button.jsx'

// Kept in sync with `statusSelectStyles` in `pages/admin/AdminInquiries.jsx`
// so a reservation's status reads the same color here as it does for the
// admin reviewing it — just presented as a read-only badge, since a
// customer doesn't get to change their own inquiry status.
const statusBadgeStyles = {
  New: 'border-terracotta/40 text-terracotta-dark',
  Contacted: 'border-sage/50 text-plum',
  Resolved: 'border-stone text-plum/60',
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

/**
 * A "reservation" is a Viewing Request inquiry (see `ViewingModal.jsx`)
 * submitted under the signed-in customer's own email — matched
 * case-insensitively, since the modal doesn't force-match the form's email
 * field to the account's stored casing. Reuses the existing `inquiryStore`
 * rather than inventing a separate reservations/bookings store.
 */
function useMyReservations() {
  const { user } = useAuth()
  const inquiries = useInquiries()
  const email = user?.email?.toLowerCase()

  return inquiries.filter(
    (inquiry) => inquiry.type === 'Viewing Request' && inquiry.email.toLowerCase() === email,
  )
}

function ReservationRow({ reservation }) {
  return (
    <li className="flex flex-col gap-2 border-t border-stone py-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {reservation.property && (
            <p className="font-display text-base text-plum">{reservation.property}</p>
          )}
          <span className="text-[0.75rem] text-plum/45">Requested {formatDate(reservation.date)}</span>
        </div>
        {reservation.message && (
          <p className="mt-1 text-sm leading-relaxed text-plum/65">{reservation.message}</p>
        )}
      </div>
      <span
        className={`inline-flex shrink-0 items-center border px-3 py-1.5 text-[0.75rem] tracking-wide ${
          statusBadgeStyles[reservation.status] ?? 'border-stone text-plum/60'
        }`}
      >
        {reservation.status}
      </span>
    </li>
  )
}

function AccountReservations() {
  const reservations = useMyReservations()

  return (
    <RequireCustomer>
      <DashboardShell pageTitle="My Reservations">
        <DashboardCard eyebrow="Viewings" title="My Reservations">
          {reservations.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-16 text-center sm:py-20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-stone bg-parchment">
                <FiCalendar size={22} className="text-plum/40" />
              </div>
              <h3 className="mt-1 font-display text-xl text-plum">No Reservations Yet</h3>
              <p className="max-w-sm text-sm leading-relaxed text-plum/60">
                When you request a viewing on a property page, it will be recorded here for this
                demo.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button as={Link} to="/properties" variant="primary" className="px-6 py-3 text-sm">
                  Browse Properties
                </Button>
                <Button as={Link} to="/contact" variant="secondary" className="px-6 py-3 text-sm">
                  Contact an Agent
                </Button>
              </div>
            </div>
          ) : (
            <ul>
              {reservations.map((reservation) => (
                <ReservationRow key={reservation.id} reservation={reservation} />
              ))}
            </ul>
          )}
        </DashboardCard>
      </DashboardShell>
    </RequireCustomer>
  )
}

export default AccountReservations
