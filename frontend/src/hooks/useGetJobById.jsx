import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/store/jobSlice";

const useGetJobById = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_JOB_API}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (jobId) fetchJob();
  }, [jobId, dispatch]);
};

export default useGetJobById;
