import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { gameKeys, gameYear, getGames, type Game } from '../api/games'
import { CatalogHeader } from '../components/CatalogHeader'
import { GameFilters } from '../components/GameFilters'
import { GamePosterList } from '../components/GamePosterList'
import { Message } from '../components/Message'
import { PageTitle } from '../components/PageTitle'
import { Pagination } from '../components/Pagination'
import { Screen } from '../components/Screen'
import { useLibrary } from '../hooks/useLibrary'
import { genreLabel, matchesLabel, matchesPlatform, platformLabel, uniqueLabels } from '../lib/labels'
import { removeGame, saveGame } from '../lib/library'

const PAGE_SIZE = 20

export function AllGames() {
  const { userName, library } = useLibrary()
  const gamesQuery = useQuery({
    queryKey: gameKeys.all,
    queryFn: getGames,
  })
  const [sort, setSort] = useState<'asc' | 'desc'>('desc')
  const [genre, setGenre] = useState('all')
  const [platform, setPlatform] = useState('all')
  const [page, setPage] = useState(1)

  const savedIds = new Set(library.games.map((game) => game.id))
  const games = gamesQuery.data ?? []
  const sorted = games
    .filter(
      (game) =>
        matchesLabel(game.genre, genre, genreLabel) && matchesPlatform(game.platform, platform),
    )
    .sort((a, b) => (sort === 'desc' ? gameYear(b) - gameYear(a) : gameYear(a) - gameYear(b)))
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageGames = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function toggleSave(game: Game) {
    if (savedIds.has(game.id)) {
      removeGame(userName, game.id)
      return
    }

    saveGame(userName, {
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      genre: game.genre,
      release_date: game.release_date,
      addedAt: Date.now(),
      folderId: null,
    })
  }

  return (
    <Screen>
      <CatalogHeader />
      <section>
        <PageTitle>Все игры</PageTitle>
        <GameFilters
          sort={sort}
          genre={genre}
          platform={platform}
          genres={uniqueLabels(games.map((game) => game.genre), genreLabel)}
          platforms={uniqueLabels(
            games.flatMap((game) => game.platform.split(',')),
            platformLabel,
          )}
          onSort={(next) => {
            setSort(next)
            setPage(1)
          }}
          onGenre={(next) => {
            setGenre(next)
            setPage(1)
          }}
          onPlatform={(next) => {
            setPlatform(next)
            setPage(1)
          }}
        />
        {gamesQuery.isPending ? <Message>Загрузка игр…</Message> : null}
        {gamesQuery.isError ? (
          <Message error>Не удалось загрузить игры: {gamesQuery.error.message}</Message>
        ) : null}
        {pageGames.length > 0 ? (
          <GamePosterList
            games={pageGames}
            motionKey={`${sort}-${genre}-${platform}-${currentPage}`}
            isSaved={(game) => savedIds.has(game.id)}
            onToggle={toggleSave}
          />
        ) : gamesQuery.isSuccess ? (
          <Message>Ничего не найдено.</Message>
        ) : null}
        <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />
      </section>
    </Screen>
  )
}
