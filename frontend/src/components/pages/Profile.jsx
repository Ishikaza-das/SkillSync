import React from "react";
import Navbar from "../shared/Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import AppliedJobTable from "./components/AppliedJobTable";

const skills = ["HTML", "CSS", "JavaScript", "React.js", "Node"];

const Profile = () => {
  const isHaveResume = true;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-14">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque animi voluptatibus vel!
              </p>
            </div>
          </div>
          <Button className="text-right" variant="purple2">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>1234567890</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
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
              href="https://github.com/Ishikaza-das"
              className="text-blue-800 w-full hover:underline cursor-pointer"
            >
              Ritesh Resume
            </a>
          ) : (
            <span>Not Uploaded</span>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl">
        <h1>Applied Job</h1>
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
Profile;
