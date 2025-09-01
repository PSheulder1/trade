// hooks/useWithdrawalRequests.ts
import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "../lib/api";

// Type for a single withdrawal request
export type WithdrawalRequest = {
  id: number;
  currency: string;
  amount: number;
  wallet_address?: string | null;
  option?: string | null;
  account_identifier?: string | null; // new field
  crypto_type?: "INTERNAL" | "EXTERNAL" | null; // new field
  account_name?: string | null;
  account_number?: string | null;
  message?: string | null;
  status: string;
  created_at: string;
  processed_at?: string | null;
};

type UseWithdrawalRequestsReturn = {
  requests: WithdrawalRequest[];
  loading: boolean;
  error: any;
  refreshRequests: () => Promise<void>;
};

export default function useWithdrawalRequests(): UseWithdrawalRequestsReturn {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchWithAuth("/withdrawals/create/", {
        method: "GET",
      });
      setRequests(data);
    } catch (err) {
      console.log("❌ Error fetching withdrawal requests:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const refreshRequests = async () => {
    await fetchRequests();
  };

  return { requests, loading, error, refreshRequests };
}
