import { cookies } from 'next/headers'
import decode from 'jwt-decode'


interface User {
  id: string
  name: string
  email: string
  iat: number
}

export function getUser() {
  const token: string | undefined = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }
  const user: User = decode(token)

  return user
}
