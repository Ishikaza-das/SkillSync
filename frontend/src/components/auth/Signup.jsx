import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group"
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {

  const [input, setInput] = useState({
    fullname:"",
    email:"",
    phonenumber:"",
    password:"",
    role:"",
    file:""
  });

  const navigate = useNavigate();
  
  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const chnageFileHandler = (e) => {
    setInput({...input, file: e.target.files?.[0]})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phonenumber",input.phonenumber)
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_USER_API}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });
      if(response.data.success){
        navigate('/login')
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-purple-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" onChange={chnageFileHandler}/>
            </div>
          <div className="my-2 space-y-4">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Jhon Dao" value={input.fullname} name="fullname" onChange={changeEventHandler}/>
          </div>
          <div className="my-2 space-y-4">
            <Label>Email</Label>
            <Input type="email" placeholder="jhondao@gmail.com" value={input.email} name="email" onChange={changeEventHandler}/>
          </div>
          <div className="my-2 space-y-4">
            <Label>Phone Number</Label>
            <Input type="text" maxLength={10} placeholder="1234567890" value={input.phonenumber} name="phonenumber" onChange={changeEventHandler}/>
          </div>
          <div className="my-2 space-y-4">
            <Label>Password</Label>
            <Input type="password" placeholder="jhondao#123" value={input.password} name="password" onChange={changeEventHandler}/>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="candidates" className="cursor-pointer" checked={input.role === 'candidates'} onChange={changeEventHandler}/>
                <Label htmlFor="r1">Candidate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="recruiters" className="cursor-pointer" checked={input.role === 'recruiters'} onChange={changeEventHandler}/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="my-4 w-full h-10" variant="purple2">Sign Up</Button>
          <span className="text-sm">Already have an account ? <Link to="/login" className="text-purple-600 ml-2">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
