import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const nav = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    nav("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4">
      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-2xl font-bold tracking-wide">Customer Portal</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2  font-semibold transition rounded-[25px] border"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Page content rendered here */}
      <Outlet />
    </div>
  );
}
