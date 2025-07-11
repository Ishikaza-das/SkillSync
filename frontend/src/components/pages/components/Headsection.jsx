import { Search } from "lucide-react";
import { Button } from "../../ui/button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/store/jobSlice";
import { useNavigate } from "react-router-dom";

const Headsection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse')
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 bg-gray-200 rounded-full text-purple-800 font-medium">
          Get Your Dream Job
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> let your{" "}
          <span className="text-purple-500">Skills speak for you.</span>
        </h1>
        <p>
          Find jobs tailored to your skills and interests. Bridge the gap
          between what you know and where you want to be — search, apply, and
          unlock your next career opportunity with ease.
        </p>
        <div className="flex w-[40%] shadow-lg shadow-purple-100 border border-purple-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none w-full p-2 border-none text-base"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            className="rounded-r-full h-[40px] w-[50px] flex items-center justify-center"
            variant="purple2"
            onClick={searchJobHandler}
          >
            <Search className="h-9 w-9" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Headsection;
