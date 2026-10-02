import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { gameKeys, getGames } from '../api/games'
import styles from './GameSearch.module.css'

export function GameSearch({ layout = 'page' }: { layout?: 'page' | 'bar' }) {
  const gamesQuery = useQuery({
    queryKey: gameKeys.all,
    queryFn: getGames,
  })
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const query = search.trim().toLowerCase()

  const suggestions = useMemo(() => {
    if (query.length < 3 || !gamesQuery.data) return []
    return gamesQuery.data
      .filter((game) => game.title.toLowerCase().includes(query))
      .slice(0, 8)
  }, [gamesQuery.data, query])

  const searchClass = layout === 'bar' ? `${styles.search} ${styles.bar}` : styles.search

  return (
    <div className={searchClass}>
      <label className={styles.hidden} htmlFor="game-search">
        Поиск игр
      </label>
      <span className={styles.icon} aria-hidden="true">
        ⌕
      </span>
      <input
        id="game-search"
        className={styles.input}
        value={search}
        placeholder="Поиск игр..."
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(event) => {
          const value = event.target.value
          setSearch(value)
          if (value.trim().length >= 3) setOpen(true)
        }}
      />
      {open && query.length >= 3 ? (
        <ul className={styles.suggestions}>
          {suggestions.length === 0 ? (
            <li className={styles.empty}>Ничего не найдено</li>
          ) : (
            suggestions.map((game) => (
              <li key={game.id}>
                <Link
                  to="/games/$gameId"
                  params={{ gameId: String(game.id) }}
                  aria-label={game.title}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <img src={game.thumbnail} alt="" />
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}
