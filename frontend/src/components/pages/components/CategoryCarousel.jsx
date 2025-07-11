import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/store/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Graphic Designer",
  "Data Scientist",
  "DevOps Engineer",
  "Cybersecurity Specialist",
  "Project Manager",
  "Business Analyst",
  "Sales Manager",
  "HR Executive",
  "Content Writer",
  "SEO Specialist",
  "Brand Strategist",
  "Accountant",
  "Financial Analyst",
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse')
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button className="rounded-full" variant="outline" onClick={() => searchJobHandler(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
