import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useGetJobById from "@/hooks/useGetJobById";
import { setSingleJob } from "@/store/jobSlice";

const PostJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetJobById(id); 
  const { singleJob } = useSelector((store) => store.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const back = () => {
    navigate("/company/jobs");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_JOB_API}/update/${id}`,
        input,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Job updated successfully");
        navigate("/company/jobs");
      }
    } catch (error) {
      toast.error("Failed to update job");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements?.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobtype: singleJob.jobtype || "",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || "",
        companyId: singleJob.company?._id || "",
      });
    }
  }, [singleJob]);

  useEffect(() => {
    return () => dispatch(setSingleJob(null));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto my-10">
        <form onSubmit={submitHandler} className="space-y-8">
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={back}
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Update Job</h1>
          </div>
          <div className="grid grid-cols-2 gap-6 px-8">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Requirements (comma separated)</Label>
              <Textarea
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Salary</Label>
              <Input
                name="salary"
                type="number"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Input
                name="jobtype"
                value={input.jobtype}
                onChange={changeEventHandler}
              />
            </div>
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          <div className="px-8 pb-8">
            {loading ? (
              <Button className="w-full" variant="purple2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full" variant="purple2">
                Update Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
