import { apiClient } from './client'

export type Game = {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export type GameDetails = Game & {
  status: string
  description: string
  screenshots: { id: number; image: string }[]
}

export const gameKeys = {
  all: ['games'] as const,
  detail: (id: string) => ['games', id] as const,
}

export async function getGames() {
  const { data } = await apiClient.get<Game[]>('/games')
  return data
}

export function gameYear(game: { release_date: string }) {
  const year = Number(game.release_date.slice(0, 4))
  return Number.isFinite(year) ? year : 0
}

export async function getGameById(id: string) {
  const { data } = await apiClient.get<GameDetails>('/game', {
    params: { id },
  })
  return data
}
