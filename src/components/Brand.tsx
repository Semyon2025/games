import styles from './Brand.module.css'

export function Brand() {
  return (
    <div className={styles.brand}>
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="M7 9h2v2H7V9zm8 0h2v2h-2V9zM6 7a3 3 0 0 0-3 3v1H2v2h1v1a3 3 0 0 0 3 3h1l1 2h2l1-2h4l1 2h2l1-2h1a3 3 0 0 0 3-3v-1h1v-2h-1v-1a3 3 0 0 0-3-3H6z"
            fill="currentColor"
          />
        </svg>
      </span>
      Gaming Haven Z
    </div>
  )
}
