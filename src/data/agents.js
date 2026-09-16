export const agents = [
  {
    id: 'olivia-bennett',
    name: 'Olivia Bennett',
    role: 'Luxury Property Advisor',
    region: 'New York & Miami',
    bio: 'Olivia has spent twelve years placing distinctive residences across Manhattan and South Florida, with a particular focus on waterfront and pre-war properties.',
    email: 'olivia.bennett@veyraestates.com',
    phone: '+1 212 555 0148',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'james-laurent',
    name: 'James Laurent',
    role: 'Senior Real Estate Consultant',
    region: 'London',
    bio: 'James specialises in period London property, from garden-square townhouses to converted warehouse penthouses, and has advised clients across the city for over a decade.',
    email: 'james.laurent@veyraestates.com',
    phone: '+44 20 7946 0192',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'sofia-rahman',
    name: 'Sofia Rahman',
    role: 'International Property Specialist',
    region: 'Dubai',
    bio: 'Sofia works with international buyers across Dubai\'s most established addresses, from the Palm to Emirates Hills, with a focus on off-market opportunities.',
    email: 'sofia.rahman@veyraestates.com',
    phone: '+971 4 555 0177',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop',
  },
]

export function getAgentById(id) {
  return agents.find((agent) => agent.id === id) ?? agents[0]
}
