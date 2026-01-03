import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import AuthWrapper from '@/components/layout/AuthWrapper'

const AuthLayout = () => {
  return <AuthWrapper><AuthenticatedLayout /></AuthWrapper>
}

export const Route = createFileRoute('/_authenticated')({
  component: AuthLayout,
})
