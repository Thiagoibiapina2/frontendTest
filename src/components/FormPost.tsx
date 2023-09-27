'use client'

import React, { useState } from 'react';

import { api } from '../lib/api'

import { AxiosError } from 'axios';

import { useRouter } from 'next/navigation';

import {  useMessage } from '@/context/ErrorMessageContext';
import ErrorMessage  from '../components/Message';


interface User {
  id: string;
  name: string;
  email: string;
  iat: number;
}

interface FormPostProps {
  user: User;
}

export default function FormPost( {user}: FormPostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);

  const { setMessages, Messages, clearMessages } = useMessage();

  const router = useRouter()
 
  const handleSubmitPost = async  (e: React.FormEvent) => {
    e.preventDefault();

    clearMessages()

    try {
      const post = {
        title,
        content,
        published,
        authorId: user.id,
      }

      console.log(user)

      const res = await api.post("/Post", post)

  

      router.push('/Home')

      setMessages(res.data.msg)


      setTitle('');
      setContent('');
      setPublished(true)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response)
        setMessages(error.response?.data.msg)
      } 
    }
  }

  return (
    <>
    <ErrorMessage  msg={Messages} />
    <form onSubmit={handleSubmitPost} className="backdrop-blur-sm bg-white/20 p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="postTitle">
            Título do Post:
          </label>
          <input
            id="postTitle"
            className="w-48rem text-white rounded p-2 bg-transparent border-gray-400"
            placeholder="Digite o título do post..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="postContent">
            Conteúdo do Post:
          </label>
          <textarea
            id="postContent"
            className="w-48rem h-80 text-white  rounded p-2 bg-transparent border-gray-400"
            placeholder="Digite o conteúdo do post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
              checked={published}
              onChange={() => setPublished(true)}
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
              checked={!published}
              onChange={() => setPublished(false)}
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
    </>
  );
}

/*
<button type="button" className="text-white bg-red-700 w-24 h-7 rounded ml-2">
        Cancelar
      </button>
      */


