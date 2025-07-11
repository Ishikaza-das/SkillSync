import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Job from "./components/Job";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/store/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
  }
  const {allJobs} = useSelector(store => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-bold text-xl">Search Results {allJobs?.length}</h1>
          <div className="flex w-[350px] shadow-lg shadow-purple-100 border border-purple-200 pl-3 rounded-full items-center gap-4">
            <input
              type="text"
              placeholder="Find Your Dream Jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none w-full p-2 border-none text-base"
            />
            <Button className="rounded-r-full h-[40px] w-[50px] flex items-center justify-center" variant="purple2" onClick={searchJobHandler}>
              <Search className="h-9 w-9"/>
            </Button>
          </div>
        </div>
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
