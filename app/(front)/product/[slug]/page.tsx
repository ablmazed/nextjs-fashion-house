import data from '@/lib/data'
import Link from 'next/link'

export default async function ProductDetails() {
  const product = data.products
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <>
      <div className="my-2">
        <Link href={'/'}>Back to product</Link>
      </div>
    </>
  )
}
