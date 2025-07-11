import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAllJobs, setSearchedQuery } from '@/store/jobSlice';

const filterData = [
  {
    filterType: 'Job Type',
    array: ['Full Time', 'Remote', 'Internship']
  },
  {
    filterType: 'Salary',
    array: ['1-4 LPA', '6-12 LPA', 'Above 12 LPA']
  }
];

const FilterCard = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const dispatch = useDispatch();

  // Fetch locations on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_JOB_API}/locations`, {
          withCredentials: true
        });
        if (res.data.success) {
          setLocations(res.data.locations);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Reset all filters on initial load
  useEffect(() => {
    setSelectedLocation('');
    setSelectedJobType('');
    setSelectedSalary('');
    dispatch(setSearchedQuery(''));
  }, [dispatch]);

  // Fetch jobs when filters change
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedLocation) params.append('location', selectedLocation);
        if (selectedJobType) params.append('jobtype', selectedJobType);
        if (selectedSalary) params.append('salary', selectedSalary);

        const url = `${import.meta.env.VITE_JOB_API}/get?${params.toString()}`;
        const res = await axios.get(url, { withCredentials: true });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Failed to fetch filtered jobs:", error);
      }
    };

    fetchFilteredJobs();
  }, [selectedLocation, selectedJobType, selectedSalary, dispatch]);

  return (
    <div className='w-full bg-white p-3 rounded-md border border-gray-200'>
      <h1 className='font-bold text-lg mb-3'>Filter Jobs</h1>
      <hr className='mb-4' />

      {/* Location Filter */}
      <div className="mb-5">
        <h1 className="font-bold text-lg mb-2">Location</h1>
        <Select onValueChange={setSelectedLocation} value={selectedLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc, index) => (
              <SelectItem key={index} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Job Type Filter */}
      <div className="mb-5">
        <h1 className="font-bold text-lg mb-2">Job Type</h1>
        <RadioGroup value={selectedJobType} onValueChange={setSelectedJobType}>
          {filterData[0].array.map((item, idx) => {
            const itemId = `jobtype-${idx}`;
            return (
              <div key={idx} className='flex items-center space-x-2 my-2'>
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* Salary Filter */}
      <div className="mb-5">
        <h1 className="font-bold text-lg mb-2">Salary</h1>
        <RadioGroup value={selectedSalary} onValueChange={setSelectedSalary}>
          {filterData[1].array.map((item, idx) => {
            const itemId = `salary-${idx}`;
            return (
              <div key={idx} className='flex items-center space-x-2 my-2'>
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId}>{item}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
