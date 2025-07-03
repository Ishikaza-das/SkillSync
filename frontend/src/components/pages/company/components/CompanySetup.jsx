import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const chnageEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chnageFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler} className="space-y-8">
          {" "}
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 px-8">
            {" "}
            <div className="space-y-2">
              {" "}
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={chnageFileHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={chnageEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Company Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={chnageEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Company Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={chnageEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Company Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={chnageEventHandler}
              />
            </div>
          </div>
          <div className="px-8 pb-8">
            {" "}
            <Button type="submit" className="w-full" variant="purple2">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
