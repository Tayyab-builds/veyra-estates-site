// Local demo data only — no backend, no API calls.
//
// These are intentionally simple, clearly-labelled demo credentials for the
// frontend-only login experience. They are not a real authentication system;
// see `src/hooks/useAuth.js` for how they're used.
export const mockAccounts = [
  {
    email: 'customer@veyraestates.com',
    password: 'veyra2024',
    role: 'customer',
    name: 'Isabelle Carter',
    phone: '+1 (212) 555-0148',
  },
  {
    email: 'admin@veyraestates.com',
    password: 'veyra2024',
    role: 'admin',
    name: 'Marcus Webb',
  },
]
