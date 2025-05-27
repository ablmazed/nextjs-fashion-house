import Image from 'next/image'
import Link from 'next/link'

export default async function ProductDetails() {
  //   {
  //   params,
  // }: {
  //   params: { slug: string }
  // }
  const data = {
    products: [
      {
        name: 'Free Shirt',
        slug: 'free-shirt',
        category: 'Shirts',
        image: '/images/shirt1.jpg',
        price: 70,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 8,
        countInStock: 20,
        description: 'A popular shirt',
        isFeatured: true,
        banner: '/images/banner1.jpg',
      },
      {
        name: 'Fit Shirt',
        slug: 'fit-shirt',
        category: 'Shirts',
        image: '/images/shirt2.jpg',
        price: 80,
        brand: 'Adidas',
        rating: 3.2,
        numReviews: 10,
        countInStock: 20,
        description: 'A popular shirt',
        isFeatured: true,
        banner: '/images/banner2.jpg',
      },
      {
        name: 'Slim Shirt',
        slug: 'slim-shirt',
        category: 'Shirts',
        image: '/images/shirt3.jpg',
        price: 90,
        brand: 'Raymond',
        rating: 4.5,
        numReviews: 3,
        countInStock: 20,
        description: 'A popular shirt',
      },
      {
        name: 'Golf Pants',
        slug: 'golf-pants',
        category: 'Pants',
        image: '/images/pants1.jpg',
        price: 90,
        brand: 'Oliver',
        rating: 2.9,
        numReviews: 13,
        countInStock: 20,
        description: 'Smart looking pants',
      },
      {
        name: 'Fit Pants',
        slug: 'fit-pants',
        category: 'Pants',
        image: '/images/pants2.jpg',
        price: 95,
        brand: 'Zara',
        rating: 3.5,
        numReviews: 7,
        countInStock: 20,
        description: 'A popular pants',
      },
      {
        name: 'Classic Pants',
        slug: 'classic-pants',
        category: 'Pants',
        image: '/images/pants3.jpg',
        price: 75,
        brand: 'Casely',
        rating: 2.4,
        numReviews: 14,
        countInStock: 20,
        description: 'A popular pants',
      },
    ],
  }
  const product = data.products.find((x) => x.slug)
  console.log(product)
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">back to products show</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>

            <li> {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card  bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
