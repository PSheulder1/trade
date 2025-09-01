// components/dashboard/AccountPage.jsx
import { fetchWithAuth } from "@/app/lib/api";
import axios from "axios";
import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FiUser,
  FiShield,
  FiLock,
  FiBell,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

const AccountPage = () => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchWithAuth("/complete-profile", {
          method: "GET",
        });

        console.log("user : ", response);
        localStorage.setItem("name", response.first_name);
        setFirstName(response.first_name);
        setLastName(response.last_name);
        setPhone(response.phone);
        setEmail(response.email);
      } catch (error: any) {
        console.log("❌ Error fetching user profile:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetchWithAuth("/complete-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        }),
      });

      toast.success("Saved");
      localStorage.setItem("name", firstName);
      window.dispatchEvent(new Event("name-updated"));
      console.log("✅ response: ", response);
    } catch (error: any) {
      console.log("❌ There was an error:", error.message || error);
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "scricks");

    try {
      // 1. Upload to Cloudinary
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfcxpfwop/auto/upload",
        formData
      );
      const uploadedUrl = cloudinaryRes.data.secure_url;
      console.log("Uploaded to Cloudinary:", uploadedUrl);
      localStorage.setItem("imageUrl", uploadedUrl);
      window.dispatchEvent(new Event("avatar-updated"));

      // // 2. Send to Django backend
      const response = await axios.post(
        "http://127.0.0.1:8000/update-avatar/",
        {
          image_url: uploadedUrl,
        },

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response : ", response.data);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed");
    }
  };

  useEffect(() => {
    const sync = () => setAvatar(localStorage.getItem("imageUrl") || "");

    sync(); // initial load
    window.addEventListener("avatar-updated", sync); // ② listen
    return () => window.removeEventListener("avatar-updated", sync);
  }, []);

  const handleRemove = () => {
    // Clear relevant data from localStorage
    localStorage.removeItem("imageUrl");

    // Broadcast custom events so UI updates everywhere
    window.dispatchEvent(new Event("avatar-updated"));

    // Optionally: show a toast or redirect
    toast.success("Profile  removed");
  };
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-gray-400">
          Manage your account preferences and security
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          className="bg-dark-800 border border-gray-800 rounded-xl p-6 lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold mb-6">Profile Information</h3>

          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src={avatar || "/images/avatar.jpg"}
                alt="User avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-neon"
              />
              <div>
                <button
                  onClick={handleButtonClick}
                  className="px-4 cursor-pointer py-2 bg-dark-700 rounded-lg mr-3 hover:bg-neon hover:text-dark transition-colors"
                >
                  Change Avatar
                </button>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 border border-gray-700 cursor-pointer rounded-lg hover:border-neon transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-400 mb-2">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Email Address</label>
              <input
                disabled
                type="email"
                value={email}
                className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full bg-dark-700 border border-gray-700 rounded-lg px-4 py-3 focus:border-neon focus:ring-1 focus:ring-neon/50 outline-none"
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-neon to-emerald-500 text-dark font-bold rounded-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-dark-800 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6">Security Settings</h3>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                    <FiLock className="text-neon" />
                  </div>
                  <div>
                    <div>Password</div>
                    <div className="text-xs text-gray-400">
                      Last changed 3 months ago
                    </div>
                  </div>
                </div>
                <div className="text-neon">Change</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                    <FiShield className="text-neon" />
                  </div>
                  <div>
                    <div>Two-Factor Authentication</div>
                    <div className="text-xs text-gray-400">Not enabled</div>
                  </div>
                </div>
                <div className="text-neon">Enable</div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                    <FiBell className="text-neon" />
                  </div>
                  <div>
                    <div>Login Alerts</div>
                    <div className="text-xs text-gray-400">Enabled</div>
                  </div>
                </div>
                <div className="text-neon">Manage</div>
              </button>
            </div>
          </div>

          <div className="bg-dark-800 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6">Preferences</h3>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-dark-700 rounded-xl hover:border-neon border border-gray-800 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon/10 to-emerald-500/10 flex items-center justify-center mr-3">
                    <FiGlobe className="text-neon" />
                  </div>
                  <div>Language & Region</div>
                </div>
                <div className="flex items-center text-gray-400">
                  English (US)
                  <FiArrowRight className="ml-2" />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountPage;
