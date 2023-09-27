import FormPost from "@/components/FormPost";
import { getUser } from "@/lib/auth";

export default function CreatePost () {

  const user  = getUser()

  return(
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-slate-950 to-slate-800  bg-cover  h-screen ">
      <h1 className="mt-2 mb-4 text-white text-2xl">Crie seu post</h1>
      <FormPost user={user}  />
    </div>
  )
}