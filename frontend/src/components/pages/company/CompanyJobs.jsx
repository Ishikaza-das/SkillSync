import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CompanyJobTable from "./components/CompanyJobTable";
import useGetAllCompanyJobs from "@/hooks/useGetAllCompanyJobs";
import { setSearchJobByText } from "@/store/jobSlice";

const CompanyJobs = () => {
  useGetAllCompanyJobs();
  const navigate = useNavigate();

  const newJob = () => {
    navigate('/companies/job/create');
  }

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(setSearchJobByText(input));
  },[input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name or role" onChange={(e) => setInput(e.target.value)}/>
          <Button variant="purple2" onClick={newJob}>Post New Job</Button>
        </div>
        <CompanyJobTable/>
      </div>
    </div>
  );
};

export default CompanyJobs;