// hooks/useDepositRequests.ts
import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "../lib/api";

// Type for a single deposit request
export type DepositRequest = {
  id: number;
  bank_name: string;
  amount: number;
  message?: string;
  status: string;
  created_at: string;
  approved_at?: string;
};

type UseDepositRequestsReturn = {
  requests: DepositRequest[];
  loading: boolean;
  error: any;
  refreshRequests: () => Promise<void>;
};

export default function useDepositRequests(): UseDepositRequestsReturn {
  const [requests, setRequests] = useState<DepositRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchWithAuth("/deposits/create/", {
        method: "GET",
      });
      setRequests(data);
    } catch (err) {
      console.error("❌ Error fetching deposit requests:", err);
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
