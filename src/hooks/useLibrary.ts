import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSession } from '../lib/auth'
import {
  createFolder,
  deleteFolder,
  getLibraryState,
  removeGame,
  saveGame,
  type SavedGame,
} from '../lib/library'

export const libraryKeys = {
  all: ['library'] as const,
  user: (userName: string) => ['library', userName] as const,
}

export function useLibrary() {
  const userName = getSession()?.name ?? ''
  const queryClient = useQueryClient()
  const key = libraryKeys.user(userName)

  // Query = прочитать коллекцию (у нас из localStorage, как будто с сервера)
  const libraryQuery = useQuery({
    queryKey: key,
    queryFn: () => getLibraryState(userName),
    enabled: Boolean(userName),
    initialData: () => getLibraryState(userName),
    staleTime: Infinity,
  })

  function syncCache(next: ReturnType<typeof getLibraryState>) {
    queryClient.setQueryData(key, next)
  }

  // Mutation = изменить коллекцию (даже localStorage оформляем как async «запрос»)
  const saveGameMutation = useMutation({
    mutationFn: async (game: SavedGame) => saveGame(userName, game),
    onSuccess: syncCache,
  })

  const removeGameMutation = useMutation({
    mutationFn: async (gameId: number) => removeGame(userName, gameId),
    onSuccess: syncCache,
  })

  const createFolderMutation = useMutation({
    mutationFn: async (name: string) => createFolder(userName, name),
    onSuccess: syncCache,
  })

  const deleteFolderMutation = useMutation({
    mutationFn: async (folderId: string) => deleteFolder(userName, folderId),
    onSuccess: syncCache,
  })

  return {
    userName,
    library: libraryQuery.data ?? { folders: [], games: [] },
    saveGame: saveGameMutation.mutate,
    removeGame: removeGameMutation.mutate,
    createFolder: createFolderMutation.mutate,
    createFolderAsync: createFolderMutation.mutateAsync,
    deleteFolder: deleteFolderMutation.mutate,
    isSaving: saveGameMutation.isPending || removeGameMutation.isPending,
  }
}
