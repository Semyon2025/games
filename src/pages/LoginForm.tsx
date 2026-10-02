import { useNavigate } from '@tanstack/react-router'
import { useState, type SubmitEvent } from 'react'
import { setSession } from '../lib/auth'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (trimmedName.length < 2) {
      setError('Введите имя не короче 2 символов.')
      return
    }

    if (password.length < 4) {
      setError('Пароль должен быть не короче 4 символов.')
      return
    }

    setSession({ name: trimmedName })
    void navigate({ to: '/' })
  }

  return (
    <section className={styles.screen}>
      <form className={styles.card} onSubmit={onSubmit}>
        <p className={styles.eyebrow}>С возвращением</p>
        <h1>Вход</h1>
        <p className={styles.copy}>
          Локальная демо-сессия. Пароль остаётся в этой форме и не сохраняется.
        </p>
        <label className={styles.field}>
          Имя
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="username"
            placeholder="Алекс"
          />
        </label>
        <label className={styles.field}>
          Пароль
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="••••"
          />
        </label>
        {error ? <p className={styles.error}>{error}</p> : null}
        <button type="submit" className={styles.submit}>
          Продолжить
        </button>
      </form>
    </section>
  )
}
