import { createFileRoute, redirect } from '@tanstack/react-router'
import { SavedGames } from '../pages/SavedGames'
import { getSession } from '../lib/auth'

export const Route = createFileRoute('/my-games')({
  beforeLoad: () => {
    if (!getSession()) throw redirect({ to: '/login' })
  },
  component: SavedGames,
})
