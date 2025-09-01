"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingCart, FiStar, FiCheck, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const products = {
  chairs: [
    {
      id: 1,
      name: "ErgoTrader Pro Chair",
      price: 349.99,
      description: "Premium ergonomic chair designed for marathon trading sessions. Stay comfortable during those long market hours.",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      features: ["Lumbar support", "Adjustable height", "Breathable mesh", "360° rotation"]
    },
    {
      id: 2,
      name: "CryptoThrone Executive",
      price: 549.99,
      description: "Luxury executive chair with premium materials for the serious trader who values comfort and style.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      features: ["Premium leather", "Memory foam", "Integrated massage", "Heated function"]
    }
  ],
  tshirts: [
    {
      id: 3,
      name: "Bull Market Tee",
      price: 29.99,
      description: "Premium cotton t-shirt featuring our exclusive bull market design. Comfortable and stylish.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      features: ["100% cotton", "Premium print", "Unisex fit", "Machine washable"]
    },
    {
      id: 4,
      name: "HODL Collection Hoodie",
      price: 59.99,
      description: "Cozy hoodie perfect for those late-night trading sessions. Features our exclusive HODL design.",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      features: ["80% cotton, 20% polyester", "Kangaroo pocket", "Ribbed cuffs", "Available in multiple colors"]
    }
  ],
  training: [
    {
      id: 5,
      name: "Pro Trader Bootcamp",
      price: 999.99,
      description: "Comprehensive 8-week program that transforms beginners into confident traders. Learn strategies that work.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      features: ["Live mentoring", "Market analysis", "Risk management", "Lifetime access"]
    },
    {
      id: 6,
      name: "Advanced Crypto Strategies",
      price: 499.99,
      description: "Master advanced trading techniques used by professional cryptocurrency traders. Take your skills to the next level.",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
      features: ["Technical analysis", "Algorithmic trading", "Portfolio management", "1-year support"]
    }
  ]
};

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('chairs');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    // In a real application, you would use a state management solution
  };

  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section */}
      <section className="relative py-36 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Trading setup" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Upgrade Your <span className="text-neon">Trading</span> Experience
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Premium gear and education designed for traders, by traders. Everything you need to perform at your peak.
          </motion.p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-3 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 md:space-x-8">
            {['chairs', 'tshirts', 'training'].map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-medium text-lg capitalize ${activeCategory === category ? 'bg-neon text-dark' : 'bg-dark-700 text-gray-300'}`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'tshirts' ? 'T-Shirts' : category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center capitalize">
            {activeCategory === 'tshirts' ? 'Premium Apparel' : activeCategory}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {products[activeCategory].map((product) => (
              <motion.div 
                key={product.id}
                className="bg-dark-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-neon/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-neon text-dark font-bold py-1 px-3 rounded-full">
                    ${product.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  <ul className="mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <FiCheck className="text-neon mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(product)}
                  >
                    <FiShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Shop With Us?</h2>
            <div className="h-1 w-20 bg-neon mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 bg-dark-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl text-neon mb-4 flex justify-center">
                <FiTruck />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-400">On all orders over $100. Fast delivery anywhere in the world.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-dark-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl text-neon mb-4 flex justify-center">
                <FiShield />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-400">All transactions are encrypted and secure. Multiple payment options.</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-dark-700 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl text-neon mb-4 flex justify-center">
                <FiStar />
              </div>
              <h3 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-400">30-day money-back guarantee on all physical products.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
            alt="Trading charts" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Trading Game?</h2>
          <p className="text-xl text-gray-300 mb-10">Join thousands of successful traders who've upgraded their setup with our premium products.</p>
          
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-full text-lg shadow-lg shadow-neon/30 flex items-center mx-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 153, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
          <Link href="/marketplace">View Full Collection </Link>  <FiArrowRight className="ml-2" />
          </motion.button>
        </div>
      </section>
    </div>
    </>
  );
}