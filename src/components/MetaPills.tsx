import styles from './MetaPills.module.css'

type MetaPillsProps = {
  release: string
  genre: string
  platform: string
}

export function MetaPills({ release, genre, platform }: MetaPillsProps) {
  return (
    <div className={styles.list}>
      <span>Выход: {release}</span>
      <span>Жанр: {genre}</span>
      <span>Платформа: {platform}</span>
    </div>
  )
}
