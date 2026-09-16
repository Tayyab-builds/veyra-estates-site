import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * Minimal dependency-free client-side router.
 *
 * The project's package.json is not part of this delivery, so we avoid
 * introducing a new dependency (e.g. react-router-dom) and instead ship a
 * small History API based router. It supports pathname + search matching,
 * a <Link> component that behaves like a normal anchor (keeps ctrl/cmd
 * click, middle click, right click, etc. working) and a useRouter() hook.
 */

const RouterContext = createContext(null)

function currentPath() {
  if (typeof window === 'undefined') return '/'
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onPopState = () => setPath(currentPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to, { replace = false, scroll = true } = {}) => {
    if (to === currentPath()) return
    if (replace) {
      window.history.replaceState({}, '', to)
    } else {
      window.history.pushState({}, '', to)
    }
    setPath(currentPath())
    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return ctx
}

/** True when the current path's pathname matches (ignoring query/hash). */
export function usePathname() {
  const { path } = useRouter()
  return path.split('?')[0].split('#')[0]
}

export function Link({ to, children, className, onClick, ...props }) {
  const { navigate } = useRouter()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    const isModified =
      event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
    if (isModified) return
    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
