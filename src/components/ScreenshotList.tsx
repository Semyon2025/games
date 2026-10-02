import styles from './ScreenshotList.module.css'

type Shot = {
  id: number
  image: string
}

export function ScreenshotList({ shots }: { shots: Shot[] }) {
  if (shots.length === 0) return null

  return (
    <ul className={styles.row}>
      {shots.map((shot) => (
        <li key={shot.id}>
          <img src={shot.image} alt="" />
        </li>
      ))}
    </ul>
  )
}
