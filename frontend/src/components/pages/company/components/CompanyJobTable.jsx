import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyJobTable = () => {
  const {allCompanyJobs, searchJobByText} = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allCompanyJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob =
      allCompanyJobs?.length >= 0 &&
      allCompanyJobs?.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJob);
  }, [allCompanyJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>List of recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={() => navigate(`/companies/job/create/${job._id}`)}>
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div className="flex items-center w-fit gap-2 cursor-pointer mt-2"  onClick={() => navigate(`/company/jobs/${job._id}/applicants`)}>
                      <Eye className="w-4"/>
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyJobTable;
