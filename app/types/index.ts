// export type Product = {
//   _id?: string
//   name: string
//   slug: string
//   image: string
//   banner?: string
//   price: number
//   brand: string
//   description: string
//   category: string
//   rating: number
//   numReviews: number
//   countInStock: number
//   colors?: string[] // or any[] if mixed types
//   sizes?: string[] // or any[]
// }

import { Types } from 'mongoose'

export type Product = {
  _id?: string | Types.ObjectId
  name: string
  slug: string
  image: string
  banner?: string
  price: number
  brand: string
  description: string
  category: string
  rating: string
  numReviews: number
  countInStock: number
}
