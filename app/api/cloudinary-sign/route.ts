import { auth } from '@/lib/auth'
import cloudinary from 'cloudinary'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET!
  )

  return Response.json({ signature, timestamp })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any
