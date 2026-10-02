import styles from './Pagination.module.css'

type PaginationProps = {
  page: number
  pageCount: number
  onPage: (page: number) => void
}

export function Pagination({ page, pageCount, onPage }: PaginationProps) {
  if (pageCount <= 1) return null

  return (
    <nav className={styles.pagination} aria-label="Страницы">
      <ul>
        <li>
          <button
            type="button"
            className={styles.button}
            disabled={page === 1}
            onClick={() => onPage(page - 1)}
          >
            <Chevron direction="left" />
            Назад
          </button>
        </li>
        {pageItems(page, pageCount).map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === 'ellipsis' ? (
              <span aria-hidden="true">…</span>
            ) : (
              <button
                type="button"
                className={item === page ? `${styles.button} ${styles.active}` : styles.button}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => onPage(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            type="button"
            className={styles.button}
            disabled={page === pageCount}
            onClick={() => onPage(page + 1)}
          >
            Далее
            <Chevron direction="right" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

function pageItems(page: number, pageCount: number) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const items: Array<number | 'ellipsis'> = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(pageCount - 1, page + 1)

  if (start > 2) items.push('ellipsis')
  for (let number = start; number <= end; number += 1) items.push(number)
  if (end < pageCount - 1) items.push('ellipsis')
  items.push(pageCount)
  return items
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M10 3 L5 8 L10 13' : 'M6 3 L11 8 L6 13'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
