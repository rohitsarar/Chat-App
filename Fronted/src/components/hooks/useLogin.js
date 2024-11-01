import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    // Client-side validation for empty fields
    if (!username || !password) {
      toast.error("Username and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
