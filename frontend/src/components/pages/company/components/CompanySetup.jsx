import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate()

  const chnageEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const chnageFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const back = () => {
    navigate('/companies')
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name',input.name);
    formData.append('description',input.description);
    formData.append('website',input.website);
    formData.append('location',input.location);

    if(input.file){
      formData.append('file',input.file);
    }

    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_COMPANY}/update/${params.id}`, formData, {
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      });
      if(response.data.success){
        toast.success(response.data.message);
        navigate('/companies')
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
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
              onClick={back}
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
            {loading ? (
            <Button className="my-4 w-full h-10" variant="purple2">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className=" w-full "
              variant="purple2"
            >
              Update
            </Button>
          )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
