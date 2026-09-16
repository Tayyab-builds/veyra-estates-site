import { useCallback, useEffect, useState } from 'react'
import { mockAccounts } from '../data/mockAccounts.js'

const STORAGE_KEY = 'veyra:auth'

// Accounts created through the public registration form. `mockAccounts` is a
// static, read-only demo fixture, so newly "registered" customers are kept
// here — in the same frontend-only, localStorage-backed spirit as the rest
// of this mock-auth model, and always merged with `mockAccounts` rather than
// replacing or duplicating that list.
const REGISTERED_ACCOUNTS_KEY = 'veyra:registeredAccounts'

function readStored() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readRegisteredAccounts() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(REGISTERED_ACCOUNTS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistRegisteredAccounts(accounts) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(accounts))
  } catch {
    // localStorage unavailable (private mode, etc.) — new account just won't persist.
  }
}

/** All known demo accounts: the built-in fixtures plus anyone who has registered. */
function allAccounts() {
  return [...mockAccounts, ...readRegisteredAccounts()]
}

let currentUser = readStored()
const listeners = new Set()

function persist() {
  if (typeof window === 'undefined') return
  try {
    if (currentUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser))
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — session just won't persist.
  }
}

function notify() {
  persist()
  listeners.forEach((listener) => listener(currentUser))
}

/**
 * Frontend-only mock sign-in. Checks the entered credentials against the
 * isolated demo account list in `src/data/mockAccounts.js` — nothing is ever
 * sent to a server. Returns a small result object rather than throwing, so
 * callers can show inline validation states.
 */
function login({ email, password, remember = true }) {
  const normalizedEmail = email.trim().toLowerCase()
  const match = allAccounts().find(
    (account) => account.email.toLowerCase() === normalizedEmail && account.password === password
  )

  if (!match) {
    return { success: false, error: 'That email and password combination was not recognized.' }
  }

  currentUser = {
    name: match.name,
    email: match.email,
    role: match.role,
    // Not every demo account defines a phone number, so this is simply
    // undefined for those — callers should treat it as optional.
    phone: match.phone,
    remember,
  }
  notify()
  return { success: true, user: currentUser }
}

function logout() {
  currentUser = null
  notify()
}

/**
 * Frontend-only mock registration. Creates a new customer account, stored
 * alongside (never overwriting) the existing demo accounts, then signs the
 * new customer in immediately — mirroring `login()` above. Nothing is ever
 * sent to a server.
 */
function register({ firstName, lastName, email, phone, password, subscribe = false }) {
  const normalizedEmail = email.trim().toLowerCase()
  const registered = readRegisteredAccounts()

  const alreadyExists = [...mockAccounts, ...registered].some(
    (account) => account.email.toLowerCase() === normalizedEmail
  )
  if (alreadyExists) {
    return {
      success: false,
      error: 'An account with this email already exists. Try signing in instead.',
    }
  }

  const name = `${firstName.trim()} ${lastName.trim()}`.trim()
  const newAccount = {
    email: normalizedEmail,
    password,
    // Public registration only ever creates customer accounts — admin
    // access remains limited to the existing demo admin account.
    role: 'customer',
    name,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    phone: phone.trim(),
    subscribe: Boolean(subscribe),
    createdAt: new Date().toISOString(),
  }

  persistRegisteredAccounts([...registered, newAccount])

  currentUser = {
    name: newAccount.name,
    email: newAccount.email,
    role: newAccount.role,
    phone: newAccount.phone,
    remember: true,
  }
  notify()
  return { success: true, user: currentUser }
}

/**
 * Every known demo account (built-in fixtures + anyone who has
 * registered), with sensitive fields stripped — used by `/admin/users`.
 * Never exposes `password` or any other authentication secret.
 */
export function getAllUsers() {
  return allAccounts().map(({ password: _password, ...safe }) => safe)
}

/** Reactive version of `getAllUsers()` — updates if someone registers while admin is viewing the list. */
export function useAllUsers() {
  const [users, setUsers] = useState(getAllUsers)

  useEffect(() => {
    const listener = () => setUsers(getAllUsers())
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  return users
}

/** Shared, localStorage-backed mock auth state — no backend, frontend-only. */
export function useAuth() {
  const [user, setUser] = useState(currentUser)

  useEffect(() => {
    const listener = (next) => setUser(next)
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  return {
    user,
    isAuthenticated: Boolean(user),
    login: useCallback((credentials) => login(credentials), []),
    register: useCallback((details) => register(details), []),
    logout: useCallback(() => logout(), []),
  }
}
