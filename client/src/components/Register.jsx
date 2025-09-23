import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { register  } from "../api/auth"; 
import { login } from "../api/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu";


export function Register({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const data  = await register(form) // axios returns { data }
        console.log(data);
        
        localStorage.setItem("token", data.token);

        await login({ email: form.email, password: form.password }); // update auth context with user + token
        loginUser(data);
        navigate("/"); // redirect home
      } catch (err) {
        console.log(err)
        setError(err.response?.data?.message );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don’t have an account? <button onClick={() => navigate('/login')} className="text-primary font-medium cursor-pointer hover:underline">Login</button>
        </p>        
      </div>
    </div>
  );
}
