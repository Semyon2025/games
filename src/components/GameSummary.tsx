import type { Folder } from '../lib/library'
import { PageTitle } from './PageTitle'
import styles from './GameSummary.module.css'

type GameSummaryProps = {
  title: string
  thumbnail: string
  publisher: string
  saved: boolean
  folders: Folder[]
  folderId: string
  toast: boolean
  onCollect: () => void
  onRemove: () => void
  onFolderChange: (folderId: string) => void
}

export function GameSummary({
  title,
  thumbnail,
  publisher,
  saved,
  folders,
  folderId,
  toast,
  onCollect,
  onRemove,
  onFolderChange,
}: GameSummaryProps) {
  return (
    <>
      <img className={styles.cover} src={thumbnail} alt="" />
      <div>
        <PageTitle>{title}</PageTitle>
        <p className={styles.publisher}>{publisher}</p>
        <div className={styles.row}>
          <button type="button" className={styles.collect} onClick={onCollect}>
            {saved ? 'В коллекции' : 'В коллекцию'}
          </button>
          {folders.length > 0 ? (
            <select
              className={styles.select}
              value={folderId}
              onChange={(event) => onFolderChange(event.target.value)}
              aria-label="Папка"
            >
              <option value="">Без папки</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          ) : null}
          {saved ? (
            <button type="button" className={styles.remove} onClick={onRemove}>
              Убрать
            </button>
          ) : null}
        </div>
        {toast ? (
          <div className={styles.toast} role="status">
            <strong>Игра в коллекции</strong>
            <span>{title} добавлена в вашу коллекцию</span>
          </div>
        ) : null}
      </div>
    </>
  )
}
