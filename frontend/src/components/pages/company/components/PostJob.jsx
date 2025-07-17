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
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { setSingleJob } from "@/store/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PostJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchJobById = useGetJobById();
  useGetAllCompanies();

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
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id]);

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob?.title || "",
        description: singleJob?.description || "",
        requirements: singleJob?.requirements?.join(", ") || "",
        salary: singleJob?.salary || "",
        location: singleJob?.location || "",
        jobtype: singleJob?.jobtype || "",
        experience: singleJob?.experienceLevel || "",
        position: singleJob?.position || "",
        companyId: singleJob?.company?._id || "",
      });
    }
  }, [singleJob]);

  useEffect(() => {
    return () => dispatch(setSingleJob(null));
  }, []);

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
    try {
      setLoading(true);
      const dataToSend = {
        title: input.title,
        description: input.description,
        requirements: input.requirements.split(",").map((r) => r.trim()),
        salary: Number(input.salary),
        location: input.location,
        jobtype: input.jobtype, 
        experience: input.experience,
        position: input.position,
        companyId: input.companyId,
      };
      console.log(dataToSend);
      const url = id
        ? `${import.meta.env.VITE_JOB_API}/update/${id}`
        : `${import.meta.env.VITE_JOB_API}/post`;

      const res = id
        ? await axios.put(url, dataToSend, { withCredentials: true })
        : await axios.post(url, dataToSend, { withCredentials: true });

      if (res.data.success) {
        toast.success(`Job ${id ? "updated" : "posted"} successfully`);
        navigate("/company/jobs");
      }
    } catch (error) {
      toast.error(`Failed to ${id ? "update" : "post"} job`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    navigate("/company/jobs");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="flex items-center gap-5 mb-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={back}
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">
              {id ? "Update Job" : "Post New Job"}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobtype"
                value={input.jobtype}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>

            {companies.length > 0 && (
              <div>
                <Label>Company</Label>
                <Select
                  onValueChange={selectChangeHandler}
                  defaultValue={companies
                    .find((c) => c._id === input.companyId)
                    ?.name?.toLowerCase()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Company" />
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
            <Button className="w-full my-4" disabled variant="purple2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4" variant="purple2">
              {id ? "Update Job" : "Post Job"}
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
