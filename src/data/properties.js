// Local demo data only — no backend, no API calls.
//
// `type` is the descriptive label shown on property cards (kept close to the
// original homepage copy). `category` is the canonical value used by the
// /properties filters (Apartment | Villa | Penthouse | Residence).
const baseProperties = [
  {
    id: 'meridian-residence',
    name: 'The Meridian Residence',
    location: 'Tribeca, New York, USA',
    city: 'New York',
    country: 'USA',
    type: 'Loft Residence',
    category: 'Residence',
    purpose: 'Buy',
    price: '$6,450,000',
    priceValue: 6_450_000,
    beds: 4,
    baths: 3,
    area: '3,200 sq ft',
    areaValue: 3200,
    description:
      'A converted cast-iron loft with 14-foot ceilings and original oak beams, reimagined for quiet modern living.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'aurelia-house',
    name: 'Aurelia House',
    location: 'Notting Hill, London, UK',
    city: 'London',
    country: 'UK',
    type: 'Townhouse',
    category: 'Villa',
    purpose: 'Buy',
    price: '£5,900,000',
    priceValue: 7_400_000,
    beds: 5,
    baths: 4,
    area: '4,100 sq ft',
    areaValue: 4100,
    description:
      'A stucco-fronted townhouse on a quiet garden square, restored with a considered mix of period and contemporary detail.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'westbrook-penthouse',
    name: 'Westbrook Penthouse',
    location: 'Palm Jumeirah, Dubai, UAE',
    city: 'Dubai',
    country: 'UAE',
    type: 'Penthouse',
    category: 'Penthouse',
    purpose: 'Buy',
    price: 'AED 24,500,000',
    priceValue: 6_670_000,
    beds: 3,
    baths: 4,
    area: '3,850 sq ft',
    areaValue: 3850,
    description:
      'A full-floor penthouse wrapped in glass, with uninterrupted views across the Palm and the Gulf beyond.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'harbor-crest-residence',
    name: 'Harbor Crest Residence',
    location: 'Coconut Grove, Miami, USA',
    city: 'Miami',
    country: 'USA',
    type: 'Waterfront Villa',
    category: 'Villa',
    purpose: 'Rent',
    price: '$18,000/month',
    priceValue: 18_000,
    beds: 6,
    baths: 5,
    area: '5,600 sq ft',
    areaValue: 5600,
    description:
      'A single-storey waterfront villa with a private dock, mature landscaping, and a pool that seems to meet the bay.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'hartwell-apartment',
    name: 'Hartwell Apartment',
    location: 'Chelsea, New York, USA',
    city: 'New York',
    country: 'USA',
    type: 'Pre-War Apartment',
    category: 'Apartment',
    purpose: 'Rent',
    price: '$9,200/month',
    priceValue: 9_200,
    beds: 2,
    baths: 2,
    area: '1,450 sq ft',
    areaValue: 1450,
    description:
      'A pre-war apartment with herringbone floors and oversized windows, two blocks from the Highline.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'sutton-place-residence',
    name: 'Sutton Place Residence',
    location: 'Sutton Place, New York, USA',
    city: 'New York',
    country: 'USA',
    type: 'River-View Residence',
    category: 'Residence',
    purpose: 'Buy',
    price: '$4,100,000',
    priceValue: 4_100_000,
    beds: 3,
    baths: 3,
    area: '2,600 sq ft',
    areaValue: 2600,
    description:
      'A serene residence overlooking the East River, finished with quarter-sawn white oak and honed limestone.',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'east-village-loft',
    name: 'East Village Loft',
    location: 'East Village, New York, USA',
    city: 'New York',
    country: 'USA',
    type: 'Artist Loft',
    category: 'Apartment',
    purpose: 'Buy',
    price: '$2,350,000',
    priceValue: 2_350_000,
    beds: 1,
    baths: 2,
    area: '1,600 sq ft',
    areaValue: 1600,
    description:
      'A single-level loft with a working fireplace and a private roof terrace, moments from Tompkins Square Park.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'kensington-residence',
    name: 'Kensington Residence',
    location: 'Kensington, London, UK',
    city: 'London',
    country: 'UK',
    type: 'Garden Residence',
    category: 'Residence',
    purpose: 'Buy',
    price: '£3,450,000',
    priceValue: 4_330_000,
    beds: 4,
    baths: 3,
    area: '3,000 sq ft',
    areaValue: 3000,
    description:
      'A lateral residence with private access to communal gardens, unchanged in scale since 1860.',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'marylebone-apartment',
    name: 'Marylebone Apartment',
    location: 'Marylebone, London, UK',
    city: 'London',
    country: 'UK',
    type: 'Mansion Block Apartment',
    category: 'Apartment',
    purpose: 'Rent',
    price: '£6,800/month',
    priceValue: 8_500,
    beds: 2,
    baths: 2,
    area: '1,350 sq ft',
    areaValue: 1350,
    description:
      'A high-ceilinged apartment in a red-brick mansion block, close to Marylebone High Street.',
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'shoreditch-penthouse',
    name: 'Shoreditch Penthouse',
    location: 'Shoreditch, London, UK',
    city: 'London',
    country: 'UK',
    type: 'Warehouse Penthouse',
    category: 'Penthouse',
    purpose: 'Buy',
    price: '£4,900,000',
    priceValue: 6_150_000,
    beds: 3,
    baths: 3,
    area: '2,900 sq ft',
    areaValue: 2900,
    description:
      'A former textile warehouse crowned by a glass-topped penthouse with a wraparound terrace.',
    image:
      'https://images.unsplash.com/photo-1523192193543-6e7296d960e4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'downtown-dubai-residence',
    name: 'Downtown Dubai Residence',
    location: 'Downtown, Dubai, UAE',
    city: 'Dubai',
    country: 'UAE',
    type: 'Skyline Residence',
    category: 'Residence',
    purpose: 'Rent',
    price: 'AED 340,000/year',
    priceValue: 7_700,
    beds: 3,
    baths: 3,
    area: '2,200 sq ft',
    areaValue: 2200,
    description:
      'A high-floor residence facing the Burj Khalifa and the choreographed fountains below.',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'emirates-hills-villa',
    name: 'Emirates Hills Villa',
    location: 'Emirates Hills, Dubai, UAE',
    city: 'Dubai',
    country: 'UAE',
    type: 'Golf-Front Villa',
    category: 'Villa',
    purpose: 'Buy',
    price: 'AED 42,000,000',
    priceValue: 11_440_000,
    beds: 7,
    baths: 8,
    area: '9,800 sq ft',
    areaValue: 9800,
    description:
      'A private compound overlooking the Montgomerie golf course, with its own screening room and spa wing.',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'business-bay-apartment',
    name: 'Business Bay Apartment',
    location: 'Business Bay, Dubai, UAE',
    city: 'Dubai',
    country: 'UAE',
    type: 'Canal-View Apartment',
    category: 'Apartment',
    purpose: 'Rent',
    price: 'AED 165,000/year',
    priceValue: 3_740,
    beds: 1,
    baths: 2,
    area: '980 sq ft',
    areaValue: 980,
    description:
      'A canal-facing apartment with a private balcony, walking distance to the Dubai Water Canal promenade.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'star-island-residence',
    name: 'Star Island Residence',
    location: 'Star Island, Miami, USA',
    city: 'Miami',
    country: 'USA',
    type: 'Bayfront Residence',
    category: 'Residence',
    purpose: 'Buy',
    price: '$14,200,000',
    priceValue: 14_200_000,
    beds: 6,
    baths: 7,
    area: '7,400 sq ft',
    areaValue: 7400,
    description:
      'A gated bayfront residence with a 100-foot dock, built for entertaining and easy Biscayne Bay access.',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'brickell-penthouse',
    name: 'Brickell Penthouse',
    location: 'Brickell, Miami, USA',
    city: 'Miami',
    country: 'USA',
    type: 'Skyline Penthouse',
    category: 'Penthouse',
    purpose: 'Buy',
    price: '$5,750,000',
    priceValue: 5_750_000,
    beds: 4,
    baths: 4,
    area: '3,400 sq ft',
    areaValue: 3400,
    description:
      'A corner penthouse above the Brickell skyline, with a wraparound terrace built for sunset.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'south-beach-apartment',
    name: 'South Beach Apartment',
    location: 'South Beach, Miami, USA',
    city: 'Miami',
    country: 'USA',
    type: 'Art Deco Apartment',
    category: 'Apartment',
    purpose: 'Rent',
    price: '$6,400/month',
    priceValue: 6_400,
    beds: 2,
    baths: 2,
    area: '1,200 sq ft',
    areaValue: 1200,
    description:
      'A restored Art Deco apartment two blocks from Lummus Park, with original terrazzo floors throughout.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop',
  },
]

// ---------------------------------------------------------------------------
// Property Details enrichment — additional fields used only by the
// /properties/:id page (gallery, long-form copy, specifications, agent).
// Kept separate from the base listing fields above so the Properties grid
// and filters (which only need the base fields) are untouched.
// ---------------------------------------------------------------------------

const detailsById = {
  'meridian-residence': {
    yearBuilt: 1912,
    parking: 'Private garage, 1 space',
    availability: 'Available Now',
    neighborhood:
      "A landmarked cast-iron block in Tribeca, close to Washington Market Park and the Hudson River esplanade.",
    about: [
      'Originally built as a dry-goods warehouse, this Tribeca loft was reimagined in 2019 without disturbing the bones that made it worth saving. Fourteen-foot ceilings and the original oak beams set the scale for everything below them; the rest of the apartment was designed to stay quiet in response.',
      'The open living space runs the full width of the building, lit from both ends by the original cast-iron windows. A single run of white oak flooring ties the loft together, broken only by the kitchen island and a freestanding steel staircase leading to a private roof terrace.',
    ],
    features: {
      interior: [
        '14-ft ceilings with original oak beams',
        "Open-plan chef's kitchen",
        'White oak flooring throughout',
        'Restored cast-iron window frames',
      ],
      exterior: ['Landmarked cast-iron façade', 'Private roof terrace access', 'Cobblestone street frontage'],
      amenities: ['Smart climate control', 'Video intercom & security', 'Private storage unit', 'Bike room'],
    },
    agentId: 'olivia-bennett',
  },
  'aurelia-house': {
    yearBuilt: 1860,
    parking: 'Off-street parking, 1 car',
    availability: 'Available Now',
    neighborhood: 'A stucco-fronted garden square in Notting Hill, moments from Portobello Road.',
    about: [
      "Aurelia House sits on one of Notting Hill's quieter garden squares, its stucco façade unchanged since the 1860s. Inside, a careful restoration has kept the period cornicing and joinery while opening the ground floor into a single, light-filled reception that runs from the street to the garden.",
      'Upstairs, five bedrooms are arranged over three floors, each finished with the same restrained material palette of oak, limestone and lime-washed plaster. A private garden and access to the communal square give the house a rare amount of outdoor space for its address.',
    ],
    features: {
      interior: [
        'Grand double reception room',
        'Restored period cornicing',
        'Bespoke joinery throughout',
        'Underfloor heating',
      ],
      exterior: ['Private rear garden', 'South-facing terrace', 'Access to communal garden square'],
      amenities: ['Wine cellar', 'Home cinema room', 'Security alarm system', 'Utility & boot room'],
    },
    agentId: 'james-laurent',
  },
  'westbrook-penthouse': {
    yearBuilt: 2017,
    parking: '2 reserved spaces',
    availability: 'Available Now',
    neighborhood: 'A full-floor position on the Palm, facing open Gulf water on three sides.',
    about: [
      'Westbrook Penthouse occupies the entire top floor of its tower, reached by a private elevator that opens directly into the residence. Floor-to-ceiling glazing wraps the living spaces, framing uninterrupted views of the Palm and the Gulf beyond from almost every room.',
      'A wraparound terrace and private infinity pool extend the living space outdoors, while Italian marble and integrated smart-home systems carry the same quiet precision through every interior surface.',
    ],
    features: {
      interior: [
        'Private elevator lobby',
        'Floor-to-ceiling glazing',
        'Italian marble flooring',
        'Integrated smart-home panel',
      ],
      exterior: ['Wraparound terrace', 'Private infinity pool', 'Uninterrupted Gulf views'],
      amenities: [
        '24-hour concierge',
        'Valet parking',
        'Access to resort-style beach club',
        'Climate-controlled wine room',
      ],
    },
    agentId: 'sofia-rahman',
  },
  'harbor-crest-residence': {
    yearBuilt: 2015,
    parking: 'Circular driveway, 6+ vehicles',
    availability: 'Available Now',
    neighborhood: 'A quiet waterfront pocket of Coconut Grove with direct bay access.',
    about: [
      'Harbor Crest is built on a single level, a deliberate choice that keeps every room connected to the water. Impact-rated glass doors slide fully open along the rear of the house, so the pool, dock and bay read as one continuous space with the living areas.',
      "Mature tropical landscaping shields the property from the street, while a private dock with a boat lift and an outdoor summer kitchen make the house feel built for entertaining as much as for living quietly.",
    ],
    features: {
      interior: [
        'Single-level open-plan layout',
        'Chef\'s kitchen with waterfront views',
        'Walk-in wine room',
        'Impact-rated glass doors throughout',
      ],
      exterior: ['Private dock with boat lift', 'Mature tropical landscaping', 'Infinity-edge pool facing the bay'],
      amenities: ['Full home automation', 'Whole-house generator', 'Outdoor summer kitchen', 'Gated entry'],
    },
    agentId: 'olivia-bennett',
  },
  'hartwell-apartment': {
    yearBuilt: 1928,
    parking: 'Street parking; garage two blocks away',
    availability: 'Available Now',
    neighborhood: 'A pre-war block in Chelsea, two blocks from the Highline.',
    about: [
      "Hartwell Apartment keeps its pre-war character close to the surface: herringbone floors, oversized casement windows and a working wood-burning fireplace, all original to the 1928 building. The layout has been quietly updated for how the space is actually used today.",
      'A renovated kitchen opens onto the main living room rather than closing it off, and the oversized windows keep the apartment bright through most of the day despite its mid-block position.',
    ],
    features: {
      interior: [
        'Herringbone hardwood floors',
        'Oversized casement windows',
        'Wood-burning fireplace',
        'Renovated kitchen',
      ],
      exterior: ['Landmarked pre-war façade', 'Shared roof deck'],
      amenities: ['Live-in superintendent', 'Bike storage', 'Laundry on every floor'],
    },
    agentId: 'olivia-bennett',
  },
  'sutton-place-residence': {
    yearBuilt: 1998,
    parking: 'Valet garage parking available',
    availability: 'Available Now',
    neighborhood: 'A serene enclave of Sutton Place overlooking the East River.',
    about: [
      "This residence is finished with a restraint that lets the river do most of the talking. Quarter-sawn white oak and honed limestone run through the main rooms, and a private balcony puts the water directly outside the living room.",
      "A library with built-in shelving and an eat-in kitchen facing the river round out a layout built for calm, everyday living rather than entertaining at scale.",
    ],
    features: {
      interior: [
        'Quarter-sawn white oak flooring',
        'Honed limestone bathrooms',
        'Library with built-in shelving',
        'Eat-in kitchen with river views',
      ],
      exterior: ['Private balcony over the river', 'Landscaped building courtyard'],
      amenities: ['24-hour doorman', 'Fitness centre', 'Resident lounge'],
    },
    agentId: 'olivia-bennett',
  },
  'east-village-loft': {
    yearBuilt: 1905,
    parking: 'No dedicated parking; street permit available',
    availability: 'Available Now',
    neighborhood: 'A converted loft building moments from Tompkins Square Park.',
    about: [
      "Converted from a garment factory in 2016, this single-level loft has kept its exposed brick, timber ceiling and factory windows largely untouched. A working wood-burning fireplace anchors the main room, with an open mezzanine used as a study above.",
      'A private roof terrace, reached by a shared stairwell, gives the loft rare outdoor space for the neighborhood — just far enough from the street to feel private.',
    ],
    features: {
      interior: [
        'Working wood-burning fireplace',
        'Exposed brick and timber ceiling',
        'Open mezzanine study',
        'Restored factory windows',
      ],
      exterior: ['Private roof terrace', 'Shared landscaped courtyard'],
      amenities: ['Keyed elevator access', 'Additional storage cage', 'Package room'],
    },
    agentId: 'olivia-bennett',
  },
  'kensington-residence': {
    yearBuilt: 1860,
    parking: "Residents' permit parking",
    availability: 'Available Now',
    neighborhood: "A lateral residence with private access to Kensington's communal gardens.",
    about: [
      "Unchanged in scale since 1860, this lateral residence spans a full floor with private access to the communal gardens below. Original marble fireplaces and bespoke library shelving remain the focal points of a home that has been updated carefully rather than extensively.",
      'Underfloor-heated bathrooms and a private home office suite bring the residence up to a contemporary standard without disrupting its period proportions.',
    ],
    features: {
      interior: [
        'Lateral open-plan reception',
        'Original marble fireplaces',
        'Bespoke library shelving',
        'Underfloor-heated bathrooms',
      ],
      exterior: ['Private gate to communal gardens', 'Juliet balconies'],
      amenities: ['Porter service', 'Wine cellar', 'Home office suite'],
    },
    agentId: 'james-laurent',
  },
  'marylebone-apartment': {
    yearBuilt: 1905,
    parking: 'On-street permit parking',
    availability: 'Available Now',
    neighborhood: 'A red-brick mansion block close to Marylebone High Street.',
    about: [
      'High ceilings and original cornicing carry over from the building\'s 1905 construction, paired with a recently renovated kitchen finished in honed stone. Sash windows throughout keep the apartment bright and, once opened, notably quiet given the central location.',
      'A short walk from Marylebone High Street and Regent\'s Park, the apartment suits a tenant who wants a central address without the scale or noise of a larger building.',
    ],
    features: {
      interior: ['High ceilings with original cornicing', 'Renovated kitchen with stone worktops', 'Sash windows throughout'],
      exterior: ['Communal courtyard garden'],
      amenities: ['Porter on duty', 'Lift access', 'Secure entry system'],
    },
    agentId: 'james-laurent',
  },
  'shoreditch-penthouse': {
    yearBuilt: 1896,
    parking: 'Secure underground parking, 1 space',
    availability: 'Available Now',
    neighborhood: 'A former textile warehouse in the heart of Shoreditch.',
    about: [
      'This penthouse crowns a former textile warehouse, and it shows: exposed steel trusses and polished concrete floors run beneath a glass-topped atrium ceiling that floods the open-plan kitchen and living space with daylight.',
      'A wraparound roof terrace with a private rooftop garden wraps the entire upper floor, giving the penthouse an unusually large amount of outdoor space for its Shoreditch setting.',
    ],
    features: {
      interior: [
        'Glass-topped atrium ceiling',
        'Exposed steel trusses',
        'Polished concrete flooring',
        'Open-plan kitchen island',
      ],
      exterior: ['Wraparound roof terrace', 'Private rooftop garden'],
      amenities: ['Secure fob entry', 'Bike storage', 'Concierge on request'],
    },
    agentId: 'james-laurent',
  },
  'downtown-dubai-residence': {
    yearBuilt: 2012,
    parking: '2 basement spaces',
    availability: 'Available Now',
    neighborhood: 'A high-floor tower facing the Burj Khalifa and Dubai Fountain.',
    about: [
      'Set high enough to clear the surrounding towers, this residence faces the Burj Khalifa and the choreographed fountains directly below. Floor-to-ceiling glazing and marble flooring run through an open-plan living area built around that view.',
      'Built-in wardrobes and a considered, low-clutter layout keep the apartment feeling calm, while the podium below connects directly through to Dubai Mall.',
    ],
    features: {
      interior: [
        'Floor-to-ceiling fountain-facing windows',
        'Open-plan living with marble floors',
        'Built-in wardrobes throughout',
      ],
      exterior: ['Private balcony overlooking the fountains'],
      amenities: ['Infinity pool & spa', '24-hour security', 'Direct access to Dubai Mall via podium'],
    },
    agentId: 'sofia-rahman',
  },
  'emirates-hills-villa': {
    yearBuilt: 2009,
    parking: 'Gated compound parking, 6+ vehicles',
    availability: 'Available Now',
    neighborhood: 'A private compound in Emirates Hills overlooking the Montgomerie golf course.',
    about: [
      'Set within a private, gated compound, this villa looks directly onto the Montgomerie golf course from a double-height entrance hall that sets the scale for the rest of the house. A dedicated spa wing, private screening room and staff quarters are arranged around a central courtyard.',
      'Outside, landscaped compound gardens, a private tennis court and an infinity pool are built for entertaining at a scale few residences in the city can match.',
    ],
    features: {
      interior: [
        'Private screening room',
        'Dedicated spa wing with steam room',
        'Double-height entrance hall',
        'Staff quarters',
      ],
      exterior: ['Golf-course frontage', 'Landscaped compound gardens', 'Private tennis court'],
      amenities: ['Infinity pool', '24-hour gated security', 'Smart-home automation'],
    },
    agentId: 'sofia-rahman',
  },
  'business-bay-apartment': {
    yearBuilt: 2016,
    parking: '1 basement space',
    availability: 'Available Now',
    neighborhood: 'A canal-facing tower steps from the Dubai Water Canal promenade.',
    about: [
      'A compact, efficiently laid-out apartment facing the Dubai Water Canal, with floor-to-ceiling glazing bringing the view into the open-plan kitchen and living area. A private balcony extends the living space directly over the canal.',
      'The building sits within walking distance of the canal promenade, with a rooftop pool and gym rounding out a low-maintenance base for a tenant who wants to be near the water.',
    ],
    features: {
      interior: ['Floor-to-ceiling canal-facing glazing', "Open-plan kitchen with breakfast bar"],
      exterior: ['Private balcony over the canal'],
      amenities: ['Rooftop pool & gym', '24-hour concierge', 'Covered parking'],
    },
    agentId: 'sofia-rahman',
  },
  'star-island-residence': {
    yearBuilt: 2011,
    parking: 'Gated motor court, 8+ vehicles',
    availability: 'Available Now',
    neighborhood: 'A guard-gated island enclave in Biscayne Bay.',
    about: [
      "Set behind Star Island's guard gate, this residence is built around a double-height living room that faces the bay directly. A home theatre, wine cellar and tasting room, and a chef's kitchen with a butler's pantry give the house the infrastructure for entertaining at scale.",
      'A 100-foot private dock and a resort-style pool with an outdoor summer kitchen extend that scale outdoors, set within a manicured bayfront lawn.',
    ],
    features: {
      interior: [
        'Double-height living room facing the bay',
        'Home theatre',
        "Wine cellar & tasting room",
        "Chef's kitchen with butler's pantry",
      ],
      exterior: ['100-foot private dock', 'Resort-style pool and summer kitchen', 'Manicured bayfront lawn'],
      amenities: ['Guard-gated island access', 'Full-home generator', 'Smart-home automation'],
    },
    agentId: 'olivia-bennett',
  },
  'brickell-penthouse': {
    yearBuilt: 2018,
    parking: '2 reserved garage spaces',
    availability: 'Available Now',
    neighborhood: 'A corner residence above the Brickell skyline.',
    about: [
      "Wraparound glass walls wrap the corner position of this penthouse, built for the sunset it faces most evenings. An open-plan kitchen with a waterfall island anchors the main living space, while the primary suite is set apart with dual walk-in closets.",
      'A wraparound terrace and private plunge pool extend the residence outdoors, sitting well above the noise of Brickell below.',
    ],
    features: {
      interior: [
        'Wraparound glass walls',
        'Open-plan kitchen with waterfall island',
        'Primary suite with dual walk-in closets',
      ],
      exterior: ['Wraparound sunset terrace', 'Private plunge pool'],
      amenities: ['24-hour concierge & valet', 'Rooftop pool deck', 'Fitness centre & spa'],
    },
    agentId: 'olivia-bennett',
  },
  'south-beach-apartment': {
    yearBuilt: 1938,
    parking: 'Street parking; valet available nearby',
    availability: 'Available Now',
    neighborhood: 'A restored Art Deco building two blocks from Lummus Park.',
    about: [
      'Original terrazzo floors and restored period detailing run through this Art Deco apartment, updated in 2020 with a new kitchen finished in stone. The building itself is a preserved piece of South Beach\'s 1938 skyline.',
      'A shared courtyard pool and rooftop sun deck give the apartment resort-style amenities two blocks from Lummus Park and the beach.',
    ],
    features: {
      interior: ['Original terrazzo flooring', 'Restored period detailing', 'Updated kitchen with stone counters'],
      exterior: ['Shared courtyard pool', 'Rooftop sun deck'],
      amenities: ['24-hour security', 'On-site laundry', 'Bike storage'],
    },
    agentId: 'olivia-bennett',
  },
}

// Every hero image already used across the listing — reused as a shared,
// known-good pool for the details page gallery so we don't introduce any
// unverified image URLs.
const galleryPool = [...new Set(baseProperties.map((p) => p.image))]

function galleryFor(property, index) {
  const extras = []
  for (let i = 1; extras.length < 4; i += 1) {
    const candidate = galleryPool[(index + i) % galleryPool.length]
    if (candidate !== property.image && !extras.includes(candidate)) {
      extras.push(candidate)
    }
  }
  return [property.image, ...extras]
}

export const properties = baseProperties.map((property, index) => {
  const details = detailsById[property.id] ?? {}
  return {
    ...property,
    yearBuilt: details.yearBuilt ?? null,
    parking: details.parking ?? 'Contact agent for parking details',
    availability: details.availability ?? 'Available Now',
    neighborhood: details.neighborhood ?? '',
    about: details.about ?? [property.description],
    features: details.features ?? { interior: [], exterior: [], amenities: [] },
    agentId: details.agentId ?? 'olivia-bennett',
    gallery: galleryFor(property, index),
  }
})

export function getPropertyById(id) {
  return properties.find((property) => property.id === id)
}

export function getRelatedProperties(property, limit = 3) {
  if (!property) return []
  const scored = properties
    .filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0
      if (p.city === property.city) score += 2
      if (p.category === property.category) score += 1
      const priceDiff = Math.abs(p.priceValue - property.priceValue) / Math.max(property.priceValue, 1)
      if (priceDiff < 0.5) score += 1
      return { property: p, score }
    })
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((entry) => entry.property)
}
