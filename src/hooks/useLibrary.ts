import { useEffect, useState } from 'react'
import { getSession } from '../lib/auth'
import { getLibraryState, type LibraryState } from '../lib/library'

export function useLibrary() {
  const userName = getSession()?.name ?? ''
  const [library, setLibrary] = useState<LibraryState>(() => getLibraryState(userName))

  useEffect(() => {
    const sync = () => setLibrary(getLibraryState(userName))
    window.addEventListener('library-change', sync)
    return () => window.removeEventListener('library-change', sync)
  }, [userName])

  return { userName, library }
}
