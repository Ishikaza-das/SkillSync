import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CompaniesTable from "./components/CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/store/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();

  const newCompany = () => {
    navigate('/companies/create');
  }

  const {input, setInput} = useState('');
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(setSearchCompanyByText(input));
  },[input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)}/>
          <Button variant="purple2" onClick={newCompany}>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
