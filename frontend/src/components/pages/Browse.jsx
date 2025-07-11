import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Job from "./components/Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/store/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        {/* <div className="flex items-center justify-between mb-10"> */}
          <h1 className="font-bold text-xl">Search Results {allJobs?.length}</h1>
        {/* </div> */}
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job?._id} job={job}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
