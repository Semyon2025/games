import { createFileRoute, redirect } from '@tanstack/react-router'
import { AllGames } from '../pages/AllGames'
import { getSession } from '../lib/auth'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (!getSession()) throw redirect({ to: '/login' })
  },
  component: AllGames,
})
