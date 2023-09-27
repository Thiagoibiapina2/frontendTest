'use client'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/lib/api'

import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { useMessage } from '@/context/ErrorMessageContext'
import ErrorMessage from '../../components/Message';


const schema = z.object({
  // name: z.string().nonempty('O nome é obrigatório'),
  email: z
    .string()
    .email('Digite um email válido')
    .nonempty('O email é obrigatório'),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(6, 'A senha deve ter pelos menos 6 digitos'),
})
type FormData = z.infer<typeof schema>

type UserRegister = {
  email: string,
  password: string
}


export default function Login() {
  const router = useRouter()

  const { setMessages, Messages, clearMessages } = useMessage();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })



  async function handleLogin(data: UserRegister): Promise<void> {

    try {
      clearMessages()

      const response = await api.post('/auth', data);
      const  token  = response.data.token; // Extrai o token da resposta

      // Armazena o token nos cookies                                                                           
      Cookies.set('token', token);

      
      router.push('/Home')
      // Redireciona para a próxima página

    } catch (error) {
      if (error instanceof AxiosError) {
        setMessages(error.response?.data?.msg);
      }  // tratar o erro de acordo com a resposta do servidor
    }
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 to-slate-800 max-h-screen">
      <div className='h-14'>
        {Messages && <ErrorMessage msg={Messages} />}
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          className="flex flex-col items-center justify-center bg-white/20  h-96 w-80"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h1 className='mb-4 text-2xl text-white'>Login</h1>
          <label className="flex flex-col m-4 text-white">
            Email
            <input
              className=" h-8 w-60 border-gray-400 shadow-sm rounded bg-transparent text-white  mt-2 px-3"
              {...register('email')}
              type="text"
              placeholder="Digite seu email"
            />
            <span className=" text-red-600 text-xs mt-1">
              {errors.email?.message}
            </span>
          </label>

          <label className="flex flex-col m-4 text-white">
            Senha
            <input
              className=" h-8 w-60 border-gray-400 shadow-sm rounded bg-transparent text-white  mt-2 px-3"
              {...register('password')}
              type="password"
              placeholder="Digite sua senha"
            />
            <span className=" text-red-600 text-xs mt-1">
              {errors.password?.message}
            </span>
          </label>

          <div className="flex flex-col items-center text-white text-center mt-4">
            <button
              className=" bg-slate-900  w-24 h-8 text-center rounded cursor-pointer"
              type="submit"
            >
              Cadastrar
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}


