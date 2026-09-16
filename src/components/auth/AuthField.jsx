import { motion, useReducedMotion } from 'framer-motion'
import { FiAlertCircle, FiEye, FiEyeOff, FiLoader, FiLock } from 'react-icons/fi'
import Button from '../Button.jsx'
import { DURATION, EASE_EDITORIAL } from '../motion/Reveal.jsx'

/**
 * Shared authentication form controls.
 *
 * Login and Register are two sides of one private-access experience, so the
 * field surface, focus treatment, validation state and submit state live
 * here once instead of being restyled per page. Behaviour is unchanged from
 * the original inline fields — the same controlled inputs, ids, label
 * associations and aria wiring — only expressed in one place.
 */

/** Warm panel that holds the auth forms on deep-ink sections. */
export const authPanelClasses =
  'border border-ivory/12 bg-ivory/[0.03] p-5 sm:p-8 lg:p-10'

/** Quiet secondary link treatment for the Log in / Create an account switch. */
export const authLinkClasses =
  'font-medium text-ivory underline decoration-ivory/40 decoration-1 underline-offset-4 transition-colors duration-200 ease-editorial hover:text-accent-light hover:decoration-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light'

/** Small label + hairline rule that heads each auth form. */
export function AuthFormHeader({ label }) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ivory/60">
        {label}
      </p>
      <span aria-hidden="true" className="h-px flex-1 bg-ivory/12" />
    </div>
  )
}

/**
 * One field surface for every control: a faint warm wash over the panel, a
 * hairline border, and a focus state that moves the border, the surface and
 * the leading icon together — no layout movement, no aggressive motion.
 */
function fieldSurface(hasError) {
  return [
    'w-full border bg-ivory/[0.04] py-3.5 text-[0.95rem] text-ivory placeholder:text-ivory/50',
    'transition-colors duration-200 ease-editorial',
    'focus:bg-ivory/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light',
    hasError
      ? 'border-clay-light/70'
      : 'border-ivory/15 hover:border-ivory/25 focus:border-accent-light/60',
  ].join(' ')
}

const labelClasses =
  'text-[0.8rem] font-medium tracking-wide text-ivory/70 transition-colors duration-200 group-focus-within:text-ivory/90'

const iconClasses =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ivory/45 transition-colors duration-200 group-focus-within:text-accent-light'

function describedBy(id, error, hint) {
  const ids = []
  if (error) ids.push(`${id}-error`)
  if (hint) ids.push(`${id}-hint`)
  return ids.length > 0 ? ids.join(' ') : undefined
}

/** Restrained error entrance — a short fade, never a shake. */
function FieldError({ id, message }) {
  const prefersReducedMotion = useReducedMotion()
  if (!message) return null

  return (
    <motion.p
      id={`${id}-error`}
      role="alert"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? DURATION.fast : DURATION.standard,
        ease: EASE_EDITORIAL,
      }}
      className="flex items-start gap-1.5 text-[0.78rem] leading-relaxed text-clay-light"
    >
      <FiAlertCircle size={13} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </motion.p>
  )
}

function FieldHint({ id, text }) {
  if (!text) return null
  return (
    <p id={`${id}-hint`} className="text-[0.78rem] leading-relaxed text-ivory/55">
      {text}
    </p>
  )
}

function AuthField({
  id,
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  error,
  hint,
  autoComplete,
  placeholder,
  inputMode,
  required = true,
  className = '',
}) {
  return (
    <div className={`group flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative">
        {Icon ? <Icon size={16} aria-hidden="true" className={iconClasses} /> : null}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          className={`${fieldSurface(Boolean(error))} ${Icon ? 'pl-11' : 'pl-4'} pr-4`}
          placeholder={placeholder}
        />
      </div>
      <FieldHint id={id} text={hint} />
      <FieldError id={id} message={error} />
    </div>
  )
}

function AuthPasswordField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  autoComplete,
  placeholder = '••••••••',
  show,
  onToggleShow,
  required = true,
  className = '',
}) {
  return (
    <div className={`group flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative">
        <FiLock size={16} aria-hidden="true" className={iconClasses} />
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          className={`${fieldSurface(Boolean(error))} pl-11 pr-14`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={show}
          aria-controls={id}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-ivory/55 transition-all duration-200 ease-editorial hover:bg-ivory/10 hover:text-ivory active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
        >
          {show ? <FiEyeOff size={17} /> : <FiEye size={17} />}
        </button>
      </div>
      <FieldHint id={id} text={hint} />
      <FieldError id={id} message={error} />
    </div>
  )
}

function AuthCheckbox({ id, checked, onChange, children, className = '' }) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-2.5 text-sm text-ivory/70 transition-colors duration-200 ease-editorial hover:text-ivory/90 ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
      />
      <span>{children}</span>
    </label>
  )
}

/**
 * Auth submit — the same tactile Button the rest of the site uses, with a
 * spinner that only occupies space while submitting (so the button never
 * changes width) and an aria-live label so the state is announced.
 */
function AuthSubmit({ loading, label, loadingLabel, className = '' }) {
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={loading}
      aria-busy={loading}
      className={`mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none sm:w-auto sm:min-w-[13rem] ${className}`}
    >
      <span className="inline-flex items-center justify-center gap-2.5">
        <FiLoader
          size={15}
          aria-hidden="true"
          className={`animate-spin ${loading ? '' : 'hidden'}`}
        />
        <span aria-live="polite">{loading ? loadingLabel : label}</span>
      </span>
    </Button>
  )
}

export { AuthField, AuthPasswordField, AuthCheckbox, AuthSubmit }
export default AuthField