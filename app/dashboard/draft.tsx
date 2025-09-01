"use client";

import { motion } from 'framer-motion';
import { FiActivity, FiDollarSign, FiPieChart, FiArrowUpRight, FiShield, FiBell, FiSettings } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import { BiWallet } from 'react-icons/bi';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function Dashboard() {
  // Chart Configuration
  const priceChart = {
    options: {
      chart: {
        type: 'area',
        height: 350,
        foreColor: '#6B7280',
        toolbar: { show: true },
        zoom: { enabled: true }
      },
      colors: ['#60a5fa', '#34d399'],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      tooltip: {
        theme: 'dark',
        x: { show: false }
      },
      grid: { borderColor: '#374151' }
    },
    series: [
      { name: 'Portfolio Value', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] }
    ]
  };

  const portfolioAllocation = {
    options: {
      chart: {
        type: 'donut',
        foreColor: '#6B7280'
      },
      colors: ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'],
      labels: ['Bitcoin', 'Ethereum', 'Stablecoins', 'Altcoins'],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Allocation',
                color: '#fff'
              }
            }
          }
        }
      },
      dataLabels: { enabled: false },
      legend: { position: 'bottom' }
    },
    series: [42, 28, 15, 15]
  };

  const recentActivity = [
    { type: 'Buy', asset: 'BTC', amount: '0.5', date: '2024-03-15', status: 'Completed' },
    { type: 'Swap', asset: 'ETH → SOL', amount: '4.2', date: '2024-03-14', status: 'Pending' },
    { type: 'Deposit', asset: 'USD', amount: '5000', date: '2024-03-13', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      
      
      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}

    

        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold flex items-center gap-2"
          >
            <FiActivity className="text-blue-400" />
            Trading Dashboard
          </motion.h1>
          <div className="flex gap-4">
            <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
              <FiBell className="text-xl" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
              <FiSettings className="text-xl" />
            </motion.button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Balance', value: '$154,230', icon: <BiWallet />, change: '+2.4%' },
            { title: '24h Change', value: '+$3,420', icon: <FiDollarSign />, change: '+1.8%' },
            { title: 'Active Trades', value: '12', icon: <FiActivity />, change: '-0.6%' },
            { title: 'Total Assets', value: '8', icon: <FiPieChart />, change: '3.1%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
                  <p className="text-2xl font-bold mb-2">{stat.value}</p>
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl p-3 bg-white/5 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Chart Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Portfolio Performance</h2>
                <div className="flex gap-2">
                  {['1D', '1W', '1M', '1Y'].map((range) => (
                    <button
                      key={range}
                      className="px-3 py-1 text-sm bg-white/5 rounded-lg hover:bg-blue-400/20"
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <Chart
                options={priceChart.options}
                series={priceChart.series}
                type="area"
                height={350}
                
              />
            </motion.div>
          </div>

          {/* Portfolio Allocation */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full"
            >
              <h2 className="text-xl font-bold mb-6">Asset Allocation</h2>
              <Chart
                options={portfolioAllocation.options}
                series={portfolioAllocation.series}
                type="donut"
                height={300}
              />
              <div className="mt-6 space-y-3">
                {['Bitcoin', 'Ethereum', 'Stablecoins', 'Altcoins'].map((asset, index) => (
                  <div key={asset} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${portfolioAllocation.options.colors[index]}`} />
                      <span>{asset}</span>
                    </div>
                    <span>{portfolioAllocation.series[index]}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Asset</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-white/5">
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded ${activity.type === 'Buy' ? 'bg-green-400/20 text-green-400' : 'bg-blue-400/20 text-blue-400'}`}>
                            {activity.type}
                          </span>
                        </td>
                        <td>{activity.asset}</td>
                        <td>{activity.amount}</td>
                        <td>{activity.date}</td>
                        <td>
                          <span className={`px-2 py-1 rounded ${activity.status === 'Completed' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Market Overview */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6">Market Overview</h2>
              <div className="space-y-4">
                {[
                  { symbol: 'BTC', price: '$42,300', change: '+2.4%' },
                  { symbol: 'ETH', price: '$2,850', change: '+1.8%' },
                  { symbol: 'SOL', price: '$98.00', change: '-0.6%' },
                  { symbol: 'DOT', price: '$7.20', change: '+3.1%' }
                ].map((coin, index) => (
                  <div key={coin.symbol} className="flex justify-between items-center p-3 bg-gray-900/30 rounded-lg hover:bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center">
                        {coin.symbol}
                      </div>
                      <div>
                        <p className="font-semibold">{coin.symbol}</p>
                        <p className="text-sm text-gray-400">{coin.price}</p>
                      </div>
                    </div>
                    <span className={`text-sm ${coin.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mt-8"
            >
              <h2 className="text-xl font-bold mb-6">Security Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiShield className="text-green-400" />
                    <span>2FA Authentication</span>
                  </div>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <BiWallet className="text-blue-400" />
                    <span>Verified Identity</span>
                  </div>
                  <span className="text-green-400">Verified</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiSettings className="text-purple-400" />
                    <span>Connected Devices</span>
                  </div>
                  <span className="text-blue-400">3 Devices</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}