'use client'

import { useEffect, useState } from 'react';

import { api } from '../../lib/api'

import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { useMessage } from '@/context/ErrorMessageContext';
import ErrorMessage from '@/components/Message';


export default function UpdatePost() {


  const [post, setPost] = useState({
    authorId: '',
    content: '',
    id: '',
    published: true,
    title: '',
  })


  const { setMessages, Messages, clearMessages } = useMessage();
  const router = useRouter()
  
  useEffect(() => {

    const queryParams = window.location.search;
    const params = new URLSearchParams(queryParams);
    
    //  acessar os parâmetros da URL usando o objeto params
    const postId = params.get('id');

    if (postId) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/Post/${postId}`)
          setPost(res.data)
        } catch (error) {
          if (error instanceof AxiosError) {
            setMessages(error.response?.data.msg)
          } 
        }
      }

      fetchPost()
    }

  }, [setMessages])

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    clearMessages()

    try {
      const res = await api.put(`/Post/${post.id}`, post)

      router.push('/Home')

      setMessages(res?.data?.msg);

      clearMessages()

    } catch (error) {
      if (error instanceof AxiosError) {
         setMessages(error.response?.data?.msg);
      } // tratar o erro de acordo com a resposta do servidor
    }
  }

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-slate-950 to-slate-800  bg-cover  h-screen ">
      <ErrorMessage  msg={Messages} />
      <form onSubmit={handleUpdatePost} className="backdrop-blur-sm bg-white/20 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="postTitle">
          Título do Post:
        </label>
        <input
          id="postTitle"
          className="w-48rem text-white rounded p-2 bg-transparent border-gray-400"
          placeholder="Digite o título do post..."
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })} />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="postContent">
          Conteúdo do Post:
        </label>
        <textarea
          id="postContent"
          className="w-48rem h-80 text-white rounded p-2 bg-transparent border-gray-400"
          placeholder="Digite o conteúdo do post..."
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="text-white text-sm font-bold mb-2">Público:</label>
        <div className="flex flex-row items-center">
          <div className="flex items-center mr-4">
            <input
              type="radio"
              id="publicYes"
              name="isPublic"
              value='true'
              checked={post.published}
              onChange={(e) => setPost({ ...post, published: e.target.value === 'true' })}
            />
            <label htmlFor="publicYes" className="ml-2 text-white">
              Sim
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="publicNo"
              name="isPublic"
              value="false"
              checked={post.published === false}
              onChange={() => setPost({ ...post, published: false })}
            />
            <label htmlFor="publicNo" className="ml-2 text-white">
              Não
            </label>
          </div>
        </div>
      </div>
      <button type="submit" className="text-white bg-green-700 w-24 h-7 rounded">
        Criar
      </button>
    </form>
    </div>
  );
}


