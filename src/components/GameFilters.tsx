import { NativeSelect, NativeSelectOption } from './NativeSelect'
import styles from './GameFilters.module.css'

type GameFiltersProps = {
  sort: 'asc' | 'desc'
  genre: string
  platform: string
  genres: string[]
  platforms: string[]
  onSort: (value: 'asc' | 'desc') => void
  onGenre: (value: string) => void
  onPlatform: (value: string) => void
}

export function GameFilters({
  sort,
  genre,
  platform,
  genres,
  platforms,
  onSort,
  onGenre,
  onPlatform,
}: GameFiltersProps) {
  return (
    <div className={styles.row}>
      <NativeSelect
        inline
        aria-label="Сортировка по году"
        value={sort}
        onChange={(event) => onSort(event.target.value as 'asc' | 'desc')}
      >
        <NativeSelectOption value="asc">Год ↑</NativeSelectOption>
        <NativeSelectOption value="desc">Год ↓</NativeSelectOption>
      </NativeSelect>
      <NativeSelect
        inline
        aria-label="Жанр"
        value={genre}
        onChange={(event) => onGenre(event.target.value)}
      >
        <NativeSelectOption value="all">Все жанры</NativeSelectOption>
        {genres.map((item) => (
          <NativeSelectOption key={item} value={item}>
            {item}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <NativeSelect
        inline
        aria-label="Платформа"
        value={platform}
        onChange={(event) => onPlatform(event.target.value)}
      >
        <NativeSelectOption value="all">Все платформы</NativeSelectOption>
        {platforms.map((item) => (
          <NativeSelectOption key={item} value={item}>
            {item}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  )
}
