import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/store/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_API}/logout`,
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-purple-800">
            Skill<span className="text-purple-600">Sync</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user?.role === "recruiters" ? (
              <>
                <li>
                  <Link to="/companies">Company</Link>
                </li>
                <li>
                  <Link to="/company/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="gap-2 flex items-center">
              <Link to="/login">
                <Button variant="purple">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="purple2">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user.profile?.profilephoto ||
                      "https://github.com/shadcn.png"
                    }
                    className="object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user.profile?.profilephoto ||
                          "https://github.com/shadcn.png"
                        }
                        className="object-cover"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.profile.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-500">
                    {user && user.role === "candidates" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        variant="link"
                        onClick={LogoutHandler}
                        className="cursor-pointer"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
