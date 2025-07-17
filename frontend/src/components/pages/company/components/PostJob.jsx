import React, { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setSingleJob } from "@/store/jobSlice";
import useGetJobById from "@/hooks/useGetJobById";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { companies } = useGetAllCompanies();
  const fetchJobById = useGetJobById();

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

  useEffect(() => {
    if (id) fetchJobById(id);
  }, [id]);

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
    return () => {
      dispatch(setSingleJob(null));
    };
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...input,
      salary: Number(input.salary),
      position: Number(input.position),
      requirements: input.requirements.split(",").map((r) => r.trim()),
      experience: input.experience,
      jobtype: input.jobtype,
    };

    if (!input.companyId) {
      toast.error("Please select a company before submitting");
      setLoading(false);
      return;
    }

    try {
      const url = id
        ? `${import.meta.env.VITE_JOB_API}/update/${id}`
        : `${import.meta.env.VITE_JOB_API}/create`;

      const res = id
        ? await axios.put(url, dataToSend, { withCredentials: true })
        : await axios.post(url, dataToSend, { withCredentials: true });

      if (res.data.success) {
        toast.success(`Job ${id ? "updated" : "created"} successfully`);
        navigate("/company/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${id ? "update" : "create"} job`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                name="jobtype"
                value={input.jobtype}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 my-1"
              />
            </div>

            {companies.length > 0 && (
              <div className="col-span-2">
                <Label>Select Company</Label>
                <Select
                  onValueChange={selectChangeHandler}
                  value={input.companyId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {id ? "Update Job" : "Post New Job"}
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;