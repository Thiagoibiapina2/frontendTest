import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import { cookies } from 'next/headers';
import HomePage from "@/components/HomePage"





export default function AppHome() {  

  const isAuthenticated = cookies().get('token')
  if (!isAuthenticated) {
    redirect('/login');
  }


  const user  = getUser()
  
  return (
    <>
    <HomePage user={user}/>
    </>
  );
}

