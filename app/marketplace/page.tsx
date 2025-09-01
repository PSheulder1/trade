"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiStar,
  FiCheck,
  FiTruck,
  FiShield,
  FiArrowRight,
  FiX,
  FiPlus,
  FiMinus,
  FiCreditCard,
  FiDollarSign,
} from "react-icons/fi";

// Define TypeScript interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  features: string[];
  rating: number;
  reviews: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: JSX.Element;
}

// Sample products data
const products: Product[] = [
  // Chairs
  {
    id: 1,
    name: "ErgoTrader Pro Chair",
    price: 349.99,
    description:
      "Premium ergonomic chair designed for marathon trading sessions. Stay comfortable during those long market hours.",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "chairs",
    features: [
      "Lumbar support",
      "Adjustable height",
      "Breathable mesh",
      "360° rotation",
    ],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "CryptoThrone Executive",
    price: 549.99,
    description:
      "Luxury executive chair with premium materials for the serious trader who values comfort and style.",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "chairs",
    features: [
      "Premium leather",
      "Memory foam",
      "Integrated massage",
      "Heated function",
    ],
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 3,
    name: "Day Trader Drafting Stool",
    price: 229.99,
    description:
      "Adjustable height drafting stool perfect for standing desks and active trading positions.",
    image:
      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "chairs",
    features: [
      "Adjustable height",
      "Footrest",
      "Swivel base",
      "Ergonomic design",
    ],
    rating: 4.5,
    reviews: 63,
  },

  // T-Shirts
  {
    id: 4,
    name: "Bull Market Tee",
    price: 29.99,
    description:
      "Premium cotton t-shirt featuring our exclusive bull market design. Comfortable and stylish.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "tshirts",
    features: [
      "100% cotton",
      "Premium print",
      "Unisex fit",
      "Machine washable",
    ],
    rating: 4.7,
    reviews: 215,
  },
  {
    id: 5,
    name: "HODL Collection Hoodie",
    price: 59.99,
    description:
      "Cozy hoodie perfect for those late-night trading sessions. Features our exclusive HODL design.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "tshirts",
    features: [
      "80% cotton, 20% polyester",
      "Kangaroo pocket",
      "Ribbed cuffs",
      "Available in multiple colors",
    ],
    rating: 4.8,
    reviews: 142,
  },
  {
    id: 6,
    name: "To The Moon Cap",
    price: 24.99,
    description:
      "Adjustable cap with embroidered 'To The Moon' logo. Perfect for outdoor trading sessions.",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "tshirts",
    features: [
      "Adjustable strap",
      "Embroidered logo",
      "Breathable fabric",
      "One size fits all",
    ],
    rating: 4.6,
    reviews: 98,
  },

  // Training
  {
    id: 7,
    name: "Pro Trader Bootcamp",
    price: 999.99,
    description:
      "Comprehensive 8-week program that transforms beginners into confident traders. Learn strategies that work.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "training",
    features: [
      "Live mentoring",
      "Market analysis",
      "Risk management",
      "Lifetime access",
    ],
    rating: 4.9,
    reviews: 76,
  },
  {
    id: 8,
    name: "Advanced Crypto Strategies",
    price: 499.99,
    description:
      "Master advanced trading techniques used by professional cryptocurrency traders. Take your skills to the next level.",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "training",
    features: [
      "Technical analysis",
      "Algorithmic trading",
      "Portfolio management",
      "1-year support",
    ],
    rating: 4.7,
    reviews: 53,
  },
  {
    id: 9,
    name: "Market Psychology Masterclass",
    price: 299.99,
    description:
      "Understand market psychology and emotional control to make better trading decisions consistently.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
    category: "training",
    features: [
      "Emotional control",
      "Cognitive biases",
      "Decision making",
      "6-month access",
    ],
    rating: 4.8,
    reviews: 41,
  },
];

// Payment methods
const paymentMethods: PaymentMethod[] = [
  { id: "usd", name: "Credit Card (USD)", icon: <FiCreditCard /> },
  { id: "btc", name: "Bitcoin (BTC)", icon: <FiDollarSign /> },
  { id: "eth", name: "Ethereum (ETH)", icon: <FiDollarSign /> },
  { id: "usdt", name: "Tether (USDT)", icon: <FiDollarSign /> },
];

export default function Marketplace() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("usd");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Add to cart function
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart function
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update quantity function
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TradingPro Shop</h1>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              {["all", "chairs", "tshirts", "training"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm capitalize ${
                    activeCategory === category
                      ? "bg-neon text-dark"
                      : "bg-dark-700 text-gray-300"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === "tshirts"
                    ? "Apparel"
                    : category === "all"
                    ? "All Products"
                    : category}
                </button>
              ))}
            </div>

            <button
              className="relative p-2 bg-dark-700 rounded-lg"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
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
            TradingPro <span className="text-neon">Marketplace</span>
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Premium gear and education for serious traders. Everything you need
            to perform at your peak.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-dark-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-neon/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-neon text-dark font-bold py-1 px-3 rounded-full">
                    ${product.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-dark/80 text-neon text-sm py-1 px-2 rounded-full capitalize">
                    {product.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>

                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            i < Math.floor(product.rating) ? "fill-current" : ""
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4 text-sm">
                    {product.description}
                  </p>

                  <ul className="mb-6 text-sm">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <FiCheck className="text-neon mr-2" />
                        <span className="text-gray-400">{feature}</span>
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

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              className="fixed right-0 top-0 h-full backdrop-blur-xl   bg-black/70 w-full md:w-96 bg-dark-800 shadow-xl z-50 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <button
                    className="p-2 rounded-full bg-dark-700 hover:bg-dark-600"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <FiX />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <FiShoppingCart className="text-4xl mx-auto text-gray-500 mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-8">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center bg-dark-700 p-4 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />

                          <div className="ml-4 flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-neon font-bold">${item.price}</p>

                            <div className="flex items-center mt-2">
                              <button
                                className="p-1 bg-dark-600 rounded"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <FiMinus className="text-xs" />
                              </button>

                              <span className="mx-2">{item.quantity}</span>

                              <button
                                className="p-1 bg-dark-600 rounded"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <FiPlus />
                              </button>

                              <button
                                className="ml-4 text-red-500 text-sm flex items-center"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <FiX className="mr-1" /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-700 pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="font-bold">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Shipping</span>
                        <span className="font-bold">$0.00</span>
                      </div>

                      <div className="flex justify-between items-center text-lg font-bold mb-6">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold mb-3">Payment Method</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            className={`p-3 rounded-lg border flex items-center justify-center space-x-2 ${
                              selectedPayment === method.id
                                ? "border-neon bg-neon/10"
                                : "border-gray-700 hover:border-neon/50"
                            }`}
                            onClick={() => setSelectedPayment(method.id)}
                          >
                            {method.icon}
                            <span className="text-sm">{method.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      className="w-full py-4 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Proceed to Checkout
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              <p className="text-gray-400">
                On all orders over $100. Fast delivery anywhere in the world.
              </p>
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
              <p className="text-gray-400">
                All transactions are encrypted and secure. Multiple payment
                options including crypto.
              </p>
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
              <h3 className="text-xl font-bold mb-2">
                Satisfaction Guaranteed
              </h3>
              <p className="text-gray-400">
                30-day money-back guarantee on all physical products and 14-day
                guarantee on training courses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
