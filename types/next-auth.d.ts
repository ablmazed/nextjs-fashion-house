import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
      name: string
      email: string
      isAdmin: boolean
    }
  }

  interface User {
    _id: string
    name: string
    email: string
    isAdmin: boolean
  }
}
