import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Login({ onSuccess }) {
  const { loginUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await login(form); // call backend
    console.log(data);
    
    localStorage.setItem("token", data.token); // save token
    localStorage.setItem("user", JSON.stringify(data)); // save user info
    loginUser(data); // update context

    navigate("/"); 
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Login failed");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome Back</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            // className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition outline-none"
            required
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            // className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition outline-none"
            required
          />

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Loging In..." : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Don’t have an account? <button onClick={() => navigate('/register')} className="text-primary font-medium cursor-pointer hover:underline">Register</button>
      </p>
      </div>
    </div>

  );
}
