import axios from "axios";

const API_URL = "http://127.0.0.1:8000";


export const exchangeCurrency = async ({ fromCurrency, toCurrency, amount }) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found");

  try {
    const res = await axios.post(
      `${API_URL}/exchange/`,
      { from_currency: fromCurrency, to_currency: toCurrency, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err.response?.data || err;
  }
};
