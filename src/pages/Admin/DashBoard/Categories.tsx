import { useEffect, useState } from "react";
import { deleteCategory, getCategoryRTK } from "../RTK/Api/categotyApiCall";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";


const Category = () => {
    const cat = useAppSelector((state)=> state.category);
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
      
    
    useEffect(()=>{
      dispatch(getCategoryRTK());
    },[dispatch])
    
    const deleteCat = async(id: string, title: string)=>{
        setIsDeleting(true);  
        console.log(title);
        
        dispatch(deleteCategory({id: id}));
        setIsDeleting(false);
    }
    
    return (
      <div className="p-4">
        <h1 className="py-2 pr-4 mb-4 text-2xl w-fit font-bold border-b-2 border-gray-600">Categories</h1>
        {cat.data.length !== 0 ?  
        <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Count</TableHead>
              <TableHead >Category Title</TableHead>
              <TableHead >Date</TableHead>
              <TableHead >Action</TableHead>
            </TableRow>
          </TableHeader>
    
          <TableBody>
            {!cat.isLoading && cat.data && cat.data.map((cate, index) => (
              <TableRow key={cate._id}>
                <TableCell >
                  {index+1}
                </TableCell>
                <TableCell >
                  {cate.title}
                </TableCell>
                <TableCell >{new Date(cate.createdAt).toDateString()}</TableCell>
                <TableCell >
                  <Button onClick={()=> deleteCat(cate._id, cate.title)} className="bg-red-400 dark:bg-red-400"  disabled={isDeleting} >{isDeleting? "...deleting":"delete"}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div> 
      : <h1 className="text-center text-xl p-2 bg-gray-200">There is no any categories</h1>  
      }
      </div>
    )
}

export default Category;