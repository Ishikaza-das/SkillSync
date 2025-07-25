import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./components/AppliedJobTable";
import UpdateProfile from "./components/UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isHaveResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const edit = () => {
    setOpen(true);
  }
  const {user} = useSelector(store => store.auth);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-14">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profile?.profilephoto || "https://github.com/shadcn.png"} alt="profile" className="object-cover"/>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p>
                {user.profile.bio}
              </p>
            </div>
          </div>
          <Button className="text-right" variant="purple2" onClick={edit}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user.phonenumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-md font-bold">Skills</h1>
          <div className="flex items-center gap-1">
            {user.profile.skills.length != 0 ? (
              user.profile.skills.map((item, index) => <Badge className="text-blue-700 font-bold" variant="ghost" key={index}>{item}</Badge>)
            ) : (
              <span>No Skill Mentioned</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-md font-bold">Resume</Label>
          {isHaveResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-800 w-full hover:underline cursor-pointer"
            >
              {user.profile.resumename}
            </a>
          ) : (
            <span>Not Uploaded</span>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Job</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
