// components/Footer.jsx
import { motion } from 'framer-motion';
import { RiTwitterXFill } from "react-icons/ri";
import { RiTelegram2Line } from "react-icons/ri";
import { AiOutlineDiscord } from "react-icons/ai";
import { FiYoutube } from "react-icons/fi";

const socialLinks = [
  { name: 'X', icon: <RiTwitterXFill />, url: '#' },
  { name: 'Telegram', icon: <RiTelegram2Line />, url: '#' },
  { name: 'Discord', icon: <AiOutlineDiscord />, url: '#' },
  { name: 'YouTube', icon: <FiYoutube />, url: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-dark-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 text-xl font-bold">
              <div className="w-3 h-3 rounded-full bg-neon shadow-glow" />
              <span className="ml-[-20px]">X180</span>
            </div>
            <p className="mt-4 text-gray-500 text-sm max-w-xs">
              Advanced trading education platform for stablecoin markets
            </p>
          </div>
          
          <div className="flex space-x-6 mb-8 md:mb-0">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-gray-500 hover:text-neon text-2xl"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} X180. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-neon transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neon transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neon transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}