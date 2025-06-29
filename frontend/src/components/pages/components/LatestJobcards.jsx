import { Badge } from "../../ui/badge";
import React from "react";

const LatestJobcards = ({job}) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-purple-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job.company.name}</h1>
        <p className="text-sm text-amber-700">{job.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className='text-blue-700 font-bold' variant='ghost'>{job.position} Position</Badge>
        <Badge className='text-amber-700 font-bold' variant='ghost'>{job.jobtype}</Badge>
        <Badge className='text-pink-700 font-bold' variant='ghost'>{job.salary} LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobcards;
