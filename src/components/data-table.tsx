'use client';

import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useGetData } from '@/lib/http';
import Image from 'next/image';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export function DataTable() {
  const { data: getData, isLoading, error } = useGetData<{ data: User[] }>('users', 'users');

  console.log(getData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const results = getData?.data || [];

  return (
    <Table>
      <TableCaption>A list of your data.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((item: User) => (
          <TableRow key={item.id}>
            <TableCell>
              <Image src={item.avatar} alt='Avatar' />
            </TableCell>
            <TableCell>{item.first_name}</TableCell>
            <TableCell>{item.last_name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
