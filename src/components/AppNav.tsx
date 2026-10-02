import { Link } from '@tanstack/react-router'
import styles from './AppNav.module.css'

export function AppNav() {
  return (
    <nav className={styles.nav}>
      <Link
        to="/"
        activeOptions={{ exact: true }}
        className={styles.link}
        activeProps={() => ({ className: `${styles.link} ${styles.active}` })}
      >
        Все игры
      </Link>
      <Link
        to="/my-games"
        className={styles.link}
        activeProps={() => ({ className: `${styles.link} ${styles.active}` })}
      >
        Сохранённые
      </Link>
    </nav>
  )
}
