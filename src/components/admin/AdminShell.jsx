import Navbar from '../Navbar.jsx'
import Footer from '../Footer.jsx'
import AdminSidebar from './AdminSidebar.jsx'

/**
 * Shared shell for every page under `/admin`. Keeps the standard site
 * Navbar and Footer (so the admin area never feels like a separate app),
 * and lays the admin sidebar and page content out side by side on
 * desktop, stacked on mobile — the exact same layout contract as
 * `DashboardShell.jsx`, so every admin page reuses one shell rather than
 * each inventing its own.
 */
function AdminShell({ pageTitle, children }) {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <div className="pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
        <div className="container-veyra flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-10 xl:gap-14">
          <AdminSidebar pageTitle={pageTitle} />
          <main className="flex min-w-0 flex-col gap-6 sm:gap-8">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminShell
