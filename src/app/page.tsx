import { redirect } from 'next/navigation'

export default function RootPage() {
  // ADR §5.1: `/` redirects to default locale `/vi`.
  redirect('/vi')
}
