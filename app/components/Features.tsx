// components/Features.jsx
import { motion } from 'framer-motion';
import { AiFillThunderbolt } from "react-icons/ai";
import { LuBrain } from "react-icons/lu";
import { CiLock } from "react-icons/ci";

const features = [
  {
    title: "Fast Exchange",
    description: "Instant USDT to USD conversions with minimal fees and real-time rates. Execute trades in milliseconds.",
    icon: <AiFillThunderbolt />
  },
  {
    title: "Smart Learning Modules",
    description: "Interactive trading courses with live market simulations. Master technical analysis and risk management.",
    icon: <LuBrain />
  },
  {
    title: "Secure & Transparent",
    description: "Bank-grade security with transparent fee structures. All transactions are verifiable on-chain.",
    icon: <CiLock />
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Powerful Trading Platform
          </motion.h2>
          <motion.div 
            className="h-1 w-20 bg-neon mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p 
            className="max-w-2xl mx-auto text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Everything you need to master stablecoin trading in one powerful platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-dark-800 rounded-xl p-8 border border-gray-800 hover:border-neon/30 transition-colors relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 10px 30px -10px rgba(0, 255, 153, 0.1)'
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl mb-6 text-emerald-500">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}