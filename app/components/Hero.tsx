// components/Hero.jsx
import { motion } from 'framer-motion';


export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
           
            <source src=" https://videos.pexels.com/video-files/30768173/13161114_640_360_25fps.mp4" type="video/mp4" />
          {/* <source src="https://videos.pexels.com/video-files/8480233/8480233-sd_640_360_25fps.mp4" type="video/mp4" /> */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 to-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Exchange Smart.</span>
            <motion.span 
              className="block bg-clip-text text-transparent bg-gradient-to-r from-neon to-emerald-400"
              animate={{ 
                textShadow: [
                  '0 0 5px #00FF99, 0 0 10px #00FF99',
                  '0 0 15px #00FF99, 0 0 20px #00FF99',
                  '0 0 5px #00FF99, 0 0 10px #00FF99'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              Learn Smarter.
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            USDT ⇄ USD made simple. Build your trading mindset here.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-full text-lg shadow-lg shadow-neon/30 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 255, 153, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start Trading Now</span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0"
                animate={{ 
                  opacity: [0, 0.2, 0],
                  left: ['-100%', '100%', '100%']
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}