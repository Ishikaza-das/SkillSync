import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";

const useGetJobById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_JOB_API}/single/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Failed to fetch job by ID", error);
      }
    };

    fetchJob();
  }, [id, dispatch]);
};

export default useGetJobById;
