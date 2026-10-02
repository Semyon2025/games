const genres: Record<string, string> = {
  Action: 'Экшен',
  'Action Game': 'Экшен',
  'Action RPG': 'Экшен-RPG',
  ARPG: 'Экшен-RPG',
  'Battle Royale': 'Королевская битва',
  'Card Game': 'Карточная',
  'Dungeon Crawler': 'Подземелья',
  Fantasy: 'Фэнтези',
  Fighting: 'Файтинг',
  MMO: 'MMO',
  MMOARPG: 'MMOARPG',
  MMORPG: 'MMORPG',
  MOBA: 'MOBA',
  Racing: 'Гонки',
  RPG: 'RPG',
  Shooter: 'Шутер',
  Social: 'Социальная',
  Sports: 'Спорт',
  Strategy: 'Стратегия',
}

const platforms: Record<string, string> = {
  'PC (Windows)': 'ПК (Windows)',
  Windows: 'Windows',
  'Web Browser': 'Браузер',
}

const statuses: Record<string, string> = {
  Live: 'Онлайн',
}

export function genreLabel(genre: string) {
  const value = genre.trim()
  return genres[value] ?? value
}

export function platformLabel(platform: string) {
  const value = platform.trim()
  return platforms[value] ?? value
}

export function uniqueLabels(values: string[], toLabel: (value: string) => string) {
  return [...new Set(values.map(toLabel).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'ru'),
  )
}

export function matchesLabel(value: string, selected: string, toLabel: (value: string) => string) {
  return selected === 'all' || toLabel(value) === selected
}

export function matchesPlatform(platform: string, selected: string) {
  if (selected === 'all') return true
  return platform.split(',').some((part) => platformLabel(part) === selected)
}

export function statusLabel(status: string) {
  return statuses[status] ?? status
}

export function gamesCount(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  const word =
    mod10 === 1 && mod100 !== 11
      ? 'игра'
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? 'игры'
        : 'игр'

  return `${count} ${word}`
}
