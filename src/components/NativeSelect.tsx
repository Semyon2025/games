import type { ComponentProps } from 'react'
import styles from './NativeSelect.module.css'

type NativeSelectProps = ComponentProps<'select'> & {
  inline?: boolean
}

export function NativeSelect({ className, inline = false, children, ...props }: NativeSelectProps) {
  const selectClass = className ? `${styles.select} ${className}` : styles.select
  const wrapClass = inline ? `${styles.wrap} ${styles.inline}` : styles.wrap

  return (
    <div className={wrapClass}>
      <select className={selectClass} {...props}>
        {children}
      </select>
      <Chevron />
    </div>
  )
}

export function NativeSelectOption(props: ComponentProps<'option'>) {
  return <option {...props} />
}

export function NativeSelectOptGroup(props: ComponentProps<'optgroup'>) {
  return <optgroup {...props} />
}

function Chevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4 6 L8 10 L12 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
