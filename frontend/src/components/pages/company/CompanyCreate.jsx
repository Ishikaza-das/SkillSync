import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/store/companySlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancel = () => {
    navigate('/companies')
  }
  const [companyName, setCompanyName] = useState();
  const registerNewCompany = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_COMPANY}/register`,{companyName}, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(response.data.success){
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        const companyId = response.data.company._id;
        navigate(`/company/${companyId}`);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can chnage this
            later
          </p>
        </div>
        <Label>Company Name</Label>
        <Input type="text" className="my-2" placeholder="Jhon Dao Company" onChange={(e) => setCompanyName(e.target.value)}/>
        <div className="flex items-center gap-2 my-10">
          <Button variant='outline' onClick={cancel}>Cancel</Button>
          <Button onClick={registerNewCompany} variant='purple2'>Continiue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
