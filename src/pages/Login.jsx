import { useState } from "react";
import { login, signup } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("login");
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (mode === "login") login(email);
    else signup(email);
    nav("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4 pt-12">
      <ThemeToggle /> 
      <form
        onSubmit={submit}
        className="backdrop-blur-md bg-white/10 dark:bg-black/30 p-8  shadow-lg w-full max-w-sm border border-white/20 rounded-[25px]"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6 tracking-wider">
          {mode === "login" ? "Welcome Back" : "Join Us"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-white/20 text-white placeholder-white  focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[25px]"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold  transition rounded-[25px]"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <div
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-center text-sm text-blue-300 hover:underline cursor-pointer"
        >
          {mode === "login" ? "Create an account" : "Already have one?"}
        </div>
      </form>
    </div>
  );
}
