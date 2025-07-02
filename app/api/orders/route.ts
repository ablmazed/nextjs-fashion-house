import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import OrderModel, { type OrderItem } from '@/lib/models/OrderModel'
import { round2 } from '@/lib/utils'
import { auth } from '@/lib/auth'

const calcPrices = (orderItems: OrderItem[]) => {
  // Calculate the items price
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  // Calculate the shipping price
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10)
  // Calculate the tax price
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)))
  // Calculate the total price
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = auth(async (req: any) => {
  console.log('POST request received')

  if (!req.auth) {
    console.log('Unauthorized request')
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }

  const { user } = req.auth
  console.log('Authenticated user:', user)

  try {
    const payload = await req.json()
    console.log('Received payload:', payload)

    // Validate required fields
    if (!payload.items || payload.items.length === 0) {
      return Response.json({ message: 'No items in order' }, { status: 400 })
    }

    if (!payload.shippingAddress) {
      return Response.json(
        { message: 'Shipping address is required' },
        { status: 400 }
      )
    }

    if (!payload.paymentMethod) {
      return Response.json(
        { message: 'Payment method is required' },
        { status: 400 }
      )
    }

    await dbConnect()
    console.log('Database connected')

    // Fix 2: Better product price validation
    const productIds = payload.items.map((x: { _id: string }) => x._id)
    const dbProductPrices = await ProductModel.find(
      { _id: { $in: productIds } },
      'price'
    )

    console.log('Found products:', dbProductPrices)

    if (dbProductPrices.length !== payload.items.length) {
      return Response.json(
        { message: 'Some products not found' },
        { status: 400 }
      )
    }

    // Fix 3: Correct product price mapping
    const dbOrderItems = payload.items.map((x: { _id: string }) => {
      const dbProduct = dbProductPrices.find(
        (p) => String(p._id) === String(x._id)
      )
      if (!dbProduct) {
        throw new Error(`Product not found: ${x._id}`)
      }
      return {
        ...x,
        product: x._id,
        price: dbProduct.price,
        _id: undefined,
      }
    })

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems)

    console.log('Creating order with data:', {
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: user._id,
    })

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: user._id,
    })

    const createdOrder = await newOrder.save()
    console.log('Order created successfully:', createdOrder)

    return Response.json(
      { message: 'Order has been created', order: createdOrder },
      { status: 201 }
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Order creation error:', err)
    return Response.json(
      { message: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
})
