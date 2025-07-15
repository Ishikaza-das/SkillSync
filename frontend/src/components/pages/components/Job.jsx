import { Bookmark } from "lucide-react";
import { Button } from "../../ui/button";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate();
  const nav = () => {
    navigate(`/description/${job._id}`)
  }
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (24*60*60*1000));
  }

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt) === 0? 'Today': `${daysAgo(job?.createdAt)} days ago`}</p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}  className="w-full h-full object-cover"/>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">
          {job?.description
            ? job.description.length > 40
              ? job.description.slice(0, 40) + "..."
              : job.description
            : ""}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-amber-700 font-bold" variant="ghost">
          {job?.jobtype}
        </Badge>
        <Badge className="text-pink-700 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <Button variant='purple2' onClick={nav}>Details</Button>
      </div>
    </div>
  );
};

export default Job;
