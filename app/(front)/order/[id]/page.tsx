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

export default function OrderHistory({ params }: { params: { id: string } }) {
  return (
    <OrderDetails
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
      orderId={params.id}
    />
  )
}
