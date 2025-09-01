// components/dashboard/WalletPage.jsx
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiCopy,
  FiPlus,
  FiArrowDownRight,
  FiArrowUpRight,
} from "react-icons/fi";
import DepositModal from "../DepositModal";
import toast from "react-hot-toast";
import useWallet from "@/app/hooks/useWallet";
import WithdrawalModal from "../WithdrawalModal";
import useWithdrawalRequests from "@/app/hooks/useWithdrawalRequests";
import WithdrawalRequestsTable from "../WithdrawalRequestsTable";
import DepositRequestsTable from "../DepositRequestsTable";

const WalletPage = () => {
  const currencies = [
    {
      name: "Tether (USDT)",
      amount: "15,250.75",
      value: "$15,250.75",
      change: "+1.2%",
      positive: true,
    },
    {
      name: "US Dollars (USD)",
      amount: "8,420.30",
      value: "$8,420.30",
      change: "-0.8%",
      positive: false,
    },
    {
      name: "Bitcoin (BTC)",
      amount: "0.125",
      value: "$4,230.50",
      change: "+3.1%",
      positive: true,
    },
    {
      name: "Ethereum (ETH)",
      amount: "1.75",
      value: "$3,500.25",
      change: "+1.7%",
      positive: true,
    },
  ];

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWidthdrawalModalOpen, setIsWidthdrawalOpen] = useState(false);

  const { balance, currency, loading, error } = useWallet();

  const { requests, refreshRequests } = useWithdrawalRequests();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold ">My Wallet</h2>
        <p className="text-gray-400">
          Manage your digital assets and transactions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          className="bg-dark-800 border border-gray-800 rounded-xl p-6 md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Balance Overview</h3>
            <div className="text-2xl font-bold">
              ${balance} {currency}
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <DepositModal
              isOpen={isDepositModalOpen}
              onClose={() => setIsDepositModalOpen(false)}
            />
            <motion.button
              className="flex-1 flex flex-col items-center p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDepositModalOpen(true)}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mb-3">
                <FiArrowDown className="text-neon" size={20} />
              </div>
              <span>Deposit</span>
            </motion.button>
            <button
              onClick={() => setIsWidthdrawalOpen(true)}
              className="flex-1 cursor flex flex-col items-center p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mb-3">
                <FiArrowUp className="text-neon" size={20} />
              </div>
              <span>Withdraw</span>
            </button>

            <WithdrawalModal
              isOpen={isWidthdrawalModalOpen}
              onClose={() => setIsWidthdrawalOpen(false)}
            />

            <button className="flex-1 flex flex-col items-center p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mb-3">
                <FiCopy className="text-neon" size={20} />
              </div>
              <span>Transfer</span>
            </button>
          </div>

          <div className="bg-dark-700 rounded-xl p-4">
            <div className="flex justify-between mb-3">
              <span className="text-gray-400">USDT Wallet Address</span>
              <button className="text-neon text-sm flex items-center">
                <FiCopy className="mr-1" /> Copy
              </button>
            </div>
            <div className="font-mono bg-dark-800 p-3 rounded-lg text-sm overflow-x-auto">
              0x742d35Cc6634C0532925a3b844Bc9e
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-dark-800 border border-gray-800 rounded-xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-6">Quick Actions</h3>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                  <FiPlus className="text-neon" />
                </div>
                <span>Add Funds</span>
              </div>
              <div className="text-neon">+</div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                  <FiArrowUp className="text-neon" />
                </div>
                <span>Withdraw Funds</span>
              </div>
              <div className="text-neon">→</div>
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                  <FiCopy className="text-neon" />
                </div>
                <span>Generate New Address</span>
              </div>
              <div className="text-neon">⟳</div>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Withdrawal Requests
            <FiArrowDownRight className="text-red-500" />
          </h2>
          <span className="h-1 flex-1 ml-4 bg-gradient-to-r from-neon to-emerald-500 rounded-full"></span>
        </div>

        <WithdrawalRequestsTable />
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Deposit Requests
            <FiArrowUpRight className="text-emerald-500" />
          </h2>
          <span className="h-1 flex-1 ml-4 bg-gradient-to-r from-neon to-emerald-500 rounded-full"></span>
        </div>

        <DepositRequestsTable />
      </div>

      <div className="mt-7">
        <br />
      </div>
    </div>
  );
};

export default WalletPage;
