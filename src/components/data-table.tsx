'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const data = Array.from({ length: 5 }, (_, i) => ({
  id: window.crypto.randomUUID(),
  name: `MonthlyBilling_${i + 1}`,
  status: Math.random() > 0.5 ? 'Running' : 'Completed',
  created: new Date().toLocaleDateString(),
  pendingJobs: Math.floor(Math.random() * 10),
  totalJobs: Math.floor(Math.random() * 10)
}))

export function DataTable() {
  return (
    <Table>
      <TableCaption>A list of your data.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Pending Jobs</TableCell>
          <TableCell>Total Jobs</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.created}</TableCell>
            <TableCell>{item.pendingJobs}</TableCell>
            <TableCell>{item.totalJobs}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total: {data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
