import '@tanstack/react-table'
import type { Screen } from '@/hooks/use-table-hide'



declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string // apply to both th and td
    tdClassName?: string
    thClassName?: string
    hideBelow?: Screen
    priority?: number // optional, for auto-collapse
  }
}
