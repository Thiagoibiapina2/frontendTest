  "use client"

  import { api } from "@/lib/api";

  import RemovePost from "./RemovePost";
  import EditButton from "./EditButton";

  import Cookies from "js-cookie";

  import { useEffect, useState } from "react";

 

  interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
  }

  
  

  const TAMANHO_MAX_CONTEUDO = 150

  export default  function CardPosts() {

    const [Posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {

    const fetchPosts = async () => {
   
        const token = Cookies.get('token');
        const response = await api.get('/Post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setPosts(response.data);

    };

      fetchPosts();
    }, []);

    const RemovePostFromState = (postId: string) => {
      setPosts((prevPosts) => prevPosts.filter((Posts) => Posts.id !== postId))
    }

    const truncateContent = (content: string): string => {
      if (content.length <= TAMANHO_MAX_CONTEUDO) {
        return content;
      }
      return content.substr(0, TAMANHO_MAX_CONTEUDO) + "...";
    };

    
    return (  
      <div className="flex flex-wrap mt-8">
      {Posts.length === 0 && <p className=" w-full text-center justify-center">Não há posts criados!</p>}
        {Posts.map((post) => (
          <div key={post.id} className="w-1/2 p-4 relative ">
            <div className="bg-white shadow-md rounded-lg p-4 h-32">
              <div className="flex flex-row justify-between">
                <div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                </div>
              <div className="flex flex-row">
              <EditButton Post={post} />    
              <RemovePost Post={post} onRemove={RemovePostFromState}   />
              </div>
              </div>   
              <p className="mt-2">{post.content && truncateContent(post.content)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  