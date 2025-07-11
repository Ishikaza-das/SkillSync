import { setAllJobs } from "@/store/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery, filters } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const params = new URLSearchParams();

        if (searchedQuery) params.append("keyword", searchedQuery);
        if (filters.location) params.append("location", filters.location);
        if (filters.jobType) params.append("jobtype", filters.jobType);
        if (filters.salary) params.append("salary", filters.salary);

        const response = await axios.get(
          `${import.meta.env.VITE_JOB_API}/get?${params.toString()}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, filters, dispatch]); 
};

export default useGetAllJobs;
