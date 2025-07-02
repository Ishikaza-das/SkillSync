import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React from 'react'

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>List of Companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableCell>
                <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png'></AvatarImage>
                </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>01-07-2425</TableCell>
            <TableCell className='text-right'>
                <Popover>
                    <PopoverTrigger className='cursor-pointer'>
                        <MoreHorizontal/>
                    </PopoverTrigger>
                    <PopoverContent className='w-32'>
                        <div className='flex items-center gap-2 w-fit'>
                            <Edit2 className='w-4'/>
                            <span>Edit</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
