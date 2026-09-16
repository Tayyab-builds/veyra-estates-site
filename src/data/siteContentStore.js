import { useEffect, useState } from 'react'
import { defaultSiteContent, pageContentSchema } from './siteContent.js'

// Frontend-only admin persistence layer for the small set of public-page
// text fields defined in `siteContent.js`. Mirrors the exact pattern
// `propertyStore.js` already uses for property edits — a single
// localStorage-backed overrides object, merged over the static defaults on
// read, with a listener set so components re-render when Developer Mode
// saves a change. This is the "one coherent content-store approach" the
// public pages and the `/admin/developer` editor both read from; nothing
// here duplicates content into individual components' own localStorage
// keys.
const OVERRIDES_KEY = 'veyra:siteContentOverrides'

function readJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : fallback
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable (private mode, etc.) — change just won't persist.
  }
}

function readOverrides() {
  const value = readJSON(OVERRIDES_KEY, {})
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

// The set of fields each page is actually allowed to store, derived from
// the schema — keeps a stray/renamed key from a stale localStorage value
// leaking into the effective content.
const allowedFieldsByPage = Object.fromEntries(
  pageContentSchema.map((page) => [page.key, new Set(page.fields.map((field) => field.key))]),
)

let overrides = readOverrides()
let effectiveContent = computeEffective()
const listeners = new Set()

function computeEffective() {
  const next = {}
  for (const pageKey of Object.keys(defaultSiteContent)) {
    next[pageKey] = { ...defaultSiteContent[pageKey], ...(overrides[pageKey] ?? {}) }
  }
  return next
}

function notify() {
  effectiveContent = computeEffective()
  listeners.forEach((listener) => listener(effectiveContent))
}

/** Current, admin-edited-aware content for one page (snapshot, not reactive). */
export function getSiteContent(pageKey) {
  return effectiveContent[pageKey] ?? defaultSiteContent[pageKey] ?? {}
}

/** True if this page has any saved overrides. */
export function isSiteContentEdited(pageKey) {
  const pageOverrides = overrides[pageKey]
  return Boolean(pageOverrides && Object.keys(pageOverrides).length > 0)
}

/**
 * Save a partial edit for a page's content. Only fields declared in that
 * page's schema are accepted, so Developer Mode can never introduce a field
 * the public site doesn't already know how to read.
 */
export function updateSiteContent(pageKey, fields) {
  const allowed = allowedFieldsByPage[pageKey]
  if (!allowed) return
  const clean = {}
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      clean[key] = fields[key]
    }
  }
  const next = { ...overrides, [pageKey]: { ...overrides[pageKey], ...clean } }
  overrides = next
  writeJSON(OVERRIDES_KEY, overrides)
  notify()
}

/** Clears a page's saved overrides, restoring its default source content. */
export function resetSiteContent(pageKey) {
  if (!overrides[pageKey]) return
  const next = { ...overrides }
  delete next[pageKey]
  overrides = next
  writeJSON(OVERRIDES_KEY, overrides)
  notify()
}

/** Reactive, always-current content for one page — used by public pages. */
export function useSiteContent(pageKey) {
  const [content, setContent] = useState(() => getSiteContent(pageKey))

  useEffect(() => {
    const listener = (next) => setContent(next[pageKey] ?? defaultSiteContent[pageKey] ?? {})
    listeners.add(listener)
    // Re-sync in case `pageKey` changed between renders.
    setContent(getSiteContent(pageKey))
    return () => listeners.delete(listener)
  }, [pageKey])

  return content
}
