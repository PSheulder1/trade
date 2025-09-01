// components/DepositRequestModal.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../lib/api";


type DepositRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type BankOption = "SogeBank" | "OtherBank";

const DepositRequestModal: React.FC<DepositRequestModalProps> = ({ isOpen, onClose }) => {
  const [bankName, setBankName] = useState<BankOption>("SogeBank");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBankName("SogeBank");
      setAmount("");
      setMessage("");
      setIsProcessing(false);
      setIsSuccess(false);
    }
  }, [isOpen]);


  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetchWithAuth("/deposits/create/", {
        method: "POST",
        body: JSON.stringify({
          bank_name: bankName,
          amount,
          message: message || null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Deposit Response:", response);
      setIsSuccess(true);
      toast.success("Deposit request submitted successfully!");
    } catch (error: any) {
      console.error(
        "❌ Deposit Error:",
        error?.message || JSON.stringify(error)
      );
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
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
                  {isSuccess ? "Deposit Request Sent!" : "Request Deposit"}
                </h2>
                <button className="text-gray-400 hover:text-white" onClick={onClose}>
                  <FiX size={24} />
                </button>
              </div>

              {!isSuccess ? (
                <div className="space-y-4">
                  {/* Amount */}
                  <div>
                    <label className="block text-gray-400 mb-1">Amount USD</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                      placeholder="Enter deposit amount"
                    />
                  </div>

                  {/* Bank */}
                  <div>
                    <label className="block text-gray-400 mb-1">Bank</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value as BankOption)}
                      className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none"
                    >
                      <option value="SogeBank">SogeBank</option>
                      <option value="OtherBank">Other Bank</option>
                    </select>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label className="block text-gray-400 mb-1">Message (Optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-3 outline-none resize-none"
                      placeholder="Any notes for the admin"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleDeposit}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-neon to-emerald-500 font-bold text-dark"
                  >
                    {isProcessing ? "Processing..." : "Submit Deposit"}
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
                    Your deposit request of <span className="text-neon font-bold">{amount} USD</span> was sent successfully.
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

export default DepositRequestModal;
