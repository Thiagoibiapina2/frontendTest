import Link from "next/link";


interface User {
  id: string,
  name: string;
  email: string;
  iat: number;
}



export default function Navbar({ user }: { user: User } ) {
  
  return (
    <div className="bg-slate-900 h-14 flex items-center justify-between">
      <div className="text-center mr-5 text-3xl text-white ml-8">
        Seja Bem-vindo <span className="text-slate-400">{user.name}</span>
      </div>
      <div className="flex flex-row">
      <Link className=" justify-center text-center text-white bg-slate-600 w-24 h-7 rounded mr-16" href='/CreatePost' >
          Criar Post
        </Link>
      </div>
    </div>
  );
}

