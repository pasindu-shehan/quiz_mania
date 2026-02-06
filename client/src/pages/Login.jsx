import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestPending, setRequestPending] = useState(false);
  const nav = useNavigate();

  async function processLogin(e) {
    e.preventDefault();
    setRequestPending(true);
    try {
      await axios.post(
        `http://localhost:5000/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Successfully Logged In");
      nav("/");
    } catch (error) {
      toast.error(error.response.data.error.replace(/"/g, ""));
      console.log(`LOGIN:${error.message}`);
    }
    setRequestPending(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={processLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            loading={requestPending}
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}
