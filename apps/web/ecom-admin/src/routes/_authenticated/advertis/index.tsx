import { createFileRoute } from '@tanstack/react-router'
import Index from '@/features/advertis'

export const Route = createFileRoute('/_authenticated/advertis/')({
    component: Index,
})
