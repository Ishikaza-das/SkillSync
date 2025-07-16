import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useGetJobById from "@/hooks/useGetJobById";
import { clearSingleJob } from "@/store/jobSlice";

const PostJob = () => {
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

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const dispatch = useDispatch();
  const { companies } = useSelector((store) => store.company);
  const { singleJob } = useSelector((store) => store.job);

  useGetJobById(isEditMode ? id : null);

  useEffect(() => {
    if (isEditMode && singleJob) {
      const jobData = {
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: (singleJob.requirements || []).join(", "),
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobtype: singleJob.jobtype || "",
        experience: singleJob.experienceLevel || "",
        position: singleJob.position || 0,
        companyId: singleJob.company?._id || "",
      };
      setInput(jobData);
      setOriginalData(jobData);
    }
  }, [singleJob, isEditMode]);

  useEffect(() => {
    return () => {
      dispatch(clearSingleJob());
    };
  }, [dispatch]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let url = `${import.meta.env.VITE_JOB_API}/post`;
      let method = "post";
      let dataToSend = { ...input };

      dataToSend.requirements = input.requirements
        .split(",")
        .map((r) => r.trim());

      if (isEditMode && originalData) {
        dataToSend = {};
        for (let key in input) {
          const newValue =
            key === "requirements"
              ? input.requirements.split(",").map((r) => r.trim())
              : input[key];
          const oldValue =
            key === "requirements"
              ? originalData.requirements.split(",").map((r) => r.trim())
              : originalData[key];

          if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
            dataToSend[key] = newValue;
          }
        }

        if (Object.keys(dataToSend).length === 0) {
          toast.info("No changes made.");
          setLoading(false);
          return;
        }

        url = `${import.meta.env.VITE_JOB_API}/update/${id}`;
        method = "put";
      }

      const response = await axios[method](url, dataToSend, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/company/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <Navbar />
    <div className="flex items-center justify-center w-screen my-5">
      {isEditMode && !singleJob ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-2" />
          <span className="text-sm">Loading job data...</span>
        </div>
      ) : (
        <form
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
          onSubmit={submitHandler}
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary (in LPA)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobtype"
                value={input.jobtype}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {companies.length > 0 && (
              <div>
                <Label>Company</Label>
                <Select
                  onValueChange={selectChangeHandler}
                  defaultValue={
                    companies.find((c) => c._id === input.companyId)?.name?.toLowerCase() || ""
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company">
                      {
                        companies.find((c) => c._id === input.companyId)
                          ?.name || "Select a Company"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
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
            <Button className="my-4 w-full" variant="purple2" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="my-4 w-full" variant="purple2">
              {isEditMode ? "Update Job" : "Post New Job"}
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs font-bold text-center text-red-500">
              *Please create a company before posting a job.
            </p>
          )}
        </form>
      )}
    </div>
  </div>
);
};

export default PostJob;
