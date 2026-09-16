import { getProperties } from '../data/propertyStore.js'

// Derives real, already-existing details for a given city from
// src/data/properties.js. Nothing here is invented — every value is read
// directly off existing property records (never a count/statistic that
// isn't already present in the data).

/** Distinct neighborhood names already used across this city's listings. */
export function getNeighborhoods(cityName, limit = 4) {
  const names = getProperties()
    .filter((property) => property.city === cityName)
    .map((property) => property.location.split(',')[0].trim())
  return [...new Set(names)].slice(0, limit)
}

/** A representative listing for this city, preferring a featured one. */
export function getSpotlightProperty(cityName) {
  const cityProperties = getProperties().filter((property) => property.city === cityName)
  return cityProperties.find((property) => property.featured) ?? cityProperties[0] ?? null
}
