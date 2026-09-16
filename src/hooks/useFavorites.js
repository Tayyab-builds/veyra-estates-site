import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'veyra:favorites'

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

let favoriteIds = readStored()
const listeners = new Set()

function notify() {
  listeners.forEach((listener) => listener(favoriteIds))
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds))
    } catch {
      // localStorage unavailable (private mode, etc.) — favorites just won't persist.
    }
  }
}

function toggleFavorite(id) {
  favoriteIds = favoriteIds.includes(id)
    ? favoriteIds.filter((favId) => favId !== id)
    : [...favoriteIds, id]
  notify()
}

/** Shared, localStorage-backed favorites — no backend, frontend-only. */
export function useFavorites() {
  const [ids, setIds] = useState(favoriteIds)

  useEffect(() => {
    const listener = (next) => setIds(next)
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const toggle = useCallback((id) => toggleFavorite(id), [])
  const isFavorite = useCallback((id) => ids.includes(id), [ids])

  return { favoriteIds: ids, toggleFavorite: toggle, isFavorite }
}
