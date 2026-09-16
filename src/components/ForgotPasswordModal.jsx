import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiCheckCircle, FiMail, FiAlertCircle } from 'react-icons/fi'
import Button from './Button.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Frontend-only "forgot password" interaction. There is no real reset
 * system in this demo, so this simply acknowledges the request — nothing
 * is submitted anywhere.
 */
function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
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
      setEmail('')
      setError('')
      setSubmitted(false)
    }
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Reset your password"
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
            className="relative w-full max-w-md border border-plum/10 bg-ivory p-6 sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-plum/60 transition-all duration-200 ease-editorial hover:bg-plum/5 hover:text-plum active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
            >
              <FiX size={20} />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center" role="status">
                <span className="flex h-12 w-12 items-center justify-center border border-accent/40 text-accent-dark">
                  <FiCheckCircle size={20} aria-hidden="true" />
                </span>
                <p className="font-display text-xl text-plum">Request received.</p>
                <p className="max-w-xs text-sm leading-relaxed text-plum/70">
                  This is a frontend demo, so no email has actually been sent. In the full
                  product, reset instructions for {email.trim()} would arrive shortly.
                </p>
                <Button variant="secondary" className="mt-2" onClick={onClose}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-plum/70">
                  Forgot Password
                </p>
                <h3 className="mt-2 font-display text-2xl text-plum">Reset your password</h3>
                <p className="mt-3 text-sm leading-relaxed text-plum/70">
                  Enter the email associated with your account. This demo doesn't send real
                  emails, but the interaction works the way it would in the full product.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                  <div className="group flex flex-col gap-1.5">
                    <label
                      htmlFor="forgot-email"
                      className="text-[0.8rem] font-medium tracking-wide text-plum/75 transition-colors duration-200 group-focus-within:text-plum"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <FiMail
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-plum/45 transition-colors duration-200 group-focus-within:text-accent-dark"
                      />
                      <input
                        id="forgot-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError('')
                        }}
                        autoComplete="email"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'forgot-email-error' : undefined}
                        className="w-full border border-plum/20 bg-plum/[0.03] py-3.5 pl-11 pr-4 text-plum placeholder:text-plum/45 transition-colors duration-200 ease-editorial hover:border-plum/30 focus:border-accent/70 focus:bg-plum/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
                      />
                    </div>
                    {error && (
                      <p
                        id="forgot-email-error"
                        role="alert"
                        className="flex items-start gap-1.5 text-[0.78rem] leading-relaxed text-clay-dark"
                      >
                        <FiAlertCircle size={13} aria-hidden="true" className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-2 w-full justify-center sm:w-auto"
                  >
                    Send Reset Link
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

export default ForgotPasswordModal
