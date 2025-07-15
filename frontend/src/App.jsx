import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
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
import CompanyProtectedRoute from './components/protected/CompanyProtectedRoute'


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
    element:<CompanyProtectedRoute><Companies/></CompanyProtectedRoute>
  },
  {
    path:'/companies/create',
    element:<CompanyProtectedRoute><CompanyCreate/></CompanyProtectedRoute>
  },
  {
    path:'/company/:id',
    element:<CompanyProtectedRoute><CompanySetup/></CompanyProtectedRoute>
  },
  {
    path:'/company/jobs',
    element:<CompanyProtectedRoute><CompanyJobs/></CompanyProtectedRoute>
  },
  {
    path:'/companies/job/create',
    element:<CompanyProtectedRoute><PostJob/></CompanyProtectedRoute>
  },
  {
    path:'/company/jobs/:id/applicants',
    element:<CompanyProtectedRoute><Applicants/></CompanyProtectedRoute>
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
