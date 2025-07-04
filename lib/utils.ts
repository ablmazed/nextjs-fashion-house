import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString()
  return doc
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`
}
