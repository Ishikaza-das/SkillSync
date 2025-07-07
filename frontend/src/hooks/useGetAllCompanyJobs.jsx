import { setAllCompanyJobs } from "@/store/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetAllCompanyJobs = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanyJobs = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_JOB_API}/getadminjobs`,{withCredentials:true});
            if(response.data.success){
                dispatch(setAllCompanyJobs(response.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllCompanyJobs();
  },[])
}

export default useGetAllCompanyJobs;
