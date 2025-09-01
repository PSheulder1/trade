// hooks/useWallet.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Types for wallets
export type Wallet = {
  currency: string;
  balance: number;
};

type UseWalletReturn = {
  usdWallet: Wallet | null;
  cryptoWallets: Wallet[];
  loading: boolean;
  error: any;
  refreshWallet: () => Promise<void>;
};

export default function useWallet(): UseWalletReturn {
  const [usdWallet, setUsdWallet] = useState<Wallet | null>(null);
  const [cryptoWallets, setCryptoWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchWallets = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch USD wallet
      const usdResponse = await axios.get("http://127.0.0.1:8000/wallet-info", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsdWallet({
        currency: usdResponse.data.currency,
        balance: usdResponse.data.balance,
      });

      // Fetch crypto wallets
      const cryptoResponse = await axios.get("http://127.0.0.1:8000/crypto-wallets/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCryptoWallets(
        cryptoResponse.data.map((wallet: any) => ({
          currency: wallet.currency,
          balance: wallet.balance,
        }))
      );
    } catch (err) {
      console.error("Error fetching wallets:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  // Expose refresh function
  const refreshWallet = async () => {
    await fetchWallets();
  };

  return { usdWallet, cryptoWallets, loading, error, refreshWallet };
}
