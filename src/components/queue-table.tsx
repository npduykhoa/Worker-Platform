'use client';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableRow } from '@/components/ui/table';

const data = [
  {
    name: 'default',
    created: '2022-02-22T00:00:00Z',
    available: 0,
    running: 0,
    status: Math.random() > 0.5 ? 'Active' : 'Paused',
  },
  {
    name: 'email',
    created: '2022-02-22T00:00:00Z',
    available: Math.floor(Math.random() * 10),
    running: Math.floor(Math.random() * 10),
    status: Math.random() > 0.5 ? 'Active' : 'Paused',
  },
  {
    name: 'long_running',
    created: '2022-02-22T00:00:00Z',
    available: Math.floor(Math.random() * 10),
    running: Math.floor(Math.random() * 10),
    status: Math.random() > 0.5 ? 'Active' : 'Paused',
  },
  {
    name: 'supervisor',
    created: '2022-02-22T00:00:00Z',
    available: Math.floor(Math.random() * 10),
    running: Math.floor(Math.random() * 10),
    status: Math.random() > 0.5 ? 'Active' : 'Paused',
  },
];

export function QueueTable() {
  return (
    <Table>
      <TableCaption>A list of your data.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Available</TableCell>
          <TableCell>Running</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.created}</TableCell>
            <TableCell>{item.available}</TableCell>
            <TableCell>{item.running}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total: {data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
