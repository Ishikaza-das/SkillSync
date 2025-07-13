import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../store/authSlice";
import { Loader2 } from "lucide-react";
// import store from "@/store/store";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if(user){
      navigate('/');
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-purple-300 rounded-md p-4 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2 space-y-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="jhondao@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2 space-y-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="jhondao#123"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="candidates"
                  className="cursor-pointer"
                  checked={input.role === "candidates"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Candidate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiters"
                  className="cursor-pointer"
                  checked={input.role === "recruiters"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="my-4 w-full h-10" variant="purple2">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="my-4 w-full h-10"
              variant="purple2"
            >
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account ?
            <Link to="/signup" className="text-purple-600 ml-2">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
