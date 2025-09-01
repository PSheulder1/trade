// components/WithdrawalModal.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import useWithdrawalRequests from "../hooks/useWithdrawalRequests";
import { fetchWithAuth } from "../lib/api";

type WithdrawalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CurrencyOption = "USD" | "BTC" | "ETH" | "USDT";
type USDOption = "SogeBank" | "OtherBank" | "Cash";
type CryptoTypeOption = "INTERNAL" | "EXTERNAL";

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currency, setCurrency] = useState<CurrencyOption>("USD");
  const [amount, setAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [usdOption, setUsdOption] = useState<USDOption | "">("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [cryptoType, setCryptoType] = useState<CryptoTypeOption>("INTERNAL");
  const [accountIdentifier, setAccountIdentifier] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrency("USD");
      setAmount("");
      setWalletAddress("");
      setUsdOption("");
      setAccountName("");
      setAccountNumber("");
      setCryptoType("INTERNAL");
      setAccountIdentifier("");
      setMessage("");
      setIsProcessing(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const { requests, refreshRequests } = useWithdrawalRequests();

  const handleWithdraw = async () => {
    // Validation
    if (!amount) return;

    if (currency === "USD" && !usdOption) return;
    if (
      currency === "USD" &&
      (usdOption === "SogeBank" || usdOption === "OtherBank")
    ) {
      if (!accountName || !accountNumber) return;
    }

    if (currency !== "USD") {
      if (!cryptoType) return;
      if (cryptoType === "INTERNAL" && !accountIdentifier) return;
      if (cryptoType === "EXTERNAL" && !walletAddress) return;
    }

    setIsProcessing(true);

    try {
      const response = await fetchWithAuth("/withdrawals/create/", {
        method: "POST",
        body: JSON.stringify({
          currency,
          amount,
          wallet_address: walletAddress || null,
          option: usdOption || null,
          account_name: accountName || null,
          account_number: accountNumber || null,
          account_identifier: accountIdentifier || null, // for crypto internal
          crypto_type: cryptoType || null, // for crypto
          message: message || null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Withdrawal Response:", response);
      refreshRequests();
      setIsSuccess(true);
      toast.success("Withdrawal request submitted successfully!");
    } catch (error: any) {
      console.log("❌ Withdrawal Error:", error?.message || error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-md"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-dark-800 rounded-2xl border border-gray-800 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {isSuccess
                    ? "Withdrawal Request Sent!"
                    : "Request Withdrawal"}
                </h2>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={onClose}
                >
                  <FiX size={24} />
                </button>
              </div>

              {!isSuccess ? (
                <div className="space-y-4">
                  {/* Amount */}
                  <div>
                    <label className="block text-gray-400 mb-1">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                    />
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block text-gray-400 mb-1">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) =>
                        setCurrency(e.target.value as CurrencyOption)
                      }
                      className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                    >
                      <option value="USD">USD</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>

                  {/* USD Options */}
                  {currency === "USD" && (
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Withdrawal Method
                      </label>
                      <select
                        value={usdOption}
                        onChange={(e) =>
                          setUsdOption(e.target.value as USDOption)
                        }
                        className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                      >
                        <option value="">Select Method</option>
                        <option value="Cash">Cash</option>
                        <option value="SogeBank">SogeBank</option>
                        <option value="OtherBank">Other Bank</option>
                      </select>

                      {(usdOption === "SogeBank" ||
                        usdOption === "OtherBank") && (
                        <div className="space-y-2 mt-2">
                          <input
                            type="text"
                            placeholder="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Crypto Options */}
                  {currency !== "USD" && (
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Withdrawal Type
                      </label>
                      <select
                        value={cryptoType}
                        onChange={(e) =>
                          setCryptoType(e.target.value as CryptoTypeOption)
                        }
                        className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none mb-3"
                      >
                        <option value="INTERNAL">Coinbase (Internal)</option>
                        <option value="EXTERNAL">External Wallet</option>
                      </select>

                      {cryptoType === "INTERNAL" ? (
                        <input
                          type="text"
                          placeholder="Enter Coinbase Email / Username"
                          value={accountIdentifier}
                          onChange={(e) => setAccountIdentifier(e.target.value)}
                          className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder="Enter Wallet Address"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                        />
                      )}
                    </div>
                  )}

                  {/* Optional Message */}
                  <div>
                    <label className="block text-gray-400 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleWithdraw}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-neon to-emerald-500 font-bold text-dark"
                  >
                    {isProcessing ? "Processing..." : "Submit Withdrawal"}
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-neon/20 to-emerald-500/20 flex items-center justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-neon flex items-center justify-center">
                      <FiCheck className="text-dark" size={24} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
                  <p className="text-gray-400">
                    Your withdrawal request of{" "}
                    <span className="text-neon font-bold">
                      {amount} {currency}
                    </span>{" "}
                    was sent successfully.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WithdrawalModal;
