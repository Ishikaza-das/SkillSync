import { setAllJobs } from "@/store/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetAllJobs = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_JOB_API}/get`,{withCredentials:true});
            if(response.data.success){
                dispatch(setAllJobs(response.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs
