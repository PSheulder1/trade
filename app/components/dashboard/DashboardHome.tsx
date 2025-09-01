// components/dashboard/DashboardHome.jsx
import useWallet from "@/app/hooks/useWallet";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiTrendingUp,
  FiDollarSign,
  FiCreditCard,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
const StatCard = ({ title, value, change, isPositive, icon }) => (
  <motion.div
    className="bg-dark-800 border border-gray-800 rounded-xl p-5"
    whileHover={{
      y: -5,
      boxShadow: "0 10px 30px -10px rgba(0, 255, 153, 0.1)",
    }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-2 rounded-lg bg-dark-700 text-neon">{icon}</div>
    </div>
    <div
      className={`mt-3 flex items-center text-sm ${
        isPositive ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
      <span>{change}</span>
    </div>
  </motion.div>
);

const DashboardHome = () => {
  const [name, setName] = useState("");
  const { usdWallet, cryptoWallets, loading, error, refreshWallet } =
    useWallet();

  console.log("crypto wallet : ", cryptoWallets);

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
  });
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        className="bg-gradient-to-r from-dark-800 to-dark-900 border border-neon/20 rounded-2xl p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neon/5 to-transparent"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Welcome back, {name}!
          </h2>
          <p className="text-gray-400 mb-6">
            Easily exchange your currencies, enjoy faster transactions, and stay
            on top of market trends
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Balance"
          value={usdWallet ? `$${usdWallet.balance.toFixed(2)}` : "$0.00"}
          change="+2.5% today"
          isPositive={true}
          icon={<FiDollarSign size={20} />}
        />

        {cryptoWallets.map((wallet) => (
          <StatCard
            key={wallet.currency}
            title={`${wallet.currency} Holdings`}
            value={`${wallet.balance} ${wallet.currency}`}
            change="+0.0% today" // you can calculate real change later if needed
            isPositive={true} // or false based on change
            icon={<FiArrowUpRight size={20} />}
          />
        ))}
      </div>

      {/* Portfolio Overview */}
      {/* Portfolio Overview */}
      <motion.div
        className="bg-dark-800 border border-gray-800 rounded-xl p-5 lg:col-span-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Portfolio Value</h3>
          <div className="flex space-x-2">
            <button className="text-xs px-3 py-1 bg-dark-700 rounded-lg">
              1D
            </button>
            <button className="text-xs px-3 py-1 bg-neon text-dark rounded-lg">
              1W
            </button>
            <button className="text-xs px-3 py-1 bg-dark-700 rounded-lg">
              1M
            </button>
            <button className="text-xs px-3 py-1 bg-dark-700 rounded-lg">
              1Y
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { name: "USD", value: usdWallet?.balance || 0 },
                ...cryptoWallets.map((wallet) => ({
                  name: wallet.currency,
                  value: wallet.balance,
                })),
              ]}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid stroke="#2d2d2d" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f1f1f",
                  border: "none",
                  borderRadius: 8,
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00FFAB"
                strokeWidth={3}
                dot={{ r: 5, fill: "#00FFAB" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-center">
          <h4 className="font-bold mb-1">Total Portfolio</h4>
          <p className="text-gray-500 text-sm">
            $
            {(
              (usdWallet?.balance || 0) +
              cryptoWallets.reduce((acc, w) => acc + w.balance, 0)
            ).toFixed(2)}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
