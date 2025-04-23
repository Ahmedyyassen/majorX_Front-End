import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import React from "react";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import Spinner from "./components/Spinner";
import AuthPage from "./pages/Auth/AuthPage";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import AdminRoute from "./components/Auth/AdminRoute";
import Dashboard from "./pages/Admin/Dashboard";
import MainDash from "./pages/Admin/DashBoard/Main";
import AdminPosts from "./pages/Admin/DashBoard/AdminPosts";
import Users from "./pages/Admin/DashBoard/Users";
import Comments from "./pages/Admin/DashBoard/Comments";
import Category from "./pages/Admin/DashBoard/Categories";
const Lazy = React.lazy(()=>import("./components/RootLayout"));

function App() {
  
 
      const router = createBrowserRouter(createRoutesFromElements(
        <>
        <Route path="/" element={ <PublicRoute><AuthPage /></PublicRoute>} />
        
        <Route path="/main" element={ 
                      <PrivateRoute>
                      <React.Suspense fallback={<Spinner />}>
                        <Lazy />
                      </React.Suspense>
                    </PrivateRoute>
        }>
                    <Route index element={<Home/> }/>
                    <Route path="home" element={<Home/> }/>
                    <Route path="profile/:id" element={<Profile/>} />
        </Route>


        <Route path="/dashboard" element={
          <AdminRoute>
            <React.Suspense fallback={<Spinner />}>
              <Dashboard/>
            </React.Suspense>
          </AdminRoute>
        } >
          <Route index element={<MainDash />} />
          <Route path="" element={<MainDash />} />
           <Route path="posts" element={<AdminPosts/>} />
          <Route path="users" element={<Users />} />
          <Route path="comments" element={<Comments />} />
          <Route path="category" element={<Category />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
        </>
      ))
  return <RouterProvider router={router} />
}

export default App;
