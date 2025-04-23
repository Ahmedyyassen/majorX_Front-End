import { useAppSelector } from "@/hooks/useApp"
import { ModeToggle } from "../ModeToggle"

const AdminHeader = () => {
  const {data} = useAppSelector((state)=> state.user)
  return (
    <header className="border border-t-0 border-gray-300 px-4 py-2 rounded-bl-2xl mb-4">
        <div className="flex items-center justify-between">
        <h1 className="">{data?.username}</h1>
        <div className="flex  items-center gap-4">
        <ModeToggle />
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-400">
        <img  className="w-full h-full object-cover object-center" src={data?.profilePhoto?.url} alt="" />
        </div>
        </div>
        </div>        
    </header>
  )
}

export default AdminHeader