import { Bookmark } from "lucide-react";
import { Button } from "../../ui/button";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://imgs.search.brave.com/-naZtmZr2lGfysJAfxXLOgUEMCL-JzeOads8sfNuz04/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kaWdp/dGFsc3lub3BzaXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzExL2ZhbW91/cy1icmFuZC1sb2dv/cy1oaWRkZW4tbWVh/bmluZ3MtMTYuanBn" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-600">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
          deleniti quod cumque necessitatibus debitis qui voluptatum distinctio
          delectus enim soluta?
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          12 positions
        </Badge>
        <Badge className="text-amber-700 font-bold" variant="ghost">
          Part Time
        </Badge>
        <Badge className="text-pink-700 font-bold" variant="ghost">
          24 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-5">
        <Button variant='purple2'>Details</Button>
        <Button variant='purple'>Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
