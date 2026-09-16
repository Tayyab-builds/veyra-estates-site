import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertTriangle, FiX } from 'react-icons/fi'
import Button from '../Button.jsx'

const easeEditorial = [0.22, 1, 0.36, 1]

/**
 * Small modal used to require an explicit confirmation before a
 * destructive admin action (currently: deleting a property). Kept
 * generic so it isn't tied to properties specifically.
 */
function ConfirmDialog({ open, title, description, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onCancel])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={onCancel}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeEditorial }}
            className="relative w-full max-w-sm border border-stone bg-ivory p-6 shadow-[0_25px_60px_-20px_rgba(40,37,34,0.4)] sm:p-7"
          >
            <button
              type="button"
              onClick={onCancel}
              aria-label="Cancel"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-plum/50 transition-colors duration-300 hover:text-plum"
            >
              <FiX size={18} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/15 text-terracotta-dark">
              <FiAlertTriangle size={18} />
            </div>

            <h2 id="confirm-dialog-title" className="mt-4 font-display text-xl text-plum">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-plum/60">{description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="primary"
                onClick={onConfirm}
                className="border-terracotta-dark bg-terracotta-dark px-5 py-2.5 text-xs hover:border-terracotta hover:bg-terracotta"
              >
                {confirmLabel}
              </Button>
              <Button type="button" variant="secondary" onClick={onCancel} className="px-5 py-2.5 text-xs">
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConfirmDialog
