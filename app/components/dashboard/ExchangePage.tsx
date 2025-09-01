// components/dashboard/ExchangePage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowDownLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiRepeat,
  FiXCircle,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import useWallet from "@/app/hooks/useWallet";
import { fetchWithAuth } from "@/app/lib/api";

const currencies = ["USDT", "USD", "BTC", "ETH"];

const ExchangePage = () => {
  const [fromAmount, setFromAmount] = useState("1000");
  const [toAmount, setToAmount] = useState("999.50");
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("USD");
  const [activeTab, setActiveTab] = useState("market");
  const [exchangeRate, setExchangeRate] = useState(1);

  const { usdWallet, cryptoWallets, loading, error, refreshWallet } =
    useWallet();

  // Swap currencies
  const switchCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  // Calculate toAmount whenever fromAmount or currencies change
  useEffect(() => {
    if (!fromAmount || isNaN(fromAmount)) {
      setToAmount("");
      return;
    }

    // Example rates: you can replace with live API later
    let rate = 1;
    if (fromCurrency === "USD" && toCurrency === "USDT") rate = 1;
    else if (fromCurrency === "USDT" && toCurrency === "USD") rate = 0.9995;
    else if (fromCurrency === "USD" && toCurrency === "BTC") rate = 0.000027;
    else if (fromCurrency === "BTC" && toCurrency === "USD") rate = 37000;
    else if (fromCurrency === "USDT" && toCurrency === "BTC") rate = 0.000027;
    else if (fromCurrency === "BTC" && toCurrency === "USDT") rate = 37000;
    // add ETH rates as needed

    setExchangeRate(rate);
    setToAmount((parseFloat(fromAmount) * rate).toFixed(8));
  }, [fromAmount, fromCurrency, toCurrency]);

  // Handle exchange
 const handleExchange = async () => {
  if (!fromAmount || parseFloat(fromAmount) <= 0) {
    toast.error("Enter a valid amount");
    return;
  }

  try {
    const response = await fetchWithAuth("/exchange/", {
      method: "POST",
      body: JSON.stringify({
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: fromAmount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(response.message || "Exchange successful!");
    refreshWallet(); // update balances
    setFromAmount("");
    setToAmount("");
  } catch (err: any) {
  
    toast.error(err?.message || "Exchange failed");
  }
};


  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-2">Exchange</h2>
        <p className="text-gray-400">
          Convert between cryptocurrencies instantly
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          className="bg-dark-800 border border-gray-800 rounded-xl p-6 lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex border-b border-gray-800 mb-6">
            <button
              className={`px-4 py-2 font-medium relative ${
                activeTab === "market" ? "text-neon" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("market")}
            >
              Market Order
              {activeTab === "market" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                  layoutId="exchangeTab"
                />
              )}
            </button>
            <button
              className={`px-4 py-2 font-medium relative ${
                activeTab === "limit" ? "text-neon" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("limit")}
            >
              Limit Order
              {activeTab === "limit" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon"
                  layoutId="exchangeTab"
                />
              )}
            </button>
          </div>

          <div className="space-y-6">
            {/* From */}
            <div>
              <div className="bg-dark-700 border border-gray-700 rounded-xl p-3 flex items-center">
                <input
                  type="text"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="bg-transparent text-xl flex-1 outline-none"
                />
                <div className="flex items-center space-x-2">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="bg-dark-800 border border-gray-800 rounded-lg px-3 py-1 outline-none"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <button
                    className="px-3 py-1 bg-dark-800 rounded-lg"
                    onClick={() => setFromAmount(String(usdWallet?.balance))}
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>

            {/* Switch */}
            <div className="flex justify-center">
              <motion.button
                onClick={switchCurrencies}
                className="p-2 rounded-full bg-dark-700 border border-gray-700 hover:border-neon"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiRepeat className="text-neon" />
              </motion.button>
            </div>

            {/* To */}
            <div>
              <div className="bg-dark-700 border border-gray-700 rounded-xl p-3 flex items-center">
                <input
                  type="text"
                  value={toAmount}
                  readOnly
                  className="bg-transparent text-xl flex-1 outline-none"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="bg-dark-800 border border-gray-800 rounded-lg px-3 py-1 outline-none"
                >
                  {currencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exchange rate */}
            <div className="bg-dark-700 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Exchange rate</span>
                <span>
                  1 {toCurrency} = {exchangeRate} {fromCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fee</span>
                <span>0.50 {toCurrency}</span>
              </div>
            </div>

            <motion.button
              onClick={handleExchange}
              className="w-full py-4 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-xl text-lg shadow-lg shadow-neon/30 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Exchange Now</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Market Overview */}
        <motion.div
          className="bg-dark-800 border border-gray-800 rounded-xl p-6 h-64"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-6">Your Crypto Wallets</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span className="flex items-center space-x-2">
                {usdWallet?.balance > 0 ? (
                  <FiArrowUpRight className="text-green-500" />
                ) : (
                  <FiArrowDownLeft className="text-red-500" />
                )}
                <span>{usdWallet?.currency}</span>
              </span>

              <span className="font-medium">{usdWallet?.balance}</span>
            </li>
            {cryptoWallets.map((wallet) => (
              <li
                key={wallet.currency}
                className="flex justify-between items-center"
              >
                <span className="flex items-center space-x-2">
                  {wallet.balance > 0 ? (
                    <FiArrowUpRight className="text-green-500" />
                  ) : (
                    <FiArrowDownLeft className="text-red-500" />
                  )}
                  <span>{wallet.currency}</span>
                </span>
                <span className="font-medium">{wallet.balance}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ExchangePage;
