import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useGetJobById from "@/hooks/useGetJobById";

const PostJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { singleJob } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  useGetJobById(jobId); 

  useEffect(() => {
    if (jobId && singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobtype: singleJob.jobtype || "",
        experience: singleJob.experience || "",
        position: singleJob.position || 0,
        companyId: singleJob.companyId || "",
      });
    }
  }, [singleJob, jobId]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = jobId
        ? `${import.meta.env.VITE_JOB_API}/update/${jobId}`
        : `${import.meta.env.VITE_JOB_API}/post`;

      const method = jobId ? axios.put : axios.post;

      const response = await method(url, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/company/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
          onSubmit={submitHandler}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input name="title" value={input.title} onChange={changeHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea name="description" value={input.description} onChange={changeHandler} />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input name="requirements" value={input.requirements} onChange={changeHandler} />
            </div>
            <div>
              <Label>Salary (in LPA)</Label>
              <Input name="salary" value={input.salary} onChange={changeHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeHandler} />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input name="jobtype" value={input.jobtype} onChange={changeHandler} />
            </div>
            <div>
              <Label>Experience</Label>
              <Input name="experience" value={input.experience} onChange={changeHandler} />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeHandler}
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler} defaultValue={
                companies.find(c => c._id === input.companyId)?.name.toLowerCase()
              }>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button className="my-4 w-full h-10" variant="purple2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="my-4 w-full" variant="purple2">
              {jobId ? "Update Job" : "Post New Job"}
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs font-bold text-center my-3 text-red-500">
              *Please create a company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
