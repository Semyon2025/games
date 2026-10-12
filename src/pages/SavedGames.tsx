import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { gameKeys, gameYear, getGames } from '../api/games'
import { CatalogHeader } from '../components/CatalogHeader'
import { FolderFilter } from '../components/FolderFilter'
import { GameFilters } from '../components/GameFilters'
import { GamePosterList } from '../components/GamePosterList'
import { Message } from '../components/Message'
import { PageTitle } from '../components/PageTitle'
import { Pagination } from '../components/Pagination'
import { Screen } from '../components/Screen'
import { useLibrary } from '../hooks/useLibrary'
import { genreLabel, matchesLabel, matchesPlatform, platformLabel, uniqueLabels } from '../lib/labels'

const PAGE_SIZE = 20

export function SavedGames() {
  const { library, removeGame, createFolderAsync, deleteFolder } = useLibrary()
  const gamesQuery = useQuery({
    queryKey: gameKeys.all,
    queryFn: getGames,
  })
  const [sort, setSort] = useState<'asc' | 'desc'>('desc')
  const [genre, setGenre] = useState('all')
  const [platform, setPlatform] = useState('all')
  const [folderId, setFolderId] = useState('all')
  const [page, setPage] = useState(1)

  const platformById = new Map((gamesQuery.data ?? []).map((game) => [game.id, game.platform]))
  const inFolder =
    folderId === 'all' ? library.games : library.games.filter((game) => game.folderId === folderId)
  const visibleGames = inFolder
    .filter(
      (game) =>
        matchesLabel(game.genre, genre, genreLabel) &&
        matchesPlatform(platformById.get(game.id) ?? '', platform),
    )
    .toSorted((a, b) => (sort === 'desc' ? gameYear(b) - gameYear(a) : gameYear(a) - gameYear(b)))
  const pageCount = Math.max(1, Math.ceil(visibleGames.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageGames = visibleGames.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  async function addFolder(name: string) {
    const next = await createFolderAsync(name)
    const created = next.folders.find((folder) => folder.name.toLowerCase() === name.toLowerCase())
    if (created) setFolderId(created.id)
    setPage(1)
  }

  return (
    <Screen>
      <CatalogHeader />
      <section>
        <PageTitle>Сохранённые игры</PageTitle>
        <GameFilters
          sort={sort}
          genre={genre}
          platform={platform}
          genres={uniqueLabels(
            inFolder.map((game) => game.genre),
            genreLabel,
          )}
          platforms={uniqueLabels(
            inFolder.flatMap((game) => (platformById.get(game.id) ?? '').split(',')),
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
        <FolderFilter
          folders={library.folders}
          value={folderId}
          onSelect={(next) => {
            setFolderId(next)
            setPage(1)
          }}
          onCreate={addFolder}
          onDelete={(id) => {
            deleteFolder(id)
            if (folderId === id) setFolderId('all')
          }}
        />
        {pageGames.length === 0 ? (
          <Message>
            {inFolder.length === 0
              ? folderId === 'all'
                ? 'Пока пусто. Найдите игру и добавьте её в коллекцию.'
                : 'В этой папке пока нет игр.'
              : 'Ничего не найдено.'}
          </Message>
        ) : (
          <GamePosterList
            games={pageGames}
            motionKey={`${folderId}-${sort}-${genre}-${platform}-${currentPage}`}
            isSaved={() => true}
            onToggle={(game) => removeGame(game.id)}
          />
        )}
        <Pagination page={currentPage} pageCount={pageCount} onPage={setPage} />
      </section>
    </Screen>
  )
}
