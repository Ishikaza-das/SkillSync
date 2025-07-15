import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Headsection from "./components/Headsection";
import CategoryCarousel from "./components/CategoryCarousel";
import LatestJobs from "./components/LatestJobs";
import Footer from "./components/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiters") {
      navigate("/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Headsection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
