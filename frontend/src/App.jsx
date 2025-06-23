import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/pages/Home'


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  // {
  //   path:'/',
  //   element:<Home/>
  // },
  // {
  //   path:'/',
  //   element:<Home/>
  // },
  // {
  //   path:'/',
  //   element:<Home/>
  // },
])


function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
