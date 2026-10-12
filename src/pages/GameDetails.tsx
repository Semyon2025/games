import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { gameKeys, getGameById, getGames } from '../api/games'
import { AppNav } from '../components/AppNav'
import { Brand } from '../components/Brand'
import { DetailSection } from '../components/DetailSection'
import { DetailTop } from '../components/DetailTop'
import { GamePosterList } from '../components/GamePosterList'
import { GameSummary } from '../components/GameSummary'
import { Message } from '../components/Message'
import { MetaPills } from '../components/MetaPills'
import { Screen } from '../components/Screen'
import { ScreenshotList } from '../components/ScreenshotList'
import { useLibrary } from '../hooks/useLibrary'
import { formatRelease, plainText } from '../lib/format'
import { genreLabel, platformLabel } from '../lib/labels'
import styles from './GameDetails.module.css'

export function GameDetails({ gameId }: { gameId: string }) {
  const { library, saveGame, removeGame } = useLibrary()
  const [folderId, setFolderId] = useState('')
  const [toast, setToast] = useState(false)
  const gameQuery = useQuery({
    queryKey: gameKeys.detail(gameId),
    queryFn: () => getGameById(gameId),
  })
  const gamesQuery = useQuery({
    queryKey: gameKeys.all,
    queryFn: getGames,
  })

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(false), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  if (gameQuery.isPending) return <Message>Загрузка игры…</Message>
  if (gameQuery.isError) {
    return <Message error>Не удалось загрузить игру: {gameQuery.error.message}</Message>
  }

  const game = gameQuery.data
  const saved = library.games.find((item) => item.id === game.id)
  const similar = (gamesQuery.data ?? [])
    .filter((item) => item.id !== game.id && item.genre === game.genre)
    .slice(0, 4)

  function collect() {
    saveGame({
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      genre: game.genre,
      release_date: game.release_date,
      addedAt: saved?.addedAt ?? Date.now(),
      folderId: folderId || saved?.folderId || null,
    })
    setToast(true)
  }

  function changeFolder(nextFolder: string) {
    setFolderId(nextFolder)
    if (saved) {
      saveGame({ ...saved, folderId: nextFolder || null })
    }
  }

  return (
    <Screen>
      <DetailTop />
      <Brand />
      <AppNav />
      <article className={styles.detail}>
        <GameSummary
          title={game.title}
          thumbnail={game.thumbnail}
          publisher={game.publisher}
          saved={Boolean(saved)}
          folders={library.folders}
          folderId={folderId || saved?.folderId || ''}
          toast={toast}
          onCollect={collect}
          onRemove={() => removeGame(game.id)}
          onFolderChange={changeFolder}
        />
        <MetaPills
          release={formatRelease(game.release_date)}
          genre={genreLabel(game.genre)}
          platform={platformLabel(game.platform)}
        />
        <DetailSection title="Описание">
          <p>{plainText(game.description)}</p>
        </DetailSection>
        <DetailSection title="Платформы">
          <p>{platformLabel(game.platform)}</p>
        </DetailSection>
        {(game.screenshots ?? []).length > 0 ? (
          <DetailSection title="Медиа">
            <ScreenshotList shots={game.screenshots ?? []} />
          </DetailSection>
        ) : null}
        {similar.length > 0 ? (
          <DetailSection title="Похожие игры">
            <GamePosterList games={similar} align="start" />
          </DetailSection>
        ) : null}
      </article>
    </Screen>
  )
}
