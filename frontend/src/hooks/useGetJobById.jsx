import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/store/jobSlice";

const useGetJobById = () => {
  const dispatch = useDispatch();

  const fetchJobById = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_JOB_API}/get/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
      }
    } catch (error) {
      console.error("Error fetching job by ID:", error);
    }
  };

  return fetchJobById;
};

export default useGetJobById;
