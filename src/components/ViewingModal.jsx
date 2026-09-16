import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiCheckCircle } from 'react-icons/fi'
import Button from './Button.jsx'
import { addInquiry } from '../data/inquiryStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const initialValues = { name: '', email: '', date: '', time: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ViewingModal({ open, onClose, propertyName }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setValues(initialValues)
      setErrors({})
      setSubmitted(false)
    }
  }, [open])

  const update = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim() || !emailPattern.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!values.date) next.date = 'Please choose a date.'
    if (!values.time) next.time = 'Please choose a time.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // Frontend-only demo — nothing is sent to a server, but the request
      // is recorded locally so it shows up in the admin inquiries list.
      addInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        property: propertyName ?? null,
        type: 'Viewing Request',
        message: `Requested viewing on ${values.date} at ${values.time}.`,
      })
      setSubmitted(true)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Schedule a viewing for ${propertyName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-ivory p-6 sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-plum/60 transition-colors duration-300 hover:text-plum"
            >
              <FiX size={20} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
                <FiCheckCircle size={28} className="text-olive" />
                <p className="font-display text-xl text-plum">Viewing requested.</p>
                <p className="max-w-xs text-sm leading-relaxed text-plum/60">
                  This viewing request for {propertyName} has been recorded for this demo. No booking has actually
                  been made.
                </p>
                <Button variant="secondary" className="mt-2" onClick={onClose}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-plum/45">Schedule a Viewing</p>
                <h3 className="mt-2 font-display text-2xl text-plum">{propertyName}</h3>

                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="viewing-name" className="text-sm text-plum/70">
                      Name
                    </label>
                    <input
                      id="viewing-name"
                      type="text"
                      value={values.name}
                      onChange={update('name')}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      className="border border-plum/20 bg-transparent px-4 py-3 text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                    />
                    {errors.name && <p className="text-xs text-terracotta-dark">{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="viewing-email" className="text-sm text-plum/70">
                      Email
                    </label>
                    <input
                      id="viewing-email"
                      type="email"
                      value={values.email}
                      onChange={update('email')}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      className="border border-plum/20 bg-transparent px-4 py-3 text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                    />
                    {errors.email && <p className="text-xs text-terracotta-dark">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="viewing-date" className="text-sm text-plum/70">
                        Preferred Date
                      </label>
                      <input
                        id="viewing-date"
                        type="date"
                        value={values.date}
                        onChange={update('date')}
                        aria-invalid={Boolean(errors.date)}
                        className="border border-plum/20 bg-transparent px-3 py-3 text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                      />
                      {errors.date && <p className="text-xs text-terracotta-dark">{errors.date}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="viewing-time" className="text-sm text-plum/70">
                        Preferred Time
                      </label>
                      <input
                        id="viewing-time"
                        type="time"
                        value={values.time}
                        onChange={update('time')}
                        aria-invalid={Boolean(errors.time)}
                        className="border border-plum/20 bg-transparent px-3 py-3 text-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                      />
                      {errors.time && <p className="text-xs text-terracotta-dark">{errors.time}</p>}
                    </div>
                  </div>

                  <Button type="submit" variant="primary" className="mt-2">
                    Request Viewing
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ViewingModal
