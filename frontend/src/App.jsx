import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/pages/Home'
import Jobs from './components/pages/Jobs'
import Browse from './components/pages/Browse'
import Profile from './components/pages/Profile'
import JobDescription from './components/pages/JobDescription'
import Companies from './components/pages/company/Companies'
import CompanyCreate from './components/pages/company/CompanyCreate'
import CompanySetup from './components/pages/company/components/CompanySetup'
import CompanyJobs from './components/pages/company/CompanyJobs'
import PostJob from './components/pages/company/components/PostJob'
import Applicants from './components/pages/company/Applicants'


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
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/companies',
    element:<Companies/>
  },
  {
    path:'/companies/create',
    element:<CompanyCreate/>
  },
  {
    path:'/company/:id',
    element:<CompanySetup/>
  },
  {
    path:'/company/jobs',
    element:<CompanyJobs/>
  },
  {
    path:'/companies/job/create',
    element:<PostJob/>
  },
  {
    path:'/company/jobs/:id/applicants',
    element:<Applicants/>
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
