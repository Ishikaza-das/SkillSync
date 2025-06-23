import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import React from "react";

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
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button className="rounded-full" variant="outline">
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
