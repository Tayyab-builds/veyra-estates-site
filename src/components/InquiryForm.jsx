import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import Button from './Button.jsx'
import { addInquiry } from '../data/inquiryStore.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const initialValues = {
  name: '',
  email: '',
  phone: '',
  contactMethod: 'Email',
  message: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function InquiryForm({ propertyName }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

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
    if (!values.message.trim()) next.message = 'Please add a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Frontend-only demo — nothing is sent to a server, but the inquiry is
    // recorded locally so it shows up in the admin inquiries list.
    addInquiry({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      property: propertyName ?? null,
      type: 'Property Inquiry',
      message: values.message.trim(),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeEditorial }}
        role="status"
        className="flex flex-col items-center gap-3 border border-stone bg-ivory px-6 py-14 text-center sm:px-10"
      >
        <FiCheckCircle size={30} className="text-olive" />
        <p className="font-display text-2xl text-plum">Thank you.</p>
        <p className="max-w-sm text-sm leading-relaxed text-plum/60">
          Your inquiry has been recorded for this demo. In a live site, a Veyra advisor would follow up shortly
          regarding {propertyName}.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(initialValues)
            setSubmitted(false)
          }}
          className="mt-2 text-sm text-plum/60 underline underline-offset-4 transition-colors duration-300 hover:text-plum"
        >
          Send another inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-name" className="text-sm text-ivory/75">
            Name
          </label>
          <input
            id="inquiry-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            className="border border-ivory/25 bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-light"
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="inquiry-name-error" className="text-xs text-terracotta-light">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-email" className="text-sm text-ivory/75">
            Email
          </label>
          <input
            id="inquiry-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            className="border border-ivory/25 bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-light"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="inquiry-email-error" className="text-xs text-terracotta-light">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-phone" className="text-sm text-ivory/75">
            Phone <span className="text-ivory/40">(optional)</span>
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            className="border border-ivory/25 bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-light"
            placeholder="+1 (000) 000-0000"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="inquiry-contact" className="text-sm text-ivory/75">
            Preferred Contact Method
          </label>
          <select
            id="inquiry-contact"
            value={values.contactMethod}
            onChange={update('contactMethod')}
            className="border border-ivory/25 bg-transparent px-4 py-3 text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-light"
          >
            <option className="text-plum" value="Email">
              Email
            </option>
            <option className="text-plum" value="Phone">
              Phone
            </option>
            <option className="text-plum" value="Either">
              Either
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry-message" className="text-sm text-ivory/75">
          Message
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          className="resize-none border border-ivory/25 bg-transparent px-4 py-3 text-ivory placeholder:text-ivory/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-light"
          placeholder={`I'm interested in ${propertyName}...`}
        />
        {errors.message && (
          <p id="inquiry-message-error" className="text-xs text-terracotta-light">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="light" className="mt-1 w-fit">
        Send Inquiry
      </Button>
    </form>
  )
}

export default InquiryForm
