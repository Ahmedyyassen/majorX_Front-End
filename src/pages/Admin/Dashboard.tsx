import AdminHeader from "@/components/admin/AdminHeader"
import DSideBar from "@/components/admin/DSideBar"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
     <aside>
      <DSideBar />
    </aside>
    <main className="w-[calc(100%-80px)] xl:w-[calc(100%-310px)] ml-auto">
    <AdminHeader/>
    <Outlet/>
    </main>
    </>
  )
}

export default Dashboard
