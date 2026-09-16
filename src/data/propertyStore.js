import { useEffect, useState } from 'react'
import { properties as baseProperties, getRelatedProperties as baseGetRelatedProperties } from './properties.js'

// Frontend-only admin persistence layer for `src/data/properties.js`.
//
// `properties.js` exports a static, read-only demo fixture (`properties`),
// so it is never mutated directly. Admin edits, deletes, and now newly
// created properties are instead tracked here, in three small
// localStorage-backed values — a set of field overrides keyed by property
// id, a list of deleted ids, and a list of admin-created properties — which
// are merged over the base fixture on read. This keeps a single source of
// truth for the "real" property data while still letting the admin area
// persist changes across reloads, exactly like `useAuth.js` and
// `useFavorites.js` already do for their own state.
const OVERRIDES_KEY = 'veyra:propertyOverrides'
const DELETED_KEY = 'veyra:deletedPropertyIds'
const ADDED_KEY = 'veyra:addedProperties'

// Fields an admin is allowed to edit from `/admin/properties`. Kept in sync
// with what the public property system actually reads/displays — no field
// is introduced here that the rest of the app doesn't already use.
export const EDITABLE_PROPERTY_FIELDS = [
  'name',
  'price',
  'location',
  'category',
  'purpose',
  'beds',
  'baths',
  'description',
  'availability',
]

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

function readDeletedIds() {
  const value = readJSON(DELETED_KEY, [])
  return Array.isArray(value) ? value : []
}

function readAddedProperties() {
  const value = readJSON(ADDED_KEY, [])
  return Array.isArray(value) ? value : []
}

let overrides = readOverrides()
let deletedIds = readDeletedIds()
let addedProperties = readAddedProperties()
let effectiveProperties = computeEffective()
const listeners = new Set()

function computeEffective() {
  const deleted = new Set(deletedIds)
  return [...baseProperties, ...addedProperties]
    .filter((property) => !deleted.has(property.id))
    .map((property) => (overrides[property.id] ? { ...property, ...overrides[property.id] } : property))
}

function notify() {
  effectiveProperties = computeEffective()
  listeners.forEach((listener) => listener(effectiveProperties))
}

/** Current, admin-edited/deleted-aware property list (snapshot, not reactive). */
export function getProperties() {
  return effectiveProperties
}

export function getPropertyById(id) {
  return effectiveProperties.find((property) => property.id === id)
}

export function getRelatedProperties(property, limit = 3) {
  // Related properties are scored against the full base catalogue, then
  // filtered down to whatever's still live — keeps the "closest match"
  // ranking intact even if the very-closest match has been removed.
  const deleted = new Set(deletedIds)
  return baseGetRelatedProperties(property, baseProperties.length)
    .filter((candidate) => !deleted.has(candidate.id))
    .map((candidate) => getPropertyById(candidate.id))
    .filter(Boolean)
    .slice(0, limit)
}

/** True if this property has been edited from its original demo values. */
export function isPropertyEdited(id) {
  return Boolean(overrides[id])
}

/**
 * Save a partial edit for a property. Only fields in
 * `EDITABLE_PROPERTY_FIELDS` are accepted; anything else is ignored so the
 * admin form can never introduce a field the public site doesn't support.
 */
export function updateProperty(id, fields) {
  const next = { ...overrides }
  const clean = {}
  for (const key of EDITABLE_PROPERTY_FIELDS) {
    if (fields[key] !== undefined && fields[key] !== '') {
      clean[key] = fields[key]
    }
  }
  next[id] = { ...next[id], ...clean }
  overrides = next
  writeJSON(OVERRIDES_KEY, overrides)
  notify()
}

/** Remove a property from every public listing. Reversible only by clearing localStorage. */
export function deleteProperty(id) {
  if (deletedIds.includes(id)) return
  deletedIds = [...deletedIds, id]
  writeJSON(DELETED_KEY, deletedIds)
  notify()
}

export function isPropertyDeleted(id) {
  return deletedIds.includes(id)
}

/** True if this property was created from the admin area (not part of the original demo fixture). */
export function isPropertyAdded(id) {
  return addedProperties.some((property) => property.id === id)
}

function slugify(text) {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'property'
}

/** Guarantees a fresh id never collides with an existing, added, or previously-deleted one. */
function uniqueId(name) {
  const base = slugify(name)
  const taken = new Set([
    ...baseProperties.map((property) => property.id),
    ...addedProperties.map((property) => property.id),
    ...deletedIds,
  ])
  if (!taken.has(base)) return base
  let suffix = 2
  while (taken.has(`${base}-${suffix}`)) suffix += 1
  return `${base}-${suffix}`
}

/** Pulls the trailing "City, Country" out of a free-text location string. */
function parseLocationParts(location) {
  const parts = location
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length >= 2) {
    return { city: parts[parts.length - 2], country: parts[parts.length - 1] }
  }
  return { city: parts[0] ?? '', country: '' }
}

/** Extracts the leading numeric amount from a display price/area string. */
function parseNumeric(value) {
  const digits = String(value).replace(/[^0-9.]/g, '')
  const parsed = Number(digits)
  return Number.isFinite(parsed) ? parsed : 0
}

/**
 * Create a brand-new property from the admin "Add Property" form and add it
 * to the same live store the public site already reads from. Builds the
 * exact same shape `properties.js` produces for the built-in fixture
 * (including the detail-page enrichment fields, defaulted the same way
 * `properties.js` itself defaults them for listings with no extra detail
 * entry), so every existing page/component that reads a property works
 * against a created one without any special-casing.
 */
export function createProperty(fields) {
  const name = (fields.name ?? '').toString().trim()
  const price = (fields.price ?? '').toString().trim()
  const location = (fields.location ?? '').toString().trim()
  const description = (fields.description ?? '').toString().trim()
  const image = (fields.image ?? '').toString().trim()
  const beds = Number(fields.beds) || 0
  const baths = Number(fields.baths) || 0
  const areaValue = Number(fields.areaValue) || 0
  const { city, country } = parseLocationParts(location)

  const property = {
    id: uniqueId(name),
    name,
    location,
    city,
    country,
    type: fields.category,
    category: fields.category,
    purpose: fields.purpose,
    price,
    priceValue: parseNumeric(price),
    beds,
    baths,
    area: areaValue ? `${areaValue.toLocaleString()} sq ft` : '',
    areaValue,
    description,
    featured: false,
    image,
    yearBuilt: null,
    parking: 'Contact agent for parking details',
    availability: fields.availability,
    neighborhood: '',
    about: description ? [description] : [],
    features: { interior: [], exterior: [], amenities: [] },
    agentId: 'olivia-bennett',
    gallery: image ? [image] : [],
  }

  addedProperties = [...addedProperties, property]
  writeJSON(ADDED_KEY, addedProperties)
  notify()
  return property
}

/** Reactive, always-current property list for components that render it directly. */
export function useProperties() {
  const [list, setList] = useState(effectiveProperties)

  useEffect(() => {
    const listener = (next) => setList(next)
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  return list
}
