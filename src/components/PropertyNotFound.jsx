import { motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Button from './Button.jsx'
import { Link } from '../router.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <main>
        <section className="flex min-h-[80vh] items-center py-32">
          <div className="container-veyra flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeEditorial }}
              className="text-[0.7rem] uppercase tracking-[0.14em] text-plum/45"
            >
              404
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: easeEditorial }}
              className="mt-4 font-display text-4xl text-plum sm:text-5xl"
            >
              Property Not Found
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeEditorial }}
              className="mt-5 max-w-md text-plum/60"
            >
              The residence you're looking for may have been removed or is no longer available in this demo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: easeEditorial }}
              className="mt-9"
            >
              <Button as={Link} to="/properties" variant="primary">
                Back to Properties
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default PropertyNotFound
