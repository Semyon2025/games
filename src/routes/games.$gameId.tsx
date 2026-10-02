import { createFileRoute, redirect } from '@tanstack/react-router'
import { GameDetails } from '../pages/GameDetails'
import { getSession } from '../lib/auth'

export const Route = createFileRoute('/games/$gameId')({
  beforeLoad: () => {
    if (!getSession()) throw redirect({ to: '/login' })
  },
  component: GamePage,
})

function GamePage() {
  const { gameId } = Route.useParams()
  return <GameDetails gameId={gameId} />
}
