import { setAllAppliedJobs } from "@/store/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APPLICANTS}/get`,{
                    withCredentials:true
                });
                console.log(response.data)
                if(response.data.success){
                    dispatch(setAllAppliedJobs(response.data.application));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAppliedJobs();
    },[])
};

export default useGetAppliedJobs;