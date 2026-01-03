import { createFileRoute, redirect } from '@tanstack/react-router'
import List from "@/features/products/index"

export const Route = createFileRoute('/_authenticated/products/')({
  validateSearch: () => (({}) as Record<string, string>),
  component: List,
  beforeLoad({ search }) {
    if (!('page' in search)) {
      throw redirect({
        search: {
          ...search,
          page: '1',
          limit: '10',
        },
        replace: true,
      })
    }
  },
})


