export const propertyTypes = ['Any Type', 'Apartment', 'Villa', 'Penthouse', 'Residence']

export const purposes = ['Any', 'Buy', 'Rent']

export const bedroomOptions = ['Any', '1', '2', '3', '4', '5+']

export const bathroomOptions = ['Any', '1', '2', '3', '4', '5+']

export const areaOptions = [
  { label: 'Any Size', min: 0 },
  { label: '1,000+ sq ft', min: 1000 },
  { label: '2,000+ sq ft', min: 2000 },
  { label: '3,000+ sq ft', min: 3000 },
  { label: '4,500+ sq ft', min: 4500 },
]

export const cityOptions = ['Any Location', 'New York', 'London', 'Dubai', 'Miami']

export const buyPriceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $1M', min: 0, max: 1_000_000 },
  { label: '$1M – $3M', min: 1_000_000, max: 3_000_000 },
  { label: '$3M – $6M', min: 3_000_000, max: 6_000_000 },
  { label: '$6M – $12M', min: 6_000_000, max: 12_000_000 },
  { label: '$12M+', min: 12_000_000, max: Infinity },
]

export const rentPriceRanges = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $10k/mo', min: 0, max: 10_000 },
  { label: '$10k – $20k/mo', min: 10_000, max: 20_000 },
  { label: '$20k – $40k/mo', min: 20_000, max: 40_000 },
  { label: '$40k+/mo', min: 40_000, max: Infinity },
]

export function priceRangesFor(purpose) {
  return purpose === 'Rent' ? rentPriceRanges : buyPriceRanges
}
