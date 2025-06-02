import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args
  if (!req.auth) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  try {
    await dbConnect()
    const user = await UserModel.findById(params.id)
    if (user) {
      if (user.isAdmin)
        return Response.json(
          { message: 'User is admin' },
          {
            status: 400,
          }
        )
      await user.deleteOne()
      return Response.json({ message: 'User deleted successfully' })
    } else {
      return Response.json(
        { message: 'User not found' },
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
