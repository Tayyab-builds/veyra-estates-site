import { areaOptions, priceRangesFor } from '../data/filterOptions.js'

export const defaultFilters = {
  search: '',
  type: 'Any Type',
  purpose: 'Any',
  price: 'Any Price',
  bedrooms: 'Any',
  bathrooms: 'Any',
  minArea: 'Any Size',
  city: 'Any Location',
}

function matchesMinOption(value, selected) {
  if (selected === 'Any') return true
  if (selected === '5+') return value >= 5
  return value === Number(selected)
}

export function matchesFilters(property, filters) {
  const search = filters.search.trim().toLowerCase()
  if (search) {
    const haystack = `${property.name} ${property.location} ${property.city}`.toLowerCase()
    if (!haystack.includes(search)) return false
  }

  if (filters.type !== 'Any Type' && property.category !== filters.type) return false
  if (filters.purpose !== 'Any' && property.purpose !== filters.purpose) return false
  if (filters.city !== 'Any Location' && property.city !== filters.city) return false

  if (!matchesMinOption(property.beds, filters.bedrooms)) return false
  if (!matchesMinOption(property.baths, filters.bathrooms)) return false

  if (filters.minArea !== 'Any Size') {
    const areaOption = areaOptions.find((a) => a.label === filters.minArea)
    if (areaOption && property.areaValue < areaOption.min) return false
  }

  if (filters.price !== 'Any Price') {
    const range = priceRangesFor(filters.purpose).find((r) => r.label === filters.price)
    if (range && (property.priceValue < range.min || property.priceValue > range.max)) return false
  }

  return true
}

export function countActiveFilters(filters) {
  let count = 0
  if (filters.search.trim()) count += 1
  if (filters.type !== defaultFilters.type) count += 1
  if (filters.purpose !== defaultFilters.purpose) count += 1
  if (filters.price !== defaultFilters.price) count += 1
  if (filters.bedrooms !== defaultFilters.bedrooms) count += 1
  if (filters.bathrooms !== defaultFilters.bathrooms) count += 1
  if (filters.minArea !== defaultFilters.minArea) count += 1
  if (filters.city !== defaultFilters.city) count += 1
  return count
}
