import { RouterProvider, usePathname } from './router.jsx'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import Rent from './pages/Rent.jsx'
import Buy from './pages/Buy.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import Agents from './pages/Agents.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Locations from './pages/Locations.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Favorites from './pages/Favorites.jsx'
import Account from './pages/Account.jsx'
import AccountReservations from './pages/AccountReservations.jsx'
import AccountProfile from './pages/AccountProfile.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProperties from './pages/admin/AdminProperties.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminInquiries from './pages/admin/AdminInquiries.jsx'
import AdminDeveloper from './pages/admin/AdminDeveloper.jsx'

function Routes() {
  const pathname = usePathname()

  if (pathname === '/login') {
    return <Login />
  }

  if (pathname === '/register') {
    return <Register />
  }

  if (pathname === '/properties') {
    return <Properties />
  }

  if (pathname === '/rent') {
    return <Rent />
  }

  if (pathname === '/buy') {
    return <Buy />
  }

  if (pathname.startsWith('/properties/')) {
    const id = decodeURIComponent(pathname.slice('/properties/'.length))
    return <PropertyDetails id={id} />
  }

  if (pathname === '/locations') {
    return <Locations />
  }

  if (pathname === '/agents') {
    return <Agents />
  }

  if (pathname === '/about') {
    return <About />
  }

  if (pathname === '/contact') {
    return <Contact />
  }

  if (pathname === '/favorites') {
    return <Favorites />
  }

  if (pathname === '/account/reservations') {
    return <AccountReservations />
  }

  if (pathname === '/account/profile') {
    return <AccountProfile />
  }

  if (pathname === '/account') {
    return <Account />
  }

  if (pathname === '/admin/dashboard') {
    return <AdminDashboard />
  }

  if (pathname === '/admin/properties') {
    return <AdminProperties />
  }

  if (pathname === '/admin/users') {
    return <AdminUsers />
  }

  if (pathname === '/admin/inquiries') {
    return <AdminInquiries />
  }

  if (pathname === '/admin/developer') {
    return <AdminDeveloper />
  }

  // Fallback to Home for '/' and any unknown path, so the app never
  // renders a blank screen in this frontend-only demo.
  return <Home />
}

function App() {
  return (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  )
}

export default App
