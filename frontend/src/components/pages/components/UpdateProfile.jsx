import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setUser } from "@/store/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const close = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phonenumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const chnageEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const chnageFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input,file})
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phonenumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
        const response = await axios.put(`${import.meta.env.VITE_USER_API}/profile/update`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });
      if(response.data.success){
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
      }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w[425px]" onInteractOutside={close}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  name="name"
                  value={input.fullname}
                  onChange={chnageEventHandler}
                  type='text'
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  name="email"
                  value={input.email}
                  onChange={chnageEventHandler}
                  type='email'
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phonenumber" className="text-right">
                  Phonenumber
                </Label>
                <Input
                  id="phonenumber"
                  className="col-span-3"
                  name="phonenumber"
                  value={input.phoneNumber}
                  onChange={chnageEventHandler}
                  type="text" 
                  maxLength={10}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  className="col-span-3"
                  name="bio"
                  value={input.bio}
                  onChange={chnageEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  className="col-span-3"
                  name="skills"
                  value={input.skills}
                  onChange={chnageEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  className="col-span-3"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={chnageFileHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="my-4 w-full h-10" variant="purple2">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="my-4 w-full h-10"
                  variant="purple2"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
