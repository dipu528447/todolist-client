import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../components/Login/Login";
import Main from "../components/Main/Main";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import notFound from '../components/assests/404.jpg'
import PrivateRoute from '../pages/PrivateRoute/PrivateRoute'
import MyTask from "../pages/MyTask/MyTask"
import CompletedTask from "../pages/CompletedTask/CompletedTask";
export const router = createBrowserRouter([
      {
        path: "/",
        element: <PrivateRoute><Main/></PrivateRoute>,
        children: [
          {
            path: "/",
            element: <Home></Home>
          },
          {
            path: "/mytasks",
            element: <MyTask></MyTask>
          },
          {
            path: "/completedTask",
            element: <CompletedTask></CompletedTask>
          }
        ]
      },
      {
          path:"/login",
          element:<Login></Login>,
      },
      {
        path:"/unauthorized",
        element:<Unauthorized></Unauthorized>,
      },
      {
          path:"/register",
          element:<Registration></Registration>
      },
      
      {
        path:'/*', element:<div><h1 className="text-7xl">ERROR:404::Not Found</h1><p className="text-4xl">please go back...</p><img src={notFound}/></div>
      }
    ]);