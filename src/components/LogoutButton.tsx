import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { clearSession, getSession, type Session } from '../lib/auth'
import styles from './LogoutButton.module.css'

export function LogoutButton() {
  const navigate = useNavigate()
  const [session, setSessionState] = useState<Session | null>(getSession)

  useEffect(() => {
    const sync = () => setSessionState(getSession())
    window.addEventListener('session-change', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('session-change', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!session) return null

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => {
        clearSession()
        void navigate({ to: '/login' })
      }}
    >
      Выйти
    </button>
  )
}
