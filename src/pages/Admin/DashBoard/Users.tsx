import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/Dialog/DeleteDialog";
import ChangeRoleDialog from "@/components/Dialog/ChangeRoleDialog";
import { fetchUsers } from "@/store/Api/userProfileApi";



const Users = () => {
  const users = useAppSelector((state)=> state.allUsers);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userData, setuserData] = useState({id:"", text:""});
  const [roleSelect, setRoleSelect] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])

  const deleteUser = (id: string, name: string)=>{
    setuserData({id, text:name});
    setIsDeleting(true);
  }
  const updateUser =(id: string, name: string)=>{
    setuserData({id, text:name});
    setRoleSelect(true);
  }
  
  return (
    <>
       <div className="p-4">
      <h1 className="py-2 pr-4 mb-4 text-2xl w-fit font-bold border-b-2 border-gray-600">Users</h1>
      <div className="">
     <Table>
        <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.map((user, index) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell>
            <div className="flex items-center gap-4 font-bold">
                  <img className="w-10 h-10 object-cover object-center rounded-full" src={user.profilePhoto.url} alt={user.username} />
                  {user.username.substring(0,12)}
                  </div>
            </TableCell>
            <TableCell>{user.email.substring(0,20)}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-right space-x-1">
              <Button onClick={()=> updateUser(user._id,user.username)} className=" rounded-full  cursor-pointer">Role</Button>
              <Button onClick={()=> deleteUser(user._id,user.username)} className=" rounded-full bg-red-400 dark:bg-red-400 cursor-pointer" >Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </div>
    </div>
        {isDeleting && <DeleteDialog isOpen={isDeleting} setShowDialog={setIsDeleting} mode="profile" value={{id:userData.id, text:userData.text,admin:true}}/> }
        {roleSelect && <ChangeRoleDialog isOpen={roleSelect} setOpen={setRoleSelect} data={{id:userData.id,text:userData.text}} />}
    </>
  )
}

export default Users