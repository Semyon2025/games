export type Session = {
  name: string
}

const STORAGE_KEY = 'games-session'

export function getSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'name' in parsed &&
      typeof parsed.name === 'string' &&
      parsed.name.trim()
    ) {
      return { name: parsed.name }
    }
  } catch {
    return null
  }

  return null
}

export function setSession(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event('session-change'))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('session-change'))
}
