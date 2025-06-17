import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from '../components/ThemeToggle'; 

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    localStorage.setItem("ticket-user", JSON.stringify({ email }));
    nav("/tickets");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 relative">
      <ThemeToggle />
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm backdrop-blur-lg bg-white/10 dark:bg-white/10 border border-white/20 rounded-xl shadow-2xl p-8 transition-all"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wider drop-shadow-md">
          Create Your Portal
        </h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-white/20 text-white placeholder-white rounded-lg border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 bg-white/20 text-white placeholder-white rounded-lg border border-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold tracking-wide rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Sign Up
        </button>

        <p className="mt-6 text-sm text-center text-blue-200">
          Already have an account?{" "}
          <a href="/login" className="hover:underline font-medium text-white">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
