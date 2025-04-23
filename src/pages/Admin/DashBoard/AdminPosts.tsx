import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useEffect   } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/store/Api/postsApi";

const AdminPosts = () => {
    const posts = useAppSelector((state)=> state.posts);
    const dispatch = useAppDispatch();
    // const [isDeleting, setIsDeleting] = useState(false);
      
    
    useEffect(()=>{
      dispatch(getAllPosts());
    },[dispatch])
    
    // const deletePost = async(id: string, title: string)=>{

    //     setIsDeleting(true);  
    //     dispatch(deletePostRTK(id)).then(()=>{
    //       dispatch(deletedPostANALY({id: id}));
    //     })
    //     setIsDeleting(false);
     
    // }
    return (
      <div className="p-4">
        <h1 className="py-2 pr-4 mb-4 text-2xl w-fit font-bold border-b-2 border-gray-600">Posts</h1>
         <Table>
         <TableHeader>
         <TableRow>
           <TableHead className="w-[100px]">#</TableHead>
           <TableHead>Post</TableHead>
           <TableHead>User</TableHead>
           <TableHead>Likes</TableHead>
           <TableHead>Comments</TableHead>
           <TableHead>Date</TableHead>
           <TableHead >Actions</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {!posts.isLoading&& posts.data&& posts.data.map((post, index) => (
           <TableRow key={post._id}>
             <TableCell className="font-medium">{index+1}</TableCell>
             <TableCell>
             <div className="flex items-center gap-4 font-bold">
                  {post.image?.public_id && <img className="w-10 h-10 object-cover object-center rounded-full" src={post.image?.url} alt={post.decsription} /> }
                   {post.decsription.substring(0,12)}
                   </div>
             </TableCell>
             <TableCell>
             <div className="flex items-center gap-4 font-bold">
                   <img className="w-10 h-10 object-cover object-center rounded-full" src={post.user.profilePhoto.url} alt={post.user.username} />
                   {post.user.username.substring(0,12)}
                   </div>
             </TableCell>
             <TableCell>{post.likes.length}</TableCell>
             <TableCell>{post.comments.length}</TableCell>
             <TableCell>{new Date(post.createdAt).toLocaleString()}</TableCell>
             <TableCell >
               <Button onClick={()=>null} className="bg-red-400 dark:bg-red-400 cursor-pointer" >Delete</Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
      </div>
    )
}

export default AdminPosts