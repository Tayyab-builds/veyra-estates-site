import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import Button from './Button.jsx'
import { addInquiry } from '../data/inquiryStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

export const inquiryTypes = ['Buying', 'Selling', 'Renting', 'Private / Off-Market', 'General Enquiry']

const initialValues = {
  name: '',
  email: '',
  phone: '',
  inquiryType: 'General Enquiry',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Shared field-surface styling so every control in the form — input,
 * select, textarea — responds to focus and error state the same way.
 * A quiet background wash + border-color transition reads as a
 * considered surface rather than a bare HTML control; the error state
 * pairs a border-color change with an explicit message below (never
 * color alone).
 */
function fieldClasses(hasError) {
  return [
    'w-full border bg-ivory/[0.04] px-4 py-3.5 text-ivory placeholder:text-ivory/35',
    'transition-colors duration-300 ease-editorial',
    'focus:bg-ivory/[0.07] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-terracotta-light/70',
    hasError
      ? 'border-terracotta-light/70'
      : 'border-ivory/20 hover:border-ivory/30 focus:border-terracotta-light/50',
  ].join(' ')
}

/**
 * Dedicated Contact-page form. Mirrors InquiryForm's controlled-state,
 * validation and success-state pattern, but with fields suited to a
 * standalone contact inquiry (adds Inquiry Type, drops the property tie-in).
 * Frontend-only — nothing is sent anywhere.
 *
 * `presetInquiryType` optionally lets another section on the page (e.g. the
 * "What Can We Help With" topics) set the Inquiry Type from outside. Pass an
 * object shaped like `{ type, token }` — bump `token` any time `type` should
 * be re-applied, even if it repeats the current value.
 */
function ContactForm({ presetInquiryType }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!presetInquiryType?.type) return
    setValues((prev) => ({ ...prev, inquiryType: presetInquiryType.type }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetInquiryType?.token])

  const update = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!emailPattern.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!values.message.trim()) {
      next.message = 'Please add a short message.'
    } else if (values.message.trim().length < 10) {
      next.message = 'Please add a little more detail so we can help.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Frontend-only demo — nothing is sent to a server, but the inquiry is
    // recorded locally so it shows up in the admin inquiries list. A brief
    // pending state keeps the interaction feeling considered rather than
    // instantaneous.
    setSubmitting(true)
    window.setTimeout(() => {
      addInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        property: null,
        type: values.inquiryType,
        message: values.message.trim(),
      })
      setSubmitting(false)
      setSubmitted(true)
    }, 600)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeEditorial }}
        role="status"
        className="flex flex-col items-center gap-3 border border-ivory/15 bg-ivory/[0.03] px-6 py-14 text-center sm:px-10"
      >
        <FiCheckCircle size={28} className="text-terracotta-light" aria-hidden="true" />
        <p className="font-display text-2xl text-ivory">Thank you, {values.name.split(' ')[0]}.</p>
        <p className="max-w-sm text-sm leading-relaxed text-ivory/60">
          Your message has been recorded for this demo. On a live site, a Veyra advisor would
          respond within one business day regarding your {values.inquiryType.toLowerCase()} enquiry.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialValues)
            setSubmitted(false)
          }}
          className="mt-2 text-sm text-ivory/60 underline underline-offset-4 transition-colors duration-300 hover:text-ivory"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 border border-ivory/12 bg-ivory/[0.03] p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="group flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm text-ivory/65 transition-colors duration-300 group-focus-within:text-ivory/90"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={fieldClasses(Boolean(errors.name))}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="text-xs text-terracotta-light">
              {errors.name}
            </p>
          )}
        </div>

        <div className="group flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-sm text-ivory/65 transition-colors duration-300 group-focus-within:text-ivory/90"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={fieldClasses(Boolean(errors.email))}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="text-xs text-terracotta-light">
              {errors.email}
            </p>
          )}
        </div>

        <div className="group flex flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="text-sm text-ivory/65 transition-colors duration-300 group-focus-within:text-ivory/90"
          >
            Phone <span className="text-ivory/40">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            className={fieldClasses(false)}
            placeholder="+1 (000) 000-0000"
          />
        </div>

        <div className="group flex flex-col gap-1.5">
          <label
            htmlFor="contact-inquiry-type"
            className="text-sm text-ivory/65 transition-colors duration-300 group-focus-within:text-ivory/90"
          >
            Inquiry Type
          </label>
          <select
            id="contact-inquiry-type"
            value={values.inquiryType}
            onChange={update('inquiryType')}
            className={`${fieldClasses(false)} cursor-pointer`}
          >
            {inquiryTypes.map((type) => (
              <option key={type} className="text-plum" value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="group flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-sm text-ivory/65 transition-colors duration-300 group-focus-within:text-ivory/90"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`resize-none ${fieldClasses(Boolean(errors.message))}`}
          placeholder="Tell us a little about what you're looking for..."
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-xs text-terracotta-light">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="light"
        disabled={submitting}
        className="mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-fit"
      >
        {submitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}

export default ContactForm
