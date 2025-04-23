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
import { getAllComments } from "@/store/Api/commentApi";

const Comments = () => {
      const comments = useAppSelector((state)=> state.comments);

      const dispatch = useAppDispatch()
      useEffect(()=>{
        dispatch(getAllComments())
      },[dispatch])
  return (
     <div className="p-4">
          <h1 className="py-2 pr-4 mb-4 text-2xl w-fit font-bold border-b-2 border-gray-600">Comments</h1>
          <div>
          <Table>
         <TableHeader>
         <TableRow>
           <TableHead className="w-[100px]">#</TableHead>
           <TableHead>Comment</TableHead>
           <TableHead>User</TableHead>
           <TableHead>Date</TableHead>
           <TableHead >Actions</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         { comments.data.map((com, index) => (
           <TableRow key={com._id}>
             <TableCell className="font-medium">{index+1}</TableCell>
             <TableCell><strong>{com.text}</strong></TableCell>
             <TableCell>
             <div className="flex items-center gap-4 font-bold">
                   <img className="w-10 h-10 object-cover object-center rounded-full" src={com.user.profilePhoto.url} alt={com.user.username} />
                   {com.user.username.substring(0,12)}
                   </div>
             </TableCell>
             <TableCell>{new Date(com.createdAt).toLocaleString()}</TableCell>
             <TableCell >
               <Button onClick={()=>null} className="bg-red-400 dark:bg-red-400 cursor-pointer" >Delete</Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
        </div>
        </div>
  )
}

export default Comments