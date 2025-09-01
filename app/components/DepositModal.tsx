// components/DepositModal.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowDown,
  FiX,
  FiCreditCard,
  FiGlobe,
  FiShield,
  FiDollarSign,
  FiCheck,
} from "react-icons/fi";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import DepositRequestModal from "./DepositRequestModal";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../lib/api";

const DepositModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount("");
      setSelectedMethod(null);
      setIsProcessing(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const paymentMethods = [
    {
      id: "coinbase",
      name: "Coinbase",
      icon: <FiGlobe />,
      fee: "0% fee",
      time: "Instant",
      min: 10,
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: <FiCreditCard />,
      fee: "1.5% fee",
      time: "1-2 days",
      min: 5,
    },

    {
      id: "Via Bank",
      name: "Via Bank",
      icon: <FiDollarSign />,
      fee: "0.8% fee",
      time: "Instant",
      min: 50,
    },
  ];


const handleDeposit = async () => {
  if (!selectedMethod || !amount) return;

  setIsProcessing(true);
  console.log("clicked");

  let url = "";
  if (selectedMethod === "coinbase") {
    url += "coinbase";
  } else if (selectedMethod === "stripe") {
    url += "stripe";
  }

  try {
    const response = await fetchWithAuth(`/${url}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount, // Or any amount the user wants
      }),
    });

    console.log("✅ Response:", response);

    if (selectedMethod === "coinbase") {
      const hostedUrl = response.hosted_url;
      if (hostedUrl) {
        console.log("Redirecting to Coinbase hosted URL:", hostedUrl);
        window.location.href = hostedUrl;
      }
    }
  } catch (error: any) {
    console.error("❌ Error during payment:", error.message || error);
    toast.error("Something went wrong with the payment. Please try again!");
  } finally {
    setIsProcessing(false);
  }
};


  return (
    <>
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

            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-md"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-dark-800 rounded-2xl border border-gray-800 shadow-xl">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-emerald-500/10 opacity-30 pointer-events-none" />

                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <motion.h2
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {isSuccess ? "Deposit Successful!" : "Fund Your Account"}
                    </motion.h2>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-white"
                      onClick={onClose}
                    >
                      <FiX size={24} />
                    </motion.button>
                  </div>

                  {!isSuccess && (
                    <motion.p
                      className="text-gray-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Add funds to your trading account instantly
                    </motion.p>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 h-screen overflow-y-auto">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-neon/20 to-emerald-500/20 flex items-center justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-neon flex items-center justify-center">
                          <FiCheck className="text-dark" size={24} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Deposit Complete!
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Your deposit of{" "}
                        <span className="text-neon font-bold">${amount}</span>{" "}
                        was successful
                      </p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-dark-700 rounded-xl p-4 text-left"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Amount:</span>
                          <span className="font-bold">${amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Method:</span>
                          <span className="text-neon">
                            {
                              paymentMethods.find(
                                (m) => m.id === selectedMethod
                              )?.name
                            }
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : isProcessing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-neon/20 to-emerald-500/20 flex items-center justify-center mb-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-12 h-12 rounded-full border-4 border-neon border-t-transparent"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Processing Deposit
                      </h3>
                      <p className="text-gray-400">
                        Completing your deposit of{" "}
                        <span className="text-neon font-bold">${amount}</span>
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Amount Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                      >
                        <label className="block text-gray-400 mb-2">
                          Deposit Amount (USD)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-dark-700 border border-gray-700 rounded-xl px-4 py-4 pl-12 text-xl focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none transition"
                          />
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                            $
                          </div>
                          <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm bg-dark-800 px-3 py-1 rounded-lg hover:bg-neon hover:text-dark transition-colors"
                            onClick={() => setAmount("500")}
                          >
                            MAX
                          </button>
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>Min: $5.00</span>
                          <span>Max: $10,000.00</span>
                        </div>
                      </motion.div>

                      {/* Payment Methods */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-gray-400 mb-2">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {paymentMethods.map((method) => (
                            <motion.button
                              key={method.id}
                              className={`p-4 rounded-xl border flex flex-col items-center transition-colors ${
                                selectedMethod === method.id
                                  ? "border-neon bg-neon/10"
                                  : "border-gray-700 hover:border-neon"
                              }`}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedMethod(method.id)}
                            >
                              <div
                                className={`text-2xl mb-2 ${
                                  selectedMethod === method.id
                                    ? "text-neon"
                                    : "text-gray-400"
                                }`}
                              >
                                {method.icon}
                              </div>
                              <div className="font-medium mb-1">
                                {method.name}
                              </div>
                              <div className="text-xs text-gray-400">
                                {method.fee}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>

                      {/* Summary */}
                      {selectedMethod && amount && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 bg-dark-700 rounded-xl p-4"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Amount:</span>
                            <span className="font-bold">${amount}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Fee:</span>
                            <span className="text-neon">
                              {
                                paymentMethods.find(
                                  (m) => m.id === selectedMethod
                                )?.fee
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              You'll receive:
                            </span>
                            <span className="font-bold">
                              ${(amount * 0.985).toFixed(2)} USDT
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Deposit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6"
                      >
                        <motion.button
                          onClick={handleDeposit}
                          disabled={!amount || !selectedMethod}
                          className={`w-full cursor-pointer py-4 rounded-xl text-lg font-bold relative overflow-hidden ${
                            !amount || !selectedMethod
                              ? "bg-gray-700 cursor-not-allowed"
                              : "bg-gradient-to-r from-neon to-emerald-500 text-dark"
                          }`}
                          whileHover={
                            amount && selectedMethod
                              ? {
                                  scale: 1.02,
                                  boxShadow: "0 0 20px rgba(0, 255, 153, 0.5)",
                                }
                              : {}
                          }
                          whileTap={
                            amount && selectedMethod ? { scale: 0.98 } : {}
                          }
                        >
                          <span className="relative z-10">
                            {amount && selectedMethod
                              ? "Confirm Deposit"
                              : "Select Amount & Method"}
                          </span>
                          {amount && selectedMethod && (
                            <motion.div
                              className="absolute inset-0 bg-white opacity-0"
                              animate={{
                                opacity: [0, 0.2, 0],
                                left: ["-100%", "100%", "100%"],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                              }}
                            />
                          )}
                        </motion.button>

                        <div className="mb-24"></div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DepositRequestModal
        isOpen={selectedMethod === "Via Bank"}
        onClose={() => {
          setIsDepositModalOpen(false);
          setSelectedMethod(null);
        }}
      />
    </>
  );
};

export default DepositModal;
