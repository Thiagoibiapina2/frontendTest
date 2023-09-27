'use client'

import Message from '../components/Message'
import CardPosts from '../components/CardPosts'
import Navbar from '../components/Navbar'
import { useMessage } from '@/context/ErrorMessageContext'

interface User {
  id: string
  name: string
  email: string
  iat: number
}

export default function HomePage({ user }: { user: User }) {
  const { Messages } = useMessage() // Acessa a mensagem de sucesso e a função para limpá-la

  return (
    <>
      <Navbar user={user} />
      <Message msg={Messages} />
      <CardPosts />
    </>
  )
}
