"use client"

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface ErrorMessageContextProps {
   Messages: string | null;
   setMessages: Dispatch<SetStateAction<string | null>>
   clearMessages: () => void; // Função para limpar mensagens de erro
}

const ErrorMessageContext = createContext<ErrorMessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [Messages, setMessages] = useState<string | null>(null);

  const clearMessages = () => {
    setMessages("");
  };
 

  return (
    <ErrorMessageContext.Provider value={{ Messages, setMessages, clearMessages }}>
      {children}
    </ErrorMessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(ErrorMessageContext);
  if (!context) {
    throw new Error('useErrorMessage must be used within an ErrorMessageProvider');
  }
  return context;
};
