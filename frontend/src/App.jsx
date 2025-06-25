import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/pages/Home'
import Jobs from './components/pages/Jobs'
import Browse from './components/pages/Browse'


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
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  }
])


function App() {

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
