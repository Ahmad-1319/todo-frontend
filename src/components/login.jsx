import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Font Awesome icons
import { useMode } from "../Context/modeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
const { darkMode } = useMode() // Assuming you have a mode context for dark mode
  const handleLogin = async (e) => {
    e.preventDefault();

    let res = await fetch("https://my-backend-production-17a5.up.railway.app/api/auth/Sign-In", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    let data = await res.json();

    if (data.status) {
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      toast.error(data.error);
    }

    setEmail("");
    setPassword("");
    console.log(data);
  };

  return (
    <div className="flex min-h-60 my-32 justify-center p-4">
      <div className={`w-full max-w-md rounded-lg  p-6 shadow-md`}>
        <h2 className={`mb-6 text-center text-2xl font-bold ${darkMode?"text-slate-100":"text-slate-800"}`}>Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className={`mb-1 block text-sm font-medium ${darkMode?"text-slate-100":"text-slate-800"}`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${darkMode?"bg-slate-700 text-slate-100":"bg-white text-slate-800"}`}
              required
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="relative">
            <label className={`mb-1 block text-sm font-medium ${darkMode?"text-slate-100":"text-slate-800"}`}>Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${darkMode?"bg-slate-700 text-slate-100":"bg-white text-slate-800"}`}
              required
            />
            {/* Eye Icon for toggling password visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-9 ${darkMode?"text-slate-100":"text-slate-800"} focus:outline-none`}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className={`mt-4 text-center text-sm ${darkMode?"text-slate-100":"text-slate-800"}`}>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


