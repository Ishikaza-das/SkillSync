import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from 'react'

const filterData = [
  {
    filterType: 'Job Type',
    array: ['Full Time', 'Remote', 'Internship']
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42k-1 Lakh', '1 Lakh-5 Lakh']
  }
]

const locations = ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Odisha', 'Mumbai']

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md border border-gray-200'>
      <h1 className='font-bold text-lg mb-3'>Filter Jobs</h1>
      <hr className='mb-4' />

      <div className="mb-5">
        <h1 className="font-bold text-lg mb-2">Location</h1>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc, index) => (
              <SelectItem key={index} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filterData.map((data, index) => (
        <div key={index} className="mb-5">
          <h1 className="font-bold text-lg mb-2">{data.filterType}</h1>
          <RadioGroup>
            {data.array.map((item, idx) => (
              <div key={idx} className='flex items-center space-x-2 my-2'>
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard
