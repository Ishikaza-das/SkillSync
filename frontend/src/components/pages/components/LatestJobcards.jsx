import { Badge } from "../../ui/badge";
import React from "react";

const LatestJobcards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-purple-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-amber-700">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className='text-blue-700 font-bold' variant='ghost'>12 positions</Badge>
        <Badge className='text-amber-700 font-bold' variant='ghost'>Part Time</Badge>
        <Badge className='text-pink-700 font-bold' variant='ghost'>24 LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobcards;
