import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import Button from '../Button.jsx'
import { propertyTypes, purposes } from '../../data/filterOptions.js'

const easeEditorial = [0.22, 1, 0.36, 1]

const categoryOptions = propertyTypes.filter((type) => type !== 'Any Type')
const purposeOptions = purposes.filter((p) => p !== 'Any')
const availabilityOptions = ['Available Now', 'Under Offer', 'Sold', 'Off Market']

const fieldClass =
  'w-full border border-stone bg-parchment/40 px-3.5 py-2.5 text-sm text-plum placeholder:text-plum/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive'
const labelClass = 'text-[0.7rem] uppercase tracking-[0.1em] text-plum/50'

const blankProperty = {
  name: '',
  price: '',
  location: '',
  category: categoryOptions[0],
  purpose: purposeOptions[0],
  beds: 0,
  baths: 0,
  availability: availabilityOptions[0],
  description: '',
  image: '',
  areaValue: '',
}

function toValues(property, mode) {
  return {
    name: property.name ?? '',
    price: property.price ?? '',
    location: property.location ?? '',
    category: property.category ?? categoryOptions[0],
    purpose: property.purpose ?? purposeOptions[0],
    beds: property.beds ?? 0,
    baths: property.baths ?? 0,
    availability: property.availability ?? availabilityOptions[0],
    description: property.description ?? '',
    // Image and area are only ever collected for a brand-new property —
    // the edit form intentionally doesn't expose them (see
    // `EDITABLE_PROPERTY_FIELDS`), so for edit mode these are unused.
    image: mode === 'create' ? property.image ?? '' : '',
    areaValue: mode === 'create' ? property.areaValue ?? '' : '',
  }
}

/**
 * Reusable create/edit form for a single property. Only exposes fields
 * already supported by the public property system (see
 * `EDITABLE_PROPERTY_FIELDS` and `createProperty` in `propertyStore.js`) —
 * nothing here can introduce data the rest of the site doesn't know how to
 * display. `mode="edit"` (default) matches the original edit-only form;
 * `mode="create"` additionally collects the main image and square footage a
 * brand-new listing needs but an edit never touches.
 */
function PropertyEditModal({ property, mode = 'edit', open, onClose, onSave }) {
  const isCreate = mode === 'create'
  const [values, setValues] = useState(() => toValues(property ?? blankProperty, mode))
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setValues(toValues(property ?? blankProperty, mode))
      setErrors({})
    }
  }, [property, mode, open])

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

  const update = (field) => (e) => {
    const value = e.target.value
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Title is required.'
    if (!values.price.toString().trim()) next.price = 'Price is required.'
    if (!values.location.trim()) next.location = 'Location is required.'
    if (values.beds === '' || Number(values.beds) < 0) next.beds = 'Enter a valid number.'
    if (values.baths === '' || Number(values.baths) < 0) next.baths = 'Enter a valid number.'
    if (isCreate) {
      if (!values.image.trim()) next.image = 'Main image URL is required.'
      if (values.areaValue === '' || Number(values.areaValue) <= 0) {
        next.areaValue = 'Enter a valid square footage.'
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSave({
      ...values,
      name: values.name.trim(),
      price: values.price.toString().trim(),
      location: values.location.trim(),
      description: values.description.trim(),
      beds: Number(values.beds),
      baths: Number(values.baths),
      ...(isCreate
        ? { image: values.image.trim(), areaValue: Number(values.areaValue) }
        : {}),
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-property-title"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: easeEditorial }}
            className="relative flex max-h-[85vh] w-full max-w-xl flex-col border border-stone bg-ivory shadow-[0_25px_60px_-20px_rgba(40,37,34,0.4)]"
          >
            <div className="flex items-center justify-between border-b border-stone px-6 py-5 sm:px-7">
              <h2 id="edit-property-title" className="font-display text-xl text-plum">
                {isCreate ? 'Add Property' : 'Edit Property'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center text-plum/50 transition-colors duration-300 hover:text-plum"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto px-6 py-6 sm:px-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="edit-name" className={labelClass}>
                    Title
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    value={values.name}
                    onChange={update('name')}
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass}
                  />
                  {errors.name && <p className="text-xs text-terracotta-dark">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-price" className={labelClass}>
                    Price
                  </label>
                  <input
                    id="edit-price"
                    type="text"
                    value={values.price}
                    onChange={update('price')}
                    aria-invalid={Boolean(errors.price)}
                    placeholder="$0 or $0/month"
                    className={fieldClass}
                  />
                  {errors.price && <p className="text-xs text-terracotta-dark">{errors.price}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-location" className={labelClass}>
                    Location
                  </label>
                  <input
                    id="edit-location"
                    type="text"
                    value={values.location}
                    onChange={update('location')}
                    aria-invalid={Boolean(errors.location)}
                    className={fieldClass}
                  />
                  {errors.location && <p className="text-xs text-terracotta-dark">{errors.location}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-category" className={labelClass}>
                    Property Type
                  </label>
                  <select id="edit-category" value={values.category} onChange={update('category')} className={fieldClass}>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-purpose" className={labelClass}>
                    Purpose
                  </label>
                  <select id="edit-purpose" value={values.purpose} onChange={update('purpose')} className={fieldClass}>
                    {purposeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === 'Buy' ? 'For Sale' : 'For Rent'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-beds" className={labelClass}>
                    Bedrooms
                  </label>
                  <input
                    id="edit-beds"
                    type="number"
                    min="0"
                    value={values.beds}
                    onChange={update('beds')}
                    aria-invalid={Boolean(errors.beds)}
                    className={fieldClass}
                  />
                  {errors.beds && <p className="text-xs text-terracotta-dark">{errors.beds}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-baths" className={labelClass}>
                    Bathrooms
                  </label>
                  <input
                    id="edit-baths"
                    type="number"
                    min="0"
                    value={values.baths}
                    onChange={update('baths')}
                    aria-invalid={Boolean(errors.baths)}
                    className={fieldClass}
                  />
                  {errors.baths && <p className="text-xs text-terracotta-dark">{errors.baths}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="edit-status" className={labelClass}>
                    Status
                  </label>
                  <select
                    id="edit-status"
                    value={values.availability}
                    onChange={update('availability')}
                    className={fieldClass}
                  >
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {isCreate && (
                  <>
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label htmlFor="edit-image" className={labelClass}>
                        Main Image URL
                      </label>
                      <input
                        id="edit-image"
                        type="text"
                        value={values.image}
                        onChange={update('image')}
                        aria-invalid={Boolean(errors.image)}
                        placeholder="https://…"
                        className={fieldClass}
                      />
                      {errors.image && <p className="text-xs text-terracotta-dark">{errors.image}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="edit-area" className={labelClass}>
                        Area (sq ft)
                      </label>
                      <input
                        id="edit-area"
                        type="number"
                        min="0"
                        value={values.areaValue}
                        onChange={update('areaValue')}
                        aria-invalid={Boolean(errors.areaValue)}
                        className={fieldClass}
                      />
                      {errors.areaValue && (
                        <p className="text-xs text-terracotta-dark">{errors.areaValue}</p>
                      )}
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="edit-description" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    rows={4}
                    value={values.description}
                    onChange={update('description')}
                    className={`${fieldClass} resize-none`}
                  />
                </div>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-3 border-t border-stone px-6 py-5 sm:px-7">
              <Button type="button" variant="primary" onClick={handleSubmit} className="px-5 py-2.5 text-xs">
                {isCreate ? 'Create Property' : 'Save Changes'}
              </Button>
              <Button type="button" variant="secondary" onClick={onClose} className="px-5 py-2.5 text-xs">
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PropertyEditModal
