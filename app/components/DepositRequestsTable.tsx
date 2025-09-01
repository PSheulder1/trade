"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import useDepositRequests, { DepositRequest } from "../hooks/useDepositRequests";

export default function DepositRequestsTable() {
  const { requests, loading, error, refreshRequests } = useDepositRequests();

  if (loading)
    return (
      <p className="text-gray-400 text-center py-8">Loading deposit requests...</p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center py-8">
        Failed to load deposit requests.
      </p>
    );
  if (!requests.length)
    return (
      <p className="text-gray-400 text-center py-8">
        No deposit requests found.
      </p>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <div className="mb-4 text-2xl font-bold text-neon">Deposit Requests</div>
      <Table>
        <TableCaption>Your recent deposit requests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Bank Name</TableHead>
            <TableHead className="text-white">Amount USD</TableHead>
            <TableHead className="text-white">Message</TableHead>
            <TableHead className="text-white">Approved</TableHead>
            <TableHead className="text-right text-white">Requested At</TableHead>
            <TableHead className="text-right text-white">Approved At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request: DepositRequest) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.bank_name}</TableCell>
              <TableCell>{Number(request.amount).toFixed(2)}</TableCell>
              <TableCell>{request.message || "-"}</TableCell>
             <TableCell>
                <span
                    className={`px-2 py-1 rounded-full font-semibold text-[8px] ${
                    request.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "ACCEPTED"
                        ? "bg-green-100 text-green-800"
                        : request.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                    {request.status}
                </span>
                </TableCell>
              <TableCell className="text-right">
                {new Date(request.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {request.approved_at ? new Date(request.approved_at).toLocaleString() : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
