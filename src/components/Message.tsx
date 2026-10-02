import type { ReactNode } from 'react'
import styles from './Message.module.css'

export function Message({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <p className={error ? `${styles.message} ${styles.error}` : styles.message}>{children}</p>
}
