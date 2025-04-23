import { MdInsertPhoto } from "react-icons/md";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useState } from "react";
import { imageTo64Base } from "@/utils/base64";
import { FaFeather, FaGit } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";
import { createPostRTK } from "@/store/Api/postsApi";
import { Button } from "./ui/button";


const Post = () => {
  const user = useAppSelector((state)=> state.user);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File| undefined>(undefined);
  const [post, setPost]= useState<{title: string, img: string}>({title:"",img: ""});

  const handleImage = async(e: React.ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files) {
      const base64 = await imageTo64Base(e.target.files[0]);
      setPost((prev)=> ({...prev, img: base64}));
      setImage(e.target.files[0]);
    }
  }
  function resetData(){
    setImage(undefined);
    setPost({title:"", img:""})
  }
  
  const handleSubmit = ()=>{
    const formData = new FormData();
    formData.append("decsription", post.title);
    if (image) {
      formData.append("post", image);
    }
    dispatch(createPostRTK({data: formData})).then(()=>{
      resetData();
    })
  }
  
  return (
    <div className="post pb-3 brd">
    <form className="flex flex-col p-2">
      <article className="flex gap-4 p-2">
      <img src={user.data?.profilePhoto?.url} className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-gray-400" />
    <textarea name="post" id="post" value={post.title}
    onChange={(e)=> setPost((prev)=> ({...prev, title: e.target.value}))}
    className="p-2 w-full h-12 md:h-16 bg-transparent focus:outline-none resize-none" placeholder="what's happening?"></textarea>
      </article>
    {image && <img src={post.img} className="rounded-xl w-full" />  }
    </form>
    <div className="flex p-2 md:p-4 w-full items-center justify-between">
      <a className="relative text-blue-400 overflow-hidden" >
      <MdInsertPhoto className="text-xl " />
      <input type="file" title="upload post photo" onChange={handleImage} className="absolute cursor-pointer top-0 right-0" />
      </a>
      <a href="" className="text-blue-400 rounded-full p-2">
      <FaGit className="text-xl" />
      </a>
      <a href="" className="text-blue-400 rounded-full p-2">
      <FaSquarePollHorizontal className="text-xl" />
      </a>
      <a href="" className="text-blue-400 rounded-full p-2">
      <FaFaceSmile className="text-xl" />
      </a>
      <a href="" className="text-blue-400 rounded-full p-2">
      <FaBusinessTime className="text-xl" />
      </a>

    <div className="ml-auto w-26 mr-1">
    <Button onClick={handleSubmit} className="bg-blue-400 dark:bg-blue-400 dark:text-white dark:hover:text-black cursor-pointer rounded-full h-11 w-11 lg:h-10 lg:w-24" >
              <span className="hidden xl:block">Tweet</span>
              <FaFeather className="xl:hidden" />
    </Button>
    </div>
    </div>

</div>  
)
}

export default Post