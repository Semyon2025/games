import { useState, type SubmitEvent } from 'react'
import type { Folder } from '../lib/library'
import styles from './FolderFilter.module.css'

type FolderFilterProps = {
  folders: Folder[]
  value: string
  onSelect: (folderId: string) => void
  onCreate: (name: string) => void
  onDelete: (folderId: string) => void
}

export function FolderFilter({
  folders,
  value,
  onSelect,
  onCreate,
  onDelete,
}: FolderFilterProps) {
  const [name, setName] = useState('')

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextName = name.trim()
    if (!nextName) return
    onCreate(nextName)
    setName('')
  }

  return (
    <div className={styles.folders}>
      <button
        type="button"
        className={value === 'all' ? `${styles.chip} ${styles.active}` : styles.chip}
        onClick={() => onSelect('all')}
      >
        Все
      </button>
      {folders.map((folder) => (
        <span
          key={folder.id}
          className={value === folder.id ? `${styles.folder} ${styles.active}` : styles.folder}
        >
          <button type="button" className={styles.name} onClick={() => onSelect(folder.id)}>
            {folder.name}
          </button>
          <button
            type="button"
            className={styles.delete}
            aria-label={`Удалить папку ${folder.name}`}
            onClick={() => onDelete(folder.id)}
          >
            ×
          </button>
        </span>
      ))}
      <form className={styles.form} onSubmit={submit}>
        <input
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Новая папка"
          aria-label="Название папки"
        />
        <button type="submit" className={styles.create}>
          Создать
        </button>
      </form>
    </div>
  )
}
