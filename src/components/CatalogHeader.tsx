import { AppNav } from './AppNav'
import { Brand } from './Brand'
import { GameSearch } from './GameSearch'

export function CatalogHeader() {
  return (
    <>
      <Brand />
      <AppNav />
      <GameSearch />
    </>
  )
}
