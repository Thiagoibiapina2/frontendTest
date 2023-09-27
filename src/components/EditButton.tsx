
 import Link from 'next/link';

 import { AiFillEdit } from 'react-icons/ai';


interface PostType {
  authorId: string;
  content: string;
  id: string;
  published: boolean;
  title: string;
}

interface RemovePostsProps {
  Post: PostType;
}

export default function EditButton ({Post}:RemovePostsProps) {

return (
  <Link  className="p-2 ml-4 bg-slate-600 text-white rounded-full transform hover:scale-110 transition-transform duration-200" title="Editar" href={`/UpdatePost/?id=${Post.id}`}>
      <AiFillEdit /> 
  </Link>
)
} 