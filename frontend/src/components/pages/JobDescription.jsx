import React, { useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/store/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const JobDescription = () => {
  const isApplied = true;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);

  useEffect(() => {
    const fetchSingleJob = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_JOB_API}/get/${jobId}`,{withCredentials:true});
            if(response.data.success){
                dispatch(setSingleJob(response.data.job));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleJob();
  },[jobId,dispatch,user?._id]);

  if (!singleJob) {
    return (
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-2xl font-bold">Loading Job Details...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Google</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob.position} positions
            </Badge>
            <Badge className="text-amber-700 font-bold" variant="ghost">
              {singleJob.jobtype}
            </Badge>
            <Badge className="text-pink-700 font-bold" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg h-10 ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-violet-600"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {singleJob.description}
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role: <span className="pl-4 font-normal text-gray-800">{singleJob.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location: <span className="pl-4 font-normal text-gray-800">{singleJob.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description: <span className="pl-4 font-normal text-gray-800">{singleJob.description}</span>
        </h1>
        <h1 className="font-bold my-1">
          Experience: <span className="pl-4 font-normal text-gray-800">{singleJob.experienceLevel} Year</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl-4 font-normal text-gray-800">{singleJob.salary} LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob.application.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob.createdAt.split('T')[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
