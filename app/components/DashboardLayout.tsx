// components/DashboardLayout.jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiDollarSign, FiCreditCard, FiSettings, FiUser, FiBarChart2, FiLogOut, FiBell } from 'react-icons/fi';
import DashboardHome from './dashboard/DashboardHome';
import WalletPage from './dashboard/WalletPage';
import ExchangePage from './dashboard/ExchangePage';
import AccountPage from './dashboard/AccountPage';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  const [name, setName]=useState("");
  const [avatar, setAvatar] = useState("");

  

  const router = useRouter()

   const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push('/')
  
  };


  useEffect(() => {
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);


  console.log("avatar image url : ", avatar)



useEffect(() => {
  const sync = () => setAvatar(localStorage.getItem("imageUrl") || "");

  sync();                                         // initial load
  window.addEventListener("avatar-updated", sync); // ② listen
  return () => window.removeEventListener("avatar-updated", sync);
}, []);




  useEffect(() => {
    const sync = () => setName(localStorage.getItem("name") || "");

    sync(); // Load at start
    window.addEventListener("name-updated", sync); // Listen for realtime updates

    return () => window.removeEventListener("name-updated", sync);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
    { id: 'wallet', label: 'My Wallet', icon: <FiCreditCard /> },
    { id: 'exchange', label: 'Exchange', icon: <FiDollarSign /> },
    { id: 'account', label: 'Account', icon: <FiUser /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-dark-900 text-white overflow-hidden">
      {/* Mobile Header */}
      <motion.div 
        className="md:hidden fixed top-0 left-0 right-0 z-40 bg-dark-800 border-b border-gray-800 h-16 flex items-center px-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-dark-700 mr-3"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-neon shadow-glow" />
          <span onClick={()=>router.push('/')} className="text-lg font-bold cursor-pointer">X180</span>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <button className="relative p-2 rounded-full hover:bg-dark-700">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon to-emerald-500"></div>
        </div>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.div
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? -300 : 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed md:relative z-30 h-full bg-dark-800 border-r border-gray-800 ${isMobile ? 'w-64' : 'w-64'}`}
          >
            <div className="p-6 border-b border-gray-800 hidden md:block">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-neon shadow-glow" />
                <span onClick={()=>router.push('/')} className="text-xl font-bold cursor-pointer">X180</span>
              </div>
              
              <div className="flex items-center space-x-3 bg-dark-700 rounded-xl p-3">
                <img
                  src={avatar || "/images/avatar.jpg"}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-neon"
                />
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-gray-400">Xchange user</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-neon/10 to-emerald-500/10 text-neon border border-neon/20'
                        : 'hover:bg-dark-700'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className={`text-lg ${activeTab === item.id ? 'text-neon' : 'text-gray-400'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
              <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-400 hover:bg-red-500/10">
                <FiLogOut />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0">
        {/* Desktop Header */}
        <motion.header 
          className="hidden md:flex items-center justify-between px-8 py-4 bg-dark-800 border-b border-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h1 className="text-2xl font-bold capitalize">
            {activeTab === 'dashboard' ? 'Trading Dashboard' : activeTab}
          </h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-dark-700">
                <FiBell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center space-x-3 bg-dark-700 rounded-xl p-2 pl-4">
              <div>
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-gray-400">Xchange user</p>
              </div>
            <img
                  src={avatar || "/images/avatar.jpg"}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-neon"
                />
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === 'dashboard' && <DashboardHome />}
              {activeTab === 'wallet' && <WalletPage />}
              {activeTab === 'exchange' && <ExchangePage />}
              {activeTab === 'account' && <AccountPage />}
              {/* {activeTab === 'settings' && <SettingsPage />}
              {activeTab === 'analytics' && <AnalyticsPage />} */}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;