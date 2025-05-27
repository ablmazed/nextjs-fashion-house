import data from '@/lib/data'
import Link from 'next/link'

export default async function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  const product = data.products.find((x) => x.slug === params.slug)
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
