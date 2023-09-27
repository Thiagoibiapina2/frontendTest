"use client"

import { useMessage } from '@/context/ErrorMessageContext';
import { useState, useEffect } from 'react';

interface MessageProps {
  msg: string | null; 
}

export default function Message({ msg}: MessageProps) {
  const [showMessage, setShowMessage] = useState(false);

  const {  clearMessages } = useMessage();

  useEffect(() => {
    if (msg) {
      setShowMessage(true);
      const timeout = setTimeout(() => {
        setShowMessage(false);
        clearMessages()
      }, 1500); //  tempo em milissegundos para exibir a mensagem 
      
      return () => clearTimeout(timeout);
    }
  }, [msg, clearMessages]);

  return (
    <div className={`z-10 top-0 left-0 w-full h-full flex justify-center items-center  ${showMessage ? 'block' : 'hidden'}`}>
      <div className="bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg mt-2 ">
        {msg}
      </div>
    </div>
  );
}
