import products from '@/lib/data'
import Image from 'next/image'
import React from 'react'

export default function ProductDetails({
  productdata,
}: {
  productdata: { slug: string }
}) {
  const slug = productdata?.slug
  const product = products.find((p) => p.slug === slug)
  if (!product) return <div>Product not found</div>

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="w-full object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-2">Brand: {product.brand}</p>
          <p className="text-xl text-primary mb-4">${product.price}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  )
}
