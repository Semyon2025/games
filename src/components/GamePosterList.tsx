import { Link } from '@tanstack/react-router'
import styles from './GamePosterList.module.css'

type PosterGame = {
  id: number
  title: string
  thumbnail: string
}

type GamePosterListProps<T extends PosterGame> = {
  games: T[]
  motionKey?: string
  align?: 'center' | 'start'
  isSaved?: (game: T) => boolean
  onToggle?: (game: T) => void
}

export function GamePosterList<T extends PosterGame>({
  games,
  motionKey,
  align = 'center',
  isSaved,
  onToggle,
}: GamePosterListProps<T>) {
  const gridClass = align === 'start' ? `${styles.grid} ${styles.start}` : styles.grid

  return (
    <ul className={gridClass} key={motionKey}>
      {games.map((game) => {
        const saved = isSaved?.(game) ?? false
        return (
          <li key={game.id}>
            <article className={styles.poster}>
              <Link
                to="/games/$gameId"
                params={{ gameId: String(game.id) }}
                aria-label={game.title}
              >
                <img src={game.thumbnail} alt="" />
              </Link>
              {onToggle ? (
                <button
                  type="button"
                  className={saved ? `${styles.mark} ${styles.saved}` : styles.mark}
                  aria-label={saved ? `Убрать ${game.title} из коллекции` : `Добавить ${game.title}`}
                  onClick={() => onToggle(game)}
                >
                  <BookmarkIcon filled={saved} />
                </button>
              ) : null}
            </article>
          </li>
        )
      })}
    </ul>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.2L6 20V5a1 1 0 0 1 1-1z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
