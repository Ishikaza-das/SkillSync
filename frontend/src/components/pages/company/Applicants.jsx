import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from './components/ApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/store/applicationSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store => store.application);
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APPLICANTS}/${params.id}/applicants`,{
                  withCredentials:true
                });
                if(response.data.success){
                  dispatch(setApplicants(response.data.job));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllApplicants();
    },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants
