  'use client'

  import { useForm } from 'react-hook-form'

  import { zodResolver } from '@hookform/resolvers/zod'

  import Link from 'next/link'
  import  { useRouter } from 'next/navigation'

  import { api } from '@/lib/api'

  import { z } from 'zod'

  import ErrorMessage  from '../components/Message';
  import { useMessage } from '@/context/ErrorMessageContext'

  import { AxiosError } from 'axios'

  import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

  import Cookies from 'js-cookie';


  const schema = z.object({
    name: z.string().nonempty('O nome é obrigatório'),
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
    name:string,
    email: string,
    password: string
  }

  export default function Home() {
    const router = useRouter()

    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(schema),
    })

    const { setMessages, Messages, clearMessages } = useMessage();

    async function handleRegistration(data: UserRegister) {

      try {
      clearMessages()

      const response = await api.post('/User', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      
      const  token   =  response.data.token

     
      // Armazena o token nos cookies
      Cookies.set('token', token);
      console.log('ola', token)    
    
      setMessages(response.data.msg)                                                          
    
    router.push('/Home')
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessages(error.response?.data?.msg);
      } 
    }
    }

    

    return (
      <div className="bg-gradient-to-r from-slate-950 to-slate-800">
        <div>
          <div className=' h-10'>
          {Messages && <ErrorMessage msg={Messages} />}
          </div>
          <div className="flex items-center justify-between h-screen  ">
            <div className='flex flex-col text-center items-center justify-center text-white ml-32 h-96'>
              <h1 className=' text-3xl mb-5'>Crie seus Posts</h1>
              <p>Este site foi criado para usuario poder criar posts,<br/> conforme o usuario estiver  logado,<br/> site feito para testar conhecimentos, de autenticação e login,<br/> criação de back-end, com as principais funções HTTP</p>
              <div className='flex gap-4'>
              <a className='text-3xl mt-3 transform hover:scale-110 transition-transform duration-200' href="https://github.com/Thiagoibiapina2" target='blank'> <AiFillGithub/> </a>
              <a className='text-3xl mt-3 transform hover:scale-110 transition-transform duration-200' href="https://www.linkedin.com/in/thiago-aguiar-335b6a186" target='blank'> <AiFillLinkedin/> </a>
              </div>
            </div>
            <form
              className="flex flex-col items-center justify-center bg-white/20 rounded h-32rem w-96 mr-32 "
              onSubmit={handleSubmit(handleRegistration)}
            >
              <h1 className='text-center text-3xl text-white mb-8'>Cadastre-se</h1>
              <label className="flex flex-col m-4 text-white">
                Nome
                <input
                  className=" h-8 w-60 border-gray-400 shadow-sm rounded text-white  bg-transparent  mt-2 px-3"
                  {...register('name')}
                  type="text"
                  placeholder="Digite seu nome"
                />
                <span className="  text-red-600 text-xs mt-1">
                  {errors.name?.message}
                </span>
              </label>

              <label className="flex flex-col m-4 text-white">
                Email
                <input
                  className=" h-8 w-60 border-gray-400 shadow-sm rounded text-white  bg-transparent mt-2 px-3"
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
                  className=" h-8 w-60 border-gray-400 shadow-sm rounded text-slate-300  bg-transparent mt-2 px-3"
                  {...register('password')}
                  type="password"
                  placeholder="Digite sua senha"
                />
                <span className=" text-red-600 text-xs mt-1">
                  {errors.password?.message}
                </span>
              </label>

              <div className="flex flex-col items-center text-white text-center mt-2">
                <button
                  className=" bg-slate-900 w-24 h-8 text-center rounded cursor-pointer"
                  type="submit"
                >
                  Cadastrar
                </button>
                <Link
                  href="/login"
                  className=" mt-2 hover:text-gray-400 cursor-pointer"
                >
                  Ja possui uma conta?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
