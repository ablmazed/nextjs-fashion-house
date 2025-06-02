import AdminLayout from '@/components/admin/AdminLayout'
import Form from './Form'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  return {
    title: `Edit User ${id}`,
  }
}

export default async function OrderHistory({ params }: Props) {
  const { id } = await params
  return (
    <AdminLayout activeItem="products">
      <Form userId={id} />
    </AdminLayout>
  )
}
