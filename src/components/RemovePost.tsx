'use client'

import { useMessage } from '@/context/ErrorMessageContext';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';

import { MdDeleteForever } from 'react-icons/md';

interface PostType {
  authorId: string;
  content: string;
  id: string;
  published: boolean;
  title: string;
}


export default function RemovePosts ({ Post, onRemove }:{Post:PostType; onRemove: (postId: string) => void}) {

  const { setMessages } = useMessage();

 const removePost = async  () => {
  
  try {
    const res = await api.delete(`/Post/${Post.id}`
    )
    onRemove(Post.id)
    setMessages(res.data.msg)



  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response)
      setMessages(error.response?.data?.msg);
    } 
  }

  }
  return(
    <button className="p-2 ml-4 bg-slate-600 text-white rounded-full transform hover:scale-110 transition-transform duration-200" title="remover" onClick={removePost} >
    <MdDeleteForever/>
  </button>
  )
}