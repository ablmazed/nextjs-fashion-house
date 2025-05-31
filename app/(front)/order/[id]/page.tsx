import OrderDetails from './OrderDetails'

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  return {
    title: `Order ${id}`,
  }
}

export default async function OrderHistory({ params }: Props) {
  const { id } = await params
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={id}
    />
  )
}
