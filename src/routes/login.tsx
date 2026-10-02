import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '../pages/LoginForm'
import { getSession } from '../lib/auth'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (getSession()) throw redirect({ to: '/' })
  },
  component: LoginForm,
})
