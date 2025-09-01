"use client";

import { motion } from 'framer-motion';
import { FiDollarSign, FiPieChart, FiActivity, FiPlus } from 'react-icons/fi';
import Navbar from '../components/Navbar';


export default function Portfolio() {
  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 1.42, value: '$60,420', allocation: '42%', color: 'bg-orange-400' },
    { symbol: 'ETH', name: 'Ethereum', amount: 8.5, value: '$24,150', allocation: '28%', color: 'bg-blue-400' },
    { symbol: 'SOL', name: 'Solana', amount: 42, value: '$4,116', allocation: '15%', color: 'bg-purple-400' },
    { symbol: 'USDC', name: 'USD Coin', amount: 15000, value: '$15,000', allocation: '15%', color: 'bg-green-400' },
  ];

  const transactions = [
    { type: 'Buy', symbol: 'BTC', amount: '0.5 BTC', value: '+$21,000', date: '2024-03-15' },
    { type: 'Swap', symbol: 'ETH', amount: 'ETH → SOL', value: '-$4,200', date: '2024-03-14' },
    { type: 'Stake', symbol: 'SOL', amount: 'Staked', value: '+12% APY', date: '2024-03-13' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      <section className="container mx-auto px-6 py-12">
        {/* Portfolio Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Portfolio</h1>
            <div className="flex items-center text-gray-400">
              <FiDollarSign className="mr-2" />
              <span className="text-lg">Total Balance</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center"
            >
              <FiPlus className="mr-2 text-xl" />
              New Transaction
            </motion.button>
          </div>
        </motion.div>

        {/* Total Balance Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-3xl p-8 mb-12 backdrop-blur-lg"
        >
          <div className="flex justify-between items-end">
            <div>
              <p className="text-5xl font-bold mb-4">$103,686.00</p>
              <div className="flex items-center text-green-400">
                <span className="flex items-center">
                  <FiDollarSign className="mr-1" /> +12.4% (30d)
                </span>
              </div>
            </div>
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-xl" />
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M10 50Q25 15 50 10Q75 15 90 50Q75 85 50 90Q25 85 10 50"
                  fill="none"
                  stroke="url(#portfolioGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Asset Allocation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Asset List */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-3xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Asset Allocation</h2>
              <FiPieChart className="text-blue-400" />
            </div>
            <div className="space-y-4">
              {assets.map((asset, index) => (
                <motion.div
                  key={asset.symbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full ${asset.color}`} />
                    <div>
                      <h3 className="font-semibold">{asset.name}</h3>
                      <p className="text-gray-400 text-sm">{asset.amount} {asset.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{asset.value}</p>
                    <p className="text-gray-400 text-sm">{asset.allocation}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-3xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <FiActivity className="text-green-400" />
            </div>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold">{transaction.type}</h3>
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`${transaction.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.value}
                    </p>
                    <p className="text-gray-400 text-sm">{transaction.amount}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {['Deposit', 'Withdraw', 'Swap', 'Stake'].map((action, index) => (
            <motion.button
              key={action}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:border-blue-400 transition-colors"
            >
              <div className="text-3xl mb-2">
                <FiPlus />
              </div>
              <span className="text-lg">{action}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Security Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-full">
            <FiDollarSign className="text-green-400" />
            <span>FDIC Insured USD Balances</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-6 py-3 rounded-full">
            <FiPieChart className="text-blue-400" />
            <span>Cold Storage Insurance</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}