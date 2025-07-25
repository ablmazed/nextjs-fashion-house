import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }
  await dbConnect()
  const product = await ProductModel.findById(params.id)
  if (!product) {
    return Response.json(
      { message: 'product not found' },
      {
        status: 404,
      }
    )
  }
  return Response.json(product)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  const {
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description,
  } = await req.json()

  try {
    await dbConnect()

    const product = await ProductModel.findById(params.id)
    if (product) {
      product.name = name
      product.slug = slug
      product.price = price
      product.category = category
      product.image = image
      product.brand = brand
      product.countInStock = countInStock
      product.description = description

      const updatedProduct = await product.save()
      return Response.json(updatedProduct)
    } else {
      return Response.json(
        { message: 'Product not found' },
        {
          status: 404,
        }
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args

  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  try {
    await dbConnect()
    const product = await ProductModel.findById(params.id)
    if (product) {
      await product.deleteOne()
      return Response.json({ message: 'Product deleted successfully' })
    } else {
      return Response.json(
        { message: 'Product not found' },
        {
          status: 404,
        }
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any
