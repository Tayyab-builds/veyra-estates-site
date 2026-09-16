import { useEffect, useState } from 'react'

// Frontend-only mock inquiry records, in the same spirit as `useAuth.js`
// and `useFavorites.js` — no backend, everything lives in localStorage.
//
// Records are created by the site's existing forms (`InquiryForm` on a
// property page, `ContactForm` on /contact, `ViewingModal` on a property
// page) at the point they already show their own "Thank you" success
// state, so admin sees genuine visitor activity rather than invented data.
const STORAGE_KEY = 'veyra:inquiries'

export const INQUIRY_STATUSES = ['New', 'Contacted', 'Resolved']

function readStored() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries))
  } catch {
    // localStorage unavailable (private mode, etc.) — record just won't persist.
  }
}

let inquiries = readStored()
const listeners = new Set()

function notify() {
  persist()
  listeners.forEach((listener) => listener(inquiries))
}

function makeId() {
  return `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Record a new inquiry. `type` is a free label describing where it came
 * from — e.g. 'Property Inquiry', 'Viewing Request', or one of
 * `ContactForm`'s `inquiryTypes`. `property` is the property name (or
 * null for a general contact-page inquiry not tied to a listing).
 */
export function addInquiry({ name, email, phone = '', property = null, type, message = '' }) {
  const record = {
    id: makeId(),
    name,
    email,
    phone,
    property,
    type,
    message,
    date: new Date().toISOString(),
    status: 'New',
  }
  inquiries = [record, ...inquiries]
  notify()
  return record
}

export function updateInquiryStatus(id, status) {
  if (!INQUIRY_STATUSES.includes(status)) return
  inquiries = inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status } : inquiry))
  notify()
}

export function getInquiries() {
  return inquiries
}

/** Reactive, always-current inquiry list — used by the admin inquiries page. */
export function useInquiries() {
  const [list, setList] = useState(inquiries)

  useEffect(() => {
    const listener = (next) => setList(next)
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  return list
}
