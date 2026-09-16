import { FiMessageSquare } from 'react-icons/fi'
import { useInquiries, updateInquiryStatus, INQUIRY_STATUSES } from '../../data/inquiryStore.js'
import RequireAdmin from '../../components/dashboard/RequireAdmin.jsx'
import AdminShell from '../../components/admin/AdminShell.jsx'
import DashboardCard from '../../components/dashboard/DashboardCard.jsx'

const statusSelectStyles = {
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

function InquiryRow({ inquiry }) {
  return (
    <li className="flex flex-col gap-3 border-t border-stone py-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-display text-base text-plum">{inquiry.name}</p>
          <span className="text-[0.75rem] text-plum/45">{formatDate(inquiry.date)}</span>
        </div>
        <p className="mt-0.5 truncate text-sm text-plum/55">{inquiry.email}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] text-plum/60">
          <span>{inquiry.type}</span>
          {inquiry.property && <span>{inquiry.property}</span>}
        </div>
        {inquiry.message && (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-plum/65">{inquiry.message}</p>
        )}
      </div>

      <div className="shrink-0">
        <label className="sr-only" htmlFor={`status-${inquiry.id}`}>
          Status for inquiry from {inquiry.name}
        </label>
        <select
          id={`status-${inquiry.id}`}
          value={inquiry.status}
          onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
          className={`border bg-transparent px-3 py-2 text-[0.8rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
            statusSelectStyles[inquiry.status] ?? 'border-stone text-plum/60'
          }`}
        >
          {INQUIRY_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </li>
  )
}

function AdminInquiries() {
  const inquiries = useInquiries()

  return (
    <RequireAdmin>
      <AdminShell pageTitle="Inquiries">
        <section className="border border-stone bg-ivory p-6 sm:p-8 lg:p-10">
          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-plum/45">Enquiries</p>
          <h1 className="mt-2 font-display text-3xl leading-[1.1] text-plum sm:text-4xl">Inquiries</h1>
          <p className="mt-3 max-w-lg leading-relaxed text-plum/60">
            Property inquiries, viewing requests, and contact-page messages submitted through the
            site.
          </p>
        </section>

        <DashboardCard eyebrow={`${inquiries.length} Inquiries`} title="All Inquiries">
          {inquiries.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-dashed border-stone bg-parchment/60 px-5 py-14 text-center">
              <FiMessageSquare size={22} className="text-plum/35" />
              <p className="max-w-sm text-sm leading-relaxed text-plum/60">
                No inquiries yet. Messages sent through a property page, a viewing request, or the
                contact page will appear here.
              </p>
            </div>
          ) : (
            <ul>
              {inquiries.map((inquiry) => (
                <InquiryRow key={inquiry.id} inquiry={inquiry} />
              ))}
            </ul>
          )}
        </DashboardCard>
      </AdminShell>
    </RequireAdmin>
  )
}

export default AdminInquiries
