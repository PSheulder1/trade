// components/WithdrawalRequestsTable.tsx
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
import useWithdrawalRequests, {
  WithdrawalRequest,
} from "../hooks/useWithdrawalRequests";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function WithdrawalRequestsTable() {
  const { requests, loading, error, refreshRequests } = useWithdrawalRequests();

  if (loading)
    return (
      <p className="text-gray-400 text-center py-8">
        Loading withdrawal requests...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center py-8">
        Failed to load withdrawal requests.
      </p>
    );
  if (!requests.length)
    return (
      <p className="text-gray-400 text-center py-8">
        No withdrawal requests found.
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Table>
        <TableCaption>Your recent withdrawal requests</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Currency</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Option / Wallet</TableHead>
            <TableHead className="text-white">Account Info</TableHead>
            <TableHead className="text-white">Crypto Type</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-right text-white">
              Requested At
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request: WithdrawalRequest) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              {/* Currency */}
              <TableCell>
                <span
                  className="font-bold"
                  style={{
                    color:
                      request.currency === "BTC"
                        ? "#f7931a"
                        : request.currency === "ETH"
                        ? "#627eea"
                        : request.currency === "USDT"
                        ? "#26a17b"
                        : "white",
                  }}
                >
                  {request.currency}
                </span>
              </TableCell>

              <TableCell>{Number(request.amount).toFixed(2)}</TableCell>

              {/* Option / Wallet */}
              <TableCell>
                {request.currency === "USD"
                  ? request.option || "-"
                  : request.wallet_address || "-"}
              </TableCell>

              {/* Account Info */}
              <TableCell>
                {request.currency === "USD"
                  ? request.account_name
                    ? `${request.account_name} - ${
                        request.account_number || "-"
                      }`
                    : "-"
                  : request.account_identifier || "-"}
              </TableCell>

              {/* Crypto Type */}
              <TableCell>
                {request.currency !== "USD" ? (
                  request.crypto_type === "INTERNAL" ? (
                    <span className="flex items-center gap-1 text-green-500">
                      <FiArrowDown /> INTERNAL
                    </span>
                  ) : request.crypto_type === "EXTERNAL" ? (
                    <span className="flex items-center gap-1 text-amber-400">
                      <FiArrowUp /> EXTERNAL
                    </span>
                  ) : (
                    "-"
                  )
                ) : (
                  "-"
                )}
              </TableCell>

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
