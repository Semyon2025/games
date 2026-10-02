import type { Game } from '../api/games'

export type Folder = {
  id: string
  name: string
}

export type SavedGame = Pick<
  Game,
  'id' | 'title' | 'thumbnail' | 'genre' | 'release_date'
> & {
  addedAt: number
  folderId: string | null
}

export type LibraryState = {
  folders: Folder[]
  games: SavedGame[]
}

function createId() {
  const randomUUID = globalThis.crypto?.randomUUID
  if (typeof randomUUID === 'function') return randomUUID.call(globalThis.crypto)
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function storageKey(userName: string) {
  return `games-library:${userName}`
}

export function getLibraryState(userName: string): LibraryState {
  const raw = localStorage.getItem(storageKey(userName))
  if (!raw) return { folders: [], games: [] }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return { folders: [], games: parsed.filter(isSavedGame).map(normalizeGame) }
    }
    if (typeof parsed === 'object' && parsed !== null && 'games' in parsed) {
      const record = parsed as { folders?: unknown; games?: unknown }
      return {
        folders: Array.isArray(record.folders) ? record.folders.filter(isFolder) : [],
        games: Array.isArray(record.games)
          ? record.games.filter(isSavedGame).map(normalizeGame)
          : [],
      }
    }
  } catch {
    return { folders: [], games: [] }
  }

  return { folders: [], games: [] }
}

export function createFolder(userName: string, name: string) {
  const trimmed = name.trim()
  const state = getLibraryState(userName)
  if (!trimmed || state.folders.some((folder) => folder.name.toLowerCase() === trimmed.toLowerCase())) {
    return state
  }

  const next = {
    ...state,
    folders: [...state.folders, { id: createId(), name: trimmed }],
  }
  writeState(userName, next)
  return next
}

export function deleteFolder(userName: string, folderId: string) {
  const state = getLibraryState(userName)
  const next = {
    folders: state.folders.filter((folder) => folder.id !== folderId),
    games: state.games.map((game) =>
      game.folderId === folderId ? { ...game, folderId: null } : game,
    ),
  }
  writeState(userName, next)
  return next
}

export function saveGame(userName: string, game: SavedGame) {
  const state = getLibraryState(userName)
  const existing = state.games.find((item) => item.id === game.id)
  const nextGame = existing
    ? { ...existing, folderId: game.folderId }
    : { ...game, addedAt: Date.now() }
  const games = existing
    ? state.games.map((item) => (item.id === game.id ? nextGame : item))
    : [nextGame, ...state.games]

  const next = { ...state, games }
  writeState(userName, next)
  return next
}

export function removeGame(userName: string, id: number) {
  const state = getLibraryState(userName)
  const next = { ...state, games: state.games.filter((game) => game.id !== id) }
  writeState(userName, next)
  return next
}

function writeState(userName: string, state: LibraryState) {
  localStorage.setItem(storageKey(userName), JSON.stringify(state))
  window.dispatchEvent(new Event('library-change'))
}

function isFolder(value: unknown): value is Folder {
  if (typeof value !== 'object' || value === null) return false
  const folder = value as Folder
  return typeof folder.id === 'string' && typeof folder.name === 'string'
}

function isSavedGame(value: unknown): value is SavedGame {
  if (typeof value !== 'object' || value === null) return false
  const game = value as SavedGame
  return (
    typeof game.id === 'number' &&
    typeof game.title === 'string' &&
    typeof game.thumbnail === 'string' &&
    typeof game.genre === 'string' &&
    typeof game.release_date === 'string'
  )
}

function normalizeGame(game: SavedGame): SavedGame {
  return {
    ...game,
    addedAt: typeof game.addedAt === 'number' ? game.addedAt : Date.now(),
    folderId: typeof game.folderId === 'string' ? game.folderId : null,
  }
}
