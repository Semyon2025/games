import { Link } from '@tanstack/react-router'
import { GameSearch } from './GameSearch'
import styles from './DetailTop.module.css'

export function DetailTop() {
  return (
    <div className={styles.bar}>
      <Link to="/" className={styles.back}>
        ← Назад
      </Link>
      <GameSearch layout="bar" />
    </div>
  )
}
